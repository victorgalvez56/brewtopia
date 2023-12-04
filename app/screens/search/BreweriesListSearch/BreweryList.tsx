import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableNativeFeedback,
  Pressable,
  TouchableOpacity,
} from "react-native"
import { useEffect, useRef } from "react"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import tw from "../../../utils/tailwind"
import { useStores } from "../../../models"
import { observer } from "mobx-react-lite"
import { limitBox } from "../../../utils/helper"
import Lottie from "lottie-react-native"
import { useWindowDimensions } from "react-native"
interface Props {
  navigation: any
  setOpenModalMakeMost: (v: boolean) => void
  onPressFavoriteBrewery: (id: number) => void
}

const ITEM_WITH = 25

const BreweryList = observer(
  ({ navigation, setOpenModalMakeMost, onPressFavoriteBrewery }: Props) => {
    const { breweryStore, userStore } = useStores()
    const { breweriesSearchList } = breweryStore
    const { isGuest } = userStore
    const breweriesImgRef = useRef<Lottie>(null)
    const { height } = useWindowDimensions()

    const onBrewerieDetail = (item: any) => {
      navigation.navigate("brewerieDetails", item)
    }
    useEffect(() => {
      // console.warn(breweriesSearchList)
    }, [])

    return (
      <FlatList
        data={breweriesSearchList}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={tw`p-5`}
        ListEmptyComponent={() => (
          <View style={tw`h-[${height - 300}px]`}>
            <Lottie
              ref={breweriesImgRef}
              source={require("../../../icons/animations/Brewtopia_Search_Breweries.json")}
              loop={true}
              resizeMode="contain"
              autoPlay
            />
          </View>
        )}
        ItemSeparatorComponent={() => <View style={tw`h-0.2 w-full bg-gray-50 my-3`} />}
        renderItem={({ item }) => (
          <View style={tw`flex-row items-start justify-between`}>
            <Pressable onPress={() => onBrewerieDetail(item)}>
              <ImageBackground
                source={{ uri: item.image }}
                resizeMode="cover"
                style={tw`w-${ITEM_WITH} h-${ITEM_WITH} rounded-xl  overflow-hidden p-1 shadow-md`}
              />
            </Pressable>
            <View style={tw`flex-1 ml-3`}>
              <TouchableOpacity onPress={() => onBrewerieDetail(item)}>
                <View style={tw`flex-row items-center justify-between`}>
                  <Text style={tw`text-base font-bold text-brewtopiagray-700`}>
                    {limitBox(item.title, 26)}
                  </Text>
                  <View
                    style={tw`items-center justify-center w-6 h-6 overflow-hidden rounded-full`}
                  >
                    <TouchableNativeFeedback
                      onPress={() => onPressFavoriteBrewery(item.id)}
                      background={TouchableNativeFeedback.Ripple("#fff", false)}
                    >
                      <View
                        style={tw`items-center justify-center w-full h-full rounded-full bg-brewtopiagray-500 `}
                      >
                        <FontAwesome
                          name={item.like ? "heart" : "heart-o"}
                          color={item.like ? "#cc0000" : "#FFFFFF"}
                          size={15}
                        />
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                </View>
                <Text style={tw`text-sm text-brewtopiagray-700`}>{item.local}</Text>
                <View style={tw`flex-row items-center justify-between`}>
                  <Text style={tw`text-sm text-brewtopiagray-700`}></Text>
                  <View style={tw`flex-row items-center mt-1`}>
                    <FontAwesome name="star" size={16} color="#FF7558" />
                    <Text style={tw`ml-1 text-sm text-brewtopiagray-700`}>
                      {item.initial_rating || 0}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
        scrollEventThrottle={1}
        maxToRenderPerBatch={5}
        showsVerticalScrollIndicator={false}
      />
    )
  },
)

export default BreweryList
