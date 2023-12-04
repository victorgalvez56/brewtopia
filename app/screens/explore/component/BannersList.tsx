import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  TouchableNativeFeedback,
  Pressable,
} from "react-native"
import React from "react"
import tw from "../../../utils/tailwind"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import Ionicons from "@expo/vector-icons/Ionicons"
import { limitBox } from "../../../utils/helper"
import { color } from "../../../theme"
import Lottie from "lottie-react-native"
import { useWindowDimensions } from "react-native"

const ITEM_WITH = 30
const SPACING = 10

export interface Item {
  id: number
  image: string
  title: string
  local?: string
  like: boolean
  ratings?: number
  totalRatings?: number
  initial_rating: number
}

interface BannersListProps {
  data?: Item[]
  title?: string
  showViewAll?: boolean
  onPressViewAll?: () => void
  onPressItem?: (item: Item) => void
  showRatings?: boolean
  styleContainerLike?: string
  onPressLike?: (item: number) => void
  fail?: boolean
  onRefresh?: () => void
  breweries?: boolean
}

const BannersList: React.FC<BannersListProps> = ({
  title,
  data,
  onPressViewAll,
  showViewAll,
  onPressItem,
  showRatings,
  styleContainerLike,
  onPressLike,
  fail,
  onRefresh,
}) => {
  const { width } = useWindowDimensions()
  return (
    <View style={tw`mt-3`}>
      <View style={tw`flex-row items-center justify-between mb-2`}>
        <Text style={tw`text-lg font-bold text-brewtopiagray-700`}>{title}</Text>
        {showViewAll && (
          <TouchableOpacity onPress={() => onPressViewAll()}>
            {/* @TODO: SE DEJÓ ESTE CÓDIGO PARA MÁS ADELANTE SE PUEDA HACER RELOAD */}
            {/* {fail ? (
              <View style={tw`items-center justify-center overflow-hidden rounded-full`}>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple("#c4c4c4", false)}
                  onPress={() =>
                    requestAnimationFrame(() => {
                      if (onRefresh) {
                        onRefresh()
                      }
                    })
                  }
                >
                  <View style={tw`items-center justify-center`}>
                    <Ionicons name="reload-circle" size={30} color={color.palette.angry} />
                  </View>
                </TouchableNativeFeedback>
              </View>
            ) : ( */}
            <Text style={tw`text-sm text-brewtopiagray-700`}>View all</Text>
            {/*)}*/}
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        contentContainerStyle={tw`pr-5 my-2`}
        decelerationRate={"fast"}
        snapToInterval={ITEM_WITH + SPACING * 2}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={tw`w-[${width - 39}px]  h-25`}>
            <Lottie
              source={require("../../../icons/animations/six-pack-beer.json")}
              loop={true}
              resizeMode="contain"
              autoPlay
            />
          </View>
        )}
        renderItem={({ item }) => {
          return (
            <View style={tw`mr-2`}>
              <Pressable
                onPress={() => {
                  if (onPressItem) onPressItem(item)
                }}
              >
                <ImageBackground
                  source={{ uri: item.image, cache: "force-cache" }}
                  resizeMode="cover"
                  style={tw`w-${ITEM_WITH} h-${ITEM_WITH} rounded-xl  overflow-hidden p-1 shadow-md`}
                >
                  <View
                    style={tw`items-center self-end justify-center w-6 h-6 overflow-hidden rounded-full`}
                  >
                    <TouchableNativeFeedback
                      background={TouchableNativeFeedback.Ripple("#fff", false)}
                      onPress={() =>
                        requestAnimationFrame(() => {
                          if (onPressLike) {
                            onPressLike(item.id)
                          }
                        })
                      }
                    >
                      <View
                        style={tw`items-center justify-center w-full h-full rounded-full bg-brewtopia-500 ${styleContainerLike} `}
                      >
                        <FontAwesome
                          name={item.like ? "heart" : "heart-o"}
                          color={item.like ? "#cc0000" : "#FFFFFF"}
                          size={15}
                        />
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                </ImageBackground>
              </Pressable>
              <TouchableOpacity
                onPress={() => {
                  if (onPressItem) onPressItem(item)
                }}
              >
                <View style={tw`p-1`}>
                  {showRatings && (
                    <View style={tw`flex-row items-center mt-1`}>
                      <FontAwesome name="star" size={16} color="#FF7558" />
                      <Text style={tw`ml-1 text-xs text-brewtopiagray-700`}>
                        {item.initial_rating ? item.initial_rating : 0}
                      </Text>
                    </View>
                  )}

                  <Text style={tw`text-sm font-bold text-brewtopiagray-700`}>
                    {limitBox(item.title, 16)}
                  </Text>
                  {item.local && (
                    <Text style={tw`text-xs text-brewtopiagray-700`}>
                      {limitBox(item.local, 19)}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          )
        }}
      />
      <View style={tw`w-full h-0.3 bg-gray-200`} />
    </View>
  )
}

BannersList.defaultProps = {
  title: "Beers you maybe like",
  onPressViewAll: () => console.log(""),
  showRatings: true,
  showViewAll: true,
  fail: false,
}

export default BannersList
