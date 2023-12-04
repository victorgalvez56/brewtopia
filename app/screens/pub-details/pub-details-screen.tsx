import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen } from "../../components"
import { ImageBackground, Text, View } from "react-native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import tw from "../../utils/tailwind"
import HeaderCustom from "../../components/header-custom/header-custom"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { limitBox } from "../../utils/helper"
import { FlatList } from "react-native-gesture-handler"
import DATA_MEDIA from "./data-media.json"
import { AirbnbRating } from "react-native-ratings"
import Feather from "@expo/vector-icons/Feather"
import AntDesign from "@expo/vector-icons/AntDesign"
import BannersList from "../explore/component/BannersList"

const ITEM_WITH = 30
const SPACING = 10

export const PubDetailsScreen: FC<StackScreenProps<NavigatorParamList, "pubDetails">> = observer(
  ({ navigation, route }) => {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()
    const item = route?.params || {
      title: "",
      id: "",
      image: "",
      local: "",
      like: false,
      ratings: 0,
      totalRatings: 0,
      abv: 12,
      ibu: 0,
      founded: "",
      description: "",
      phone: "",
      website: "",
    }

    return (
      <Screen backgroundColor={color.palette.white} preset="scroll">
        <HeaderCustom
          variant="secondary"
          back={true}
          headerStyle="text-center"
          iconLike={true}
          iconShared={true}
        />
        <View style={tw`px-4 pb-10`}>
          <View style={tw`flex-row items-center`}>
            <ImageBackground
              source={{
                uri: item?.image,
                cache: "force-cache",
              }}
              resizeMode="cover"
              style={tw`p-1 overflow-hidden border-2 border-green-500 rounded-full shadow-md w-25 h-25`}
            />
            <View style={tw`ml-4`}>
              <Text style={tw`text-lg font-bold text-brewtopiagray-700`}>
                {limitBox(item.title, 27)}
              </Text>
              <View style={tw`flex-row items-center mt-1`}>
                <FontAwesome name="star" size={16} color="#FF7558" />
                <Text style={tw`ml-1 text-sm text-brewtopiagray-700`}>{item.initial_rating}</Text>
              </View>
              <Text style={tw`text-sm text-brewtopiagray-700`}>
                Type Pub Founded at {item.founded}
              </Text>
              <Text style={tw`text-sm text-brewtopiagray-700`}>2.8 miles</Text>
            </View>
          </View>
          <FlatList
            data={DATA_MEDIA}
            keyExtractor={(v) => v.id.toString()}
            horizontal
            contentContainerStyle={tw`pr-5 my-5`}
            decelerationRate={"fast"}
            snapToInterval={ITEM_WITH + SPACING * 2}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item: v }) => {
              return (
                <View style={tw`mr-2`}>
                  {/* <ImageBackground
                    source={{ uri: v.image }}
                    resizeMode="cover"
                    style={tw`w-${ITEM_WITH} h-${ITEM_WITH} rounded-xl  overflow-hidden p-1 shadow-md border border-green-500`}
                  /> */}
                </View>
              )
            }}
          />
          <Text style={tw`text-base font-bold text-brewtopiagray-700`}>About us</Text>
          <Text style={tw`mt-2 text-base text-brewtopiagray-700 shrink`}>{item.description}</Text>
          <View style={tw`mt-5`}>
            {item.local && (
              <View style={tw`flex-row items-center`}>
                <Feather name="map-pin" size={20} color="#FF7558" />
                <Text style={tw`ml-2 text-xs text-brewtopiagray-700 shrink`}>{item.local}</Text>
              </View>
            )}
            {item.phone && (
              <View style={tw`flex-row items-center`}>
                <Feather name="phone" size={20} color="#FF7558" />
                <Text style={tw`ml-2 text-xs text-brewtopiagray-700 shrink`}>{item.phone}</Text>
              </View>
            )}
            {item.website && (
              <View style={tw`flex-row items-center`}>
                <AntDesign name="earth" size={20} color="#FF7558" />
                <Text style={tw`ml-2 text-xs underline text-brewtopiagray-700`}>
                  {item.website}
                </Text>
              </View>
            )}
          </View>
          <View style={tw`h-0.3 w-full bg-gray-200 my-5`} />
          <Text style={tw`text-base text-brewtopiagray-700`}>
            Have you been to this pub? Rate it.
          </Text>
          <AirbnbRating
            count={5}
            selectedColor="#FF7558"
            size={30}
            showRating={false}
            starContainerStyle={tw`self-start mt-2`}
            defaultRating={0}
          />
          <View style={tw`h-0.3 w-full bg-gray-200 my-5`} />
          {/* Hold on for banners statics */}
          {/* <BannersList
            title="Similar pubs you might like"
            showRatings={false}
            styleContainerLike="bg-gray-400"
            showViewAll={false}
          /> */}
        </View>
      </Screen>
    )
  },
)
