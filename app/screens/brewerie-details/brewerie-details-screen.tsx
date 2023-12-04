import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen } from "../../components"
import { ImageBackground, Text, View } from "react-native"
import { useStores } from "../../models"
import { color } from "../../theme"
import tw from "../../utils/tailwind"
import HeaderCustom from "../../components/header-custom/header-custom"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { limitBox } from "../../utils/helper"
import CustomButton from "../../components/custom-button/custom-button"
import { FlatList } from "react-native-gesture-handler"
import DATA_MEDIA from "./data-media.json"
import { AirbnbRating } from "react-native-ratings"
import Feather from "@expo/vector-icons/Feather"
import AntDesign from "@expo/vector-icons/AntDesign"
import Beers from "../../icons/Beers"
import Toast from "react-native-toast-message"
import { BreweryApi } from "../../services/api/brewery-api"

const ITEM_WITH = 30
const SPACING = 10
export const BrewerieDetailsScreen: FC<StackScreenProps<NavigatorParamList, "brewerieDetails">> =
  observer(({ navigation, route }) => {
    // Pull in one of our MST stores
    const { breweryStore } = useStores()
    const { setAddBreweryRating, breweriesRating, saveBreweryRating } = breweryStore

    const item = route?.params || {
      title: "",
      id: 0,
      image: "",
      local: "",
      like: false,
      ratings: 0,
      totalRatings: 0,
      abv: 12,
      ibu: 0,
      description: "",
      phone: "",
      website: "",
      founded: "1909",
    }
    useEffect(() => {}, [])

    const rate = breweriesRating.find((i) => i.brewery_id === Number(item.id))

    const onBeerSearchList = (item: any) => {
      navigation.navigate("beerSearchList", item)
    }

    const ratingCompleted = async (rating: number) => {
      try {
        const api = new BreweryApi()
        const result = await api.addBreweryRating(item?.id, rating)
        if (result.kind === "ok") {
          const data = {
            rating,
            brewery_id: item?.id,
          }
          saveBreweryRating(data)
          Toast.show({
            type: "success",
            text1: "Thank you for helping us improve.",
          })
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
    }

    return (
      <Screen backgroundColor={color.palette.white} preset="scroll">
        <HeaderCustom
          variant="secondary"
          back={true}
          headerStyle="text-center"
          iconLike={true}
          iconShared={true}
          type={"brewery"}
          objectId={item.id}
          like={item.like}
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
                {item.title !== null && item.title !== undefined ? limitBox(item.title, 27) : ""}
              </Text>
              <View style={tw`flex-row items-center mt-1`}>
                <FontAwesome name="star" size={16} color="#FF7558" />
                <Text style={tw`ml-1 text-sm text-brewtopiagray-700`}>
                  {item.initial_rating}
                  {/* ({item.totalRatings}) . Brewerie */}
                </Text>
              </View>
              <View style={tw`w-[85%]`}>
                <Text style={tw`text-sm text-brewtopiagray-700 shrink`}>{item.local}</Text>
              </View>
              <View>
                <Text style={tw`text-sm text-brewtopiagray-700`}>Founded at {item.founded}</Text>
              </View>
              <View>
                <Text>0 miles</Text>
              </View>
            </View>
          </View>
          <CustomButton
            onPress={() => onBeerSearchList(item)}
            variant="primary"
            styleContainer="rounded-full py-2 w-3/4 self-end mt-5"
          >
            <View style={tw`flex-row items-center`}>
              <Beers />
              <Text style={tw`ml-3 text-base font-semibold text-white`}>Beers</Text>
            </View>
          </CustomButton>
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
          {item.description && (
            <Text style={tw`text-base font-bold text-brewtopiagray-700`}>About us</Text>
          )}
          <Text style={tw`mt-2 text-base text-brewtopiagray-700 shrink`}>{item.description}</Text>
          <View style={tw`mt-5`}>
            {item.local && (
              <View style={tw`flex-row items-center w-[80%]`}>
                <Feather name="map-pin" size={20} color="#FF7558" />
                <Text style={tw`ml-2 text-xs text-brewtopiagray-700`}>{item.local}</Text>
              </View>
            )}
            {item.phone && (
              <View style={tw`flex-row items-center mt-2`}>
                <Feather name="phone" size={20} color="#FF7558" />
                <Text style={tw`ml-2 text-xs text-brewtopiagray-700`}>{item.phone}</Text>
              </View>
            )}
            {item.website && (
              <View style={tw`flex-row items-center mt-2`}>
                <AntDesign name="earth" size={20} color="#FF7558" />
                <Text style={tw`ml-2 text-xs underline text-brewtopiagray-700`}>
                  {item.website}
                </Text>
              </View>
            )}
          </View>
          <View style={tw`h-0.3 w-full bg-gray-200 my-5`} />
          <Text style={tw`text-base text-brewtopiagray-700`}>
            Have you tried this brewery? Rate it.
          </Text>
          <AirbnbRating
            count={5}
            selectedColor="#FF7558"
            size={30}
            showRating={false}
            starContainerStyle={tw`self-start mt-2`}
            defaultRating={rate ? rate.rating : 0}
            onFinishRating={ratingCompleted}
          />
          <View style={tw`h-0.3 w-full bg-gray-200 my-5`} />
        </View>
      </Screen>
    )
  })
