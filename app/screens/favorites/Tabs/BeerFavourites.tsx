import {
  View,
  Text,
  FlatList,
  TouchableNativeFeedback,
  Pressable,
  ImageBackground,
  TouchableOpacity,
} from "react-native"
import React from "react"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import tw from "../../../utils/tailwind"
import { useStores } from "../../../models"
import { limitBox } from "../../../utils/helper"

interface Props {
  navigation: any
}
const ITEM_WITH = 25
const BeerFavourites: React.FC<Props> = ({ navigation }) => {
  const { beerStore } = useStores()
  const { beersFavouritesList } = beerStore
  const onBeerDetail = (item: any) => {
    navigation.navigate("beerDetails", item)
  }

  return (
    <FlatList
      data={beersFavouritesList}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={tw`p-5`}
      ItemSeparatorComponent={() => <View style={tw`h-0.2 w-full bg-gray-50 my-3`} />}
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
                  {limitBox(item.title, 28)}
                </Text>
                <View style={tw`items-center justify-center w-6 h-6 overflow-hidden rounded-full`}>
                  <TouchableNativeFeedback
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
                <Text style={tw`text-sm text-brewtopiagray-700`}>{item.strength}% ABV</Text>
                <View style={tw`flex-row items-center mt-1`}>
                  <FontAwesome name="star" size={16} color="#FF7558" />
                  <Text style={tw`ml-1 text-sm text-brewtopiagray-700`}>{item.initial_rating}</Text>
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
}

export default BeerFavourites
