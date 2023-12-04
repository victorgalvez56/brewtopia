import { View, Text, FlatList, TouchableNativeFeedback } from "react-native"
import React from "react"
import tw from "../../../utils/tailwind"
const ITEM_WITH = 50
const SPACING = 10
interface item {
  id: number
  title: string
  type: string
}
const DATA_LIST: item[] = [
  {
    id: 1,
    title: "Top Rated Beers",
    type: "beers",
  },
  {
    id: 2,
    title: "Top rated breweries",
    type: "breweries",
  },
  {
    id: 3,
    title: "Trending beers in your area",
    type: "beers",
  },
  {
    id: 4,
    title: "Trending pub",
    type: "pubs",
  },
]

interface TopSearchList {
  navigation: any
}

const TopSearchList = ({ navigation }) => {
  return (
    <FlatList
      keyExtractor={(item) => item.id.toString()}
      horizontal
      decelerationRate={"fast"}
      snapToInterval={ITEM_WITH + SPACING * 2}
      contentContainerStyle={{
        paddingRight: 3,
        marginBottom: 10,
      }}
      showsHorizontalScrollIndicator={false}
      data={DATA_LIST}
      renderItem={({ item }) => {
        return (
          <View style={tw`mr-3 overflow-hidden border rounded-lg border-brewtopia-500`}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple("#f4f4f4", false)}
              onPress={() =>
                requestAnimationFrame(() =>{
                   navigation.navigate("categoryListSearch", item)})
              }
            >
              <View style={tw`items-center justify-center px-2 py-2 `}>
                <Text style={tw`text-sm font-semibold text-brewtopiagray-700`}>{item.title}</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        )
      }}
    />
  )
}

export default TopSearchList
