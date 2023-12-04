import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableNativeFeedback,
  Pressable,
  TouchableOpacity,
} from "react-native"
import React from "react"
// import Data from "../data.json"
import Feather from "@expo/vector-icons/Feather"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import tw from "../../../utils/tailwind"
import { useStores } from "../../../models"
import { observer } from "mobx-react-lite"
import { limitBox } from "../../../utils/helper"
import Lottie from "lottie-react-native"
interface Props {
  navigation: any
}

const ITEM_WITH = 25

const List: React.FC<Props> = observer(({ navigation }) => {
  const { pubStore } = useStores()
  const { pubsSearchViewAllList } = pubStore

  const onBeerDetail = (item: any) => {
    navigation.navigate("pubDetails", item)
  }
  console.warn(pubsSearchViewAllList)
  return (
    <FlatList
      data={pubsSearchViewAllList}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={tw`p-5`}
      ItemSeparatorComponent={() => <View style={tw`h-0.2 w-full bg-gray-50 my-3`} />}
      ListEmptyComponent={() => (
        <View style={tw`flex-1 px-6 `}>
          <View style={tw`h-[${300}px]`}>
            <Lottie
              source={require("../../../icons/animations/simple-drunk-beer-bottle.json")}
              loop={true}
              resizeMode="contain"
              autoPlay
            />
          </View>
          <Text style={tw`text-xl font-bold text-brewtopia-500 text-center`}>
            Oh no! That concoction isn't in our inventory yet.
          </Text>
          <Text style={tw`text-base text-brewtopiagray-700 text-center mt-3`}>
            This isn’t what you ordered, is it? Sorry. We’re continually updating our brews, so
            might have a few beers missing.
          </Text>
        </View>
      )}
      renderItem={({ item }) => (
        <View style={tw`flex-row items-start justify-between`}>
          <Pressable onPress={() => onBeerDetail(item)}>
            <ImageBackground
              source={{ uri: item.image, cache: "force-cache" }}
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

export default List
