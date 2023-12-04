/* eslint-disable react/react-in-jsx-scope */
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableNativeFeedback,
  Pressable,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native"
import { useRef } from "react"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import tw from "../../../utils/tailwind"
import { useStores } from "../../../models"
import { observer } from "mobx-react-lite"
import { limitBox } from "../../../utils/helper"
import Lottie from "lottie-react-native"
import CustomButton from "../../../components/custom-button/custom-button"
interface Props {
  navigation: any
  setOpenModalMakeMost: (v: boolean) => void
  searchBeer: boolean
  onPressFavoriteBeers: (id: number) => void
}

const ITEM_WITH = 25

const BeerList = observer(
  ({ navigation, setOpenModalMakeMost, searchBeer = false, onPressFavoriteBeers }: Props) => {
    const { beerStore, userStore } = useStores()
    const { beersSearchList } = beerStore
    const { isGuest } = userStore
    const beerImgRef = useRef<Lottie>(null)
    const { height } = useWindowDimensions()

    const onBeerDetail = (item: any) => {
      if (isGuest) {
        setOpenModalMakeMost(true)
      } else {
        navigation.navigate("beerDetails", item)
      }
    }
    return (
      <FlatList
        data={beersSearchList}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={tw`p-5`}
        ListFooterComponent={() => {
          if (searchBeer) {
            return (
              <CustomButton
                title="Submit a beer"
                onPress={() => navigation.navigate("beerCreate")}
                variant="primary"
                styleContainer="mt-5"
              />
            )
          }
          return null
        }}
        ListEmptyComponent={() => {
          if (searchBeer && beersSearchList.length === 0) {
            return (
              <View style={tw`items-center justify-center`}>
                <View style={tw`w-40 h-40`}>
                  <Lottie
                    source={require("../../../icons/animations/simple-drunk-beer-bottle.json")}
                    loop={true}
                    resizeMode="contain"
                    autoPlay
                  />
                </View>
                <Text style={tw`mt-2 text-3xl font-bold text-gray-500`}>Oh....</Text>
                <Text style={tw`mt-2 text-3xl font-bold text-gray-500`}>
                  We couldn't find this beer
                </Text>
                <Text style={tw`mt-2 text-base text-center text-gray-500`}>
                  We haven't be able to find this beer in our{"\n"}
                  database. To help us, submit a picture of the {"\n"}
                  bottle or the tap and our experts will add it to{"\n"}
                  our database as soon as possible.
                </Text>
              </View>
            )
          } else {
            return (
              <View style={tw`h-[${height - 300}px]`}>
                <Lottie
                  ref={beerImgRef}
                  source={require("../../../icons/animations/Brewtopia_Searching_Bottles.json")}
                  loop={true}
                  resizeMode="contain"
                  autoPlay
                />
              </View>
            )
          }
        }}
        ItemSeparatorComponent={() => <View style={tw`h-0.2 w-full bg-gray-50 my-3`} />}
        renderItem={({ item }) => (
          <View style={tw`flex-row items-start justify-between`}>
            <Pressable onPress={() => onBeerDetail(item)}>
              <ImageBackground
                source={{ uri: item.image }}
                resizeMode="cover"
                style={tw`w-${ITEM_WITH} h-${ITEM_WITH} rounded-xl  overflow-hidden p-1 shadow-md`}
              />
            </Pressable>
            <View style={tw`flex-1 ml-3`}>
              <TouchableOpacity onPress={() => onBeerDetail(item)}>
                <View style={tw`flex-row items-center justify-between`}>
                  <Text style={tw`text-base font-bold text-brewtopiagray-700`}>
                    {limitBox(item.title, 26)}
                  </Text>
                  <View
                    style={tw`items-center justify-center w-6 h-6 overflow-hidden rounded-full`}
                  >
                    <TouchableNativeFeedback
                      onPress={() => onPressFavoriteBeers(item.id)}
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
                  <Text style={tw`text-sm text-brewtopiagray-700`}>{item.strength || 0}% ABV</Text>
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

export default BeerList
