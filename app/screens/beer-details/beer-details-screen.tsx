import React, { FC, useCallback, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen } from "../../components"
import { ImageBackground, Pressable, ScrollView, Text, View } from "react-native"
import { useStores } from "../../models"
import { color } from "../../theme"
import tw from "../../utils/tailwind"
import HeaderCustom from "../../components/header-custom/header-custom"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { limitBox } from "../../utils/helper"
import CustomButton from "../../components/custom-button/custom-button"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { FlatList } from "react-native-gesture-handler"
import { AirbnbRating } from "react-native-ratings"
import Feather from "@expo/vector-icons/Feather"
import Entypo from "@expo/vector-icons/Entypo"
import BannersList from "../explore/component/BannersList"
import Toast from "react-native-toast-message"
import BannersListSkeleton from "../explore/component/BannerListSkeleton"
import { useFocusEffect } from "@react-navigation/native"
import { BeerApi } from "../../services/api/beer-api"
import Spinner from "react-native-loading-spinner-overlay"
import reactotron from "reactotron-react-native"

export const BeerDetailsScreen: FC<StackScreenProps<NavigatorParamList, "beerDetails">> = observer(
  ({ navigation, route }) => {
    const { beerStore, breweryStore } = useStores()
    const {
      beersFavouritesList,
      setRemoveFavouriteBeer,
      setAddFavouriteBeer,
      beersRating,
      setAddBeerRating,
      getBeerSimilar,
      getBeerDetail,
    } = beerStore
    const { getBrewery } = breweryStore
    const [similarList, setSimilarList] = useState([])
    const [loading, setLoading] = useState(false)
    const [beerDetail, setBeerDetail] = useState({
      title: "",
      id: "",
      image: "",
      local: "",
      like: false,
      initial_rating: 0,
      abv: 0,
      ibu: 0,
      description: "",
      tags: [],
      location: null,
      brewery: { id: "" },
    })
    const scrollRef = useRef<ScrollView>(null)
    const [rating, setRating] = useState(0)

    useEffect(() => {
      getBeerDetail(route?.params.id).then((beer) => {
        setRating(beer.initial_rating)
        setBeerDetail(beer)
      })
    }, [])

    const rate = beersRating.find((i) => i.beer_id === Number(beerDetail.id))

    const getListBeerSimilar = async () => {
      try {
        setLoading(true)
        const res = await getBeerSimilar(parseInt(route?.params.id, 10))
        if (res) {
          setSimilarList(res)
        }
      } catch (error) {
        __DEV__ && console.log(error)
      } finally {
        setLoading(false)
      }
    }

    const onTop = async () => {
      scrollRef?.current?.scrollTo({
        y: 0,
        animated: true,
      })
      return Promise.resolve()
    }
    useFocusEffect(
      useCallback(() => {
        onTop().then()
        getListBeerSimilar().then()
        getBrewery(beerDetail.brewery.id).then()
      }, []),
    )

    const onFindMap = () => {
      if (beerDetail.location && beerDetail.brewery) {
        const data: any = {
          location: beerDetail.location,
          brewery: JSON.stringify(beerDetail.brewery),
        }
        navigation.navigate("map", data)
      }
    }

    const onFavorite = async (id: number) => {
      const index = beersFavouritesList.findIndex((i) => i.id === id)
      if (index !== -1) {
        const res = await setRemoveFavouriteBeer(id)
        if (res) {
          Toast.show({
            type: "success",
            text1: "Removed from favorites",
          })
        }
      } else {
        const res = await setAddFavouriteBeer(id)
        if (res) {
          Toast.show({
            type: "success",
            text1: "added to favorites",
          })
        }
      }
    }

    const ratingCompleted = async (rating: number) => {
      await setAddBeerRating(route?.params.id, rating)

      try {
        const api = new BeerApi()
        const result = await api.getBeer(route?.params.id)
        if (result.kind === "ok") {
          setRating(result.beer ? result.beer.initial_rating : 0)
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
    }

    const onBeerDetail = async (item: any) => {
      await onTop()
      navigation.push("beerDetails", item)
    }

    const onBrewerieDetail = (item: any) => {
      const xlat = item.lat
      const ylat = +xlat

      const xlng = item.lng
      const ylng = +xlng
      const data: any = {
        id: item.id,
        image: item.image_path || "http://18.134.172.89/media/custom/no-image-available.png",
        title: item.name,
        like: false,
        initial_rating: 0,
        local: item.address,
        description: item.description,
        website: item.website,
        phone: item.phone,
        founded: item.founded,
        latitude: ylat,
        longitude: ylng,
      }

      navigation.navigate("brewerieDetails", data)
    }
    const onPressFavorite = async (id: number) => {
      const index = beersFavouritesList.findIndex((i) => i.id === id)
      if (index !== -1) {
        const res = await setRemoveFavouriteBeer(id)
        if (res) {
          Toast.show({
            type: "success",
            text1: "Removed from favorites",
          })
        }
      } else {
        const res = await setAddFavouriteBeer(id)
        if (res) {
          Toast.show({
            type: "success",
            text1: "added to favorites",
          })
        }
      }
    }

    return (
      <>
        <Spinner visible={loading} />
        <Screen backgroundColor={color.palette.white} preset="scroll" ref={scrollRef}>
          <HeaderCustom
            variant="secondary"
            back={true}
            headerStyle="text-center"
            iconLike={true}
            iconShared={true}
            like={beerDetail.like}
            onLike={() => {
              onFavorite(Number(beerDetail.id))
            }}
          />
          <View style={tw`px-4 pb-10`}>
            <View style={tw`flex-row items-center`}>
              <ImageBackground
                source={{
                  uri: beerDetail?.image || beerDetail?.image_path,
                }}
                resizeMode="cover"
                style={tw`p-1 overflow-hidden border-2 border-green-500 rounded-full shadow-md w-25 h-25`}
              />
              <View style={tw`ml-4`}>
                <Text style={tw`text-lg font-bold text-brewtopiagray-700`}>
                  {limitBox(beerDetail?.title || beerDetail?.name, 27)}
                </Text>
                <View style={tw`flex-row items-center mt-1`}>
                  <FontAwesome name="star" size={16} color="#FF7558" />
                  <Text style={tw`ml-1 text-sm text-brewtopiagray-700`}>{rating}</Text>
                </View>
                <Text style={tw`text-sm text-brewtopiagray-700`}>{beerDetail.local}</Text>
                <Text style={tw`text-sm text-brewtopiagray-700`}>
                  {beerDetail?.strength || 0}% ABV
                </Text>
              </View>
            </View>
            <CustomButton
              onPress={() => onFindMap()}
              variant="primary"
              styleContainer="rounded-full py-2 w-3/4 self-end mt-5"
            >
              <View style={tw`flex-row items-center`}>
                <MaterialCommunityIcons name="map-marker-outline" size={25} color="#fff" />
                <Text style={tw`ml-2 text-sm text-white`}>Find</Text>
              </View>
            </CustomButton>
            {/* Se eliminó imagenes repetidas */}
            {/* <FlatList
                        data={DATA_MEDIA}
                        keyExtractor={(v) => v.id.toString()}
                        horizontal
                        contentContainerStyle={tw`pr-5 my-5`}
                        decelerationRate={"fast"}
                        snapToInterval={ITEM_WITH + SPACING * 2}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item: v}) => {
                            return (
                                <View style={tw`mr-2`}>
                                    <ImageBackground
                                        source={{uri: v.image}}
                                        resizeMode="cover"
                                        style={tw`w-${ITEM_WITH} h-${ITEM_WITH} rounded-xl  overflow-hidden p-1 shadow-md border border-green-500`}
                                    />
                                </View>
                            )
                        }}
                    /> */}
            <Text style={tw`mt-3 text-base font-bold text-brewtopiagray-700`}>Description</Text>
            <Text style={tw`mt-2 text-base text-brewtopiagray-700 shrink`}>
              {beerDetail.description}
            </Text>
            <View style={tw`flex-row items-center mt-5`}>
              {beerDetail?.tags && beerDetail.tags.length > 0 && (
                <FlatList
                  horizontal
                  data={beerDetail.tags}
                  keyExtractor={(item) => item.toString()}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <View style={tw`px-4 py-1 mr-3 border border-gray-300 rounded-md `}>
                      <Text>#{item}</Text>
                    </View>
                  )}
                />
              )}
            </View>

            <View style={tw`h-0.3 w-full bg-gray-200 my-5`} />
            <Text style={tw`text-base text-brewtopiagray-700`}>Have you this beer? Rate it.</Text>
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
            <Pressable onPress={() => beerDetail.brewery && onBrewerieDetail(beerDetail.brewery)}>
              <View style={tw`flex-row items-center`}>
                <ImageBackground
                  source={{
                    uri: beerDetail.brewery?.image_path
                      ? beerDetail.brewery?.image_path
                      : "http://18.134.172.89/media/custom/no-image-available.png",
                  }}
                  resizeMode="cover"
                  style={tw`p-1 overflow-hidden border border-green-500 shadow-md w-18 h-18 rounded-xl`}
                />

                <View style={tw`flex-1 ml-2`}>
                  <View style={tw`flex-row items-center justify-between`}>
                    <Text style={tw`text-lg font-bold text-brewtopiagray-700`}>
                      {limitBox(beerDetail.brewery?.name, 19)}
                    </Text>
                    <View style={tw`flex-row items-center`}>
                      <View
                        style={tw`items-center justify-center w-8 h-8 mr-2 border rounded-full border-brewtopia-500`}
                      >
                        <Feather name="share" size={18} color="#FF7558" />
                      </View>
                      <View
                        style={tw`items-center justify-center w-8 h-8 border rounded-full border-brewtopia-500`}
                      >
                        <Entypo name="heart-outlined" size={20} color="#FF7558" />
                      </View>
                    </View>
                  </View>
                  {/* <View style={tw`flex-row items-center`}>
                  <FontAwesome name="star" size={16} color="#FF7558" />
                  <Text style={tw`ml-1 text-sm text-brewtopiagray-700`}>
                    4.97 (1,001) . Brewery
                  </Text>
                </View> */}
                  <Text style={tw`text-sm text-brewtopiagray-700`}>
                    {beerDetail.brewery?.address}
                  </Text>
                </View>
              </View>
            </Pressable>
            <View style={tw`h-0.3 w-full bg-gray-200 my-5`} />
            {loading ? (
              <BannersListSkeleton />
            ) : (
              <BannersList
                title="Similar beers you might like"
                showRatings={false}
                styleContainerLike="bg-gray-400"
                showViewAll={false}
                data={similarList}
                onPressItem={onBeerDetail}
                onPressLike={onPressFavorite}
              />
            )}
          </View>
        </Screen>
      </>
    )
  },
)
