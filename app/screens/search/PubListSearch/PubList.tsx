import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableNativeFeedback,
  Pressable,
  TouchableOpacity,
} from "react-native"
import { useRef } from "react"
import Feather from "@expo/vector-icons/Feather"
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
}

const ITEM_WITH = 25

const PubList = observer(({ navigation, setOpenModalMakeMost }: Props) => {
  const { pubStore, userStore } = useStores()
  const { pubsSearchList } = pubStore
  const { isGuest } = userStore
  const pubsImgRef = useRef<Lottie>(null)
  const { height } = useWindowDimensions()

  const onPubDetail = (item: any) => {
    if (isGuest) {
      setOpenModalMakeMost(true)
    } else {
      navigation.navigate("pubDetails", item)
    }
  }
  return (
    <FlatList
      data={pubsSearchList}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={tw`px-5 pt-5`}
      ListEmptyComponent={() => (
        <Lottie
          ref={pubsImgRef}
          source={require("../../../icons/animations/Brewtopia_Profile_Builder.json")}
          loop={true}
          autoPlay
          resizeMode="contain"
          style={tw`h-[${height - 350}px] w-full self-center`}
        />
      )}
      ItemSeparatorComponent={() => <View style={tw`h-0.2 w-full bg-gray-50 my-3`} />}
      renderItem={({ item }) => (
        <View style={tw`flex-row items-start justify-between`}>
          <Pressable onPress={() => onPubDetail(item)}>
            <ImageBackground
              source={{ uri: item.image, cache: "force-cache" }}
              resizeMode="cover"
              style={tw`w-${ITEM_WITH} h-${ITEM_WITH} rounded-xl  overflow-hidden p-1 shadow-md`}
            />
          </Pressable>
          <View style={tw`flex-1 ml-3`}>
            <TouchableOpacity onPress={() => onPubDetail(item)}>
              <View style={tw`flex-row items-center justify-between`}>
                <Text style={tw`text-base font-bold text-brewtopiagray-700`}>
                  {limitBox(item.title, 26)}
                </Text>
                <View style={tw`items-center justify-center w-6 h-6 overflow-hidden rounded-full`}>
                  <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple("#fff", false)}
                  >
                    <View
                      style={tw`items-center justify-center w-full h-full rounded-full bg-brewtopiagray-500 `}
                    >
                      <Feather name="heart" color="#FFFFFF" size={15} />
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
})

export default PubList
