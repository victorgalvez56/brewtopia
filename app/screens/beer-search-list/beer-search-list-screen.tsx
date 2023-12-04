import React, {FC, useEffect, useState} from "react"
import {observer} from "mobx-react-lite"
import {StackScreenProps} from "@react-navigation/stack"
import {NavigatorParamList} from "../../navigators"
import {Screen, SearchInput} from "../../components"
import {FlatList, View, Text, ImageBackground, TouchableNativeFeedback, Pressable, TouchableOpacity} from "react-native"
// import { useStores } from "../../models"
import {color} from "../../theme"
import tw from "../../utils/tailwind"
import HeaderCustom from "../../components/header-custom/header-custom"
import Data from "./data.json"
import Feather from "@expo/vector-icons/Feather"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import ArrowOrder from "../../icons/ArrowOrder"
import ModealOrderBy from "./Modal/ModealOrderBy"
import {useStores} from "../../models";
import BannersListSkeleton from "../explore/component/BannerListSkeleton";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-toast-message";
import {limitBox} from "../../utils/helper";

const ITEM_WITH = 25

export const BeerSearchListScreen: FC<StackScreenProps<NavigatorParamList, "beerSearchList">> =
    observer(({navigation, route}) => {
        // Pull in one of our MST stores
        const {beerStore} = useStores()
        const {getBeersByBrewery, setAddFavouriteBeer, setRemoveFavouriteBeer, beersFavouritesList} = beerStore
        const [beers, setBeers] = useState([])
        const [loading, setLoading] = useState(false)

        const [openModalOrderBy, setOpenModalOrderBy] = useState(false)

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
        }

        const loadBeers = async (show: boolean) => {
            if (show)
                setLoading(true);

            try {
                const res = await getBeersByBrewery(item.id)
                if (res) {
                    setBeers(res)
                }
            } catch (error) {
                __DEV__ && console.log(error)
            } finally {
                if (show)
                    setLoading(false);
            }
        }

        useEffect(() => {
            loadBeers(true).then();
        }, [])

        const onPressFavorite = async (id: number) => {
            const index = beersFavouritesList.findIndex((i) => i.id === id)
            const beerIndex = beers.findIndex((i) => i.id === id)

            if (beerIndex !== -1)
                beers[beerIndex].like = !beers[beerIndex].like;

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

        const onBeerDetail = (item: any) => {
            navigation.navigate("beerDetails", item)
        }

        return (
            <Screen backgroundColor={color.palette.white}>
                <HeaderCustom
                    variant="secondary"
                    headerText={item.title}
                    back={true}
                    headerStyle="text-center"
                    iconShared
                />
                <ModealOrderBy open={openModalOrderBy} setOpen={setOpenModalOrderBy}/>
                <View style={tw`items-center justify-between flex-1 `}>
                    <View style={tw`w-full px-4 py-4`}>
                        <View style={tw`flex-row items-center justify-between mb-5`}>
                            <Text style={tw`text-base font-bold text-brewtopiagray-700`}>Beers available</Text>
                            <TouchableNativeFeedback
                                background={TouchableNativeFeedback.Ripple("#c4c4c4", true)}
                                onPress={() => requestAnimationFrame(() => setOpenModalOrderBy(true))}
                            >
                                <View style={tw`items-center justify-between p-1`}>
                                    <ArrowOrder/>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                        <SearchInput navigation={navigation}/>
                    </View>
                    {loading ? (
                        <Spinner visible={loading}/>
                    ) : (<View style={tw`flex-1 w-full`}>
                        <FlatList
                            data={beers}
                            keyExtractor={(item) => item.id.toString()}
                            contentContainerStyle={tw`p-5`}
                            ItemSeparatorComponent={() => <View style={tw`h-0.2 w-full bg-gray-50 my-3`}/>}
                            renderItem={({item}) => (
                                <View style={tw`flex-row items-start justify-between`}>
                                    <Pressable onPress={() => onBeerDetail(item)}>
                                        <ImageBackground
                                            source={{uri: item.image}}
                                            resizeMode="cover"
                                            style={tw`w-${ITEM_WITH} h-${ITEM_WITH} rounded-xl  overflow-hidden p-1 shadow-md`}
                                        />
                                    </Pressable>
                                    <View style={tw`flex-1 ml-3`}>
                                        <TouchableOpacity onPress={() => onBeerDetail(item)}>
                                            <View style={tw`flex-row items-center justify-between`}>
                                                <Text style={tw`text-base font-bold text-brewtopiagray-700`}>
                                                    {limitBox(item.title, 25)}
                                                </Text>
                                                <View
                                                    style={tw`items-center self-end justify-center w-6 h-6 overflow-hidden rounded-full`}
                                                >
                                                    <TouchableNativeFeedback
                                                        background={TouchableNativeFeedback.Ripple("#fff", false)}
                                                        onPress={() =>
                                                            requestAnimationFrame(() => {
                                                                if (onPressFavorite) {
                                                                    onPressFavorite(item.id).then()
                                                                }
                                                            })
                                                        }
                                                    >
                                                        <View
                                                            style={tw`items-center justify-center w-full h-full rounded-full bg-brewtopia-500`}
                                                        >
                                                            <FontAwesome
                                                                name={item.like ? "heart" : "heart-o"}
                                                                color={item.like ? "#cc0000" : "#FFFFFF"}
                                                                size={15}
                                                            />
                                                        </View>
                                                    </TouchableNativeFeedback>
                                                </View>
                                                {/* <View
                                                style={tw`items-center justify-center w-6 h-6 overflow-hidden rounded-full`}
                                            >
                                                <TouchableNativeFeedback
                                                    background={TouchableNativeFeedback.Ripple("#fff", false)}
                                                >
                                                    <View
                                                        style={tw`items-center justify-center w-full h-full rounded-full bg-brewtopiagray-500 `}
                                                    >
                                                        <Feather name="heart" color="#FFFFFF" size={15}/>
                                                    </View>
                                                </TouchableNativeFeedback>
                                            </View> */}
                                            </View>
                                            <Text style={tw`text-sm text-brewtopiagray-700`}>{item.local}</Text>
                                            <View style={tw`flex-row items-center justify-between`}>
                                                <Text style={tw`text-sm text-brewtopiagray-700`}>
                                                    {item.strength}% ABV
                                                </Text>
                                                <View style={tw`flex-row items-center mt-1`}>
                                                    <FontAwesome name="star" size={16} color="#FF7558"/>
                                                    <Text style={tw`ml-1 text-sm text-brewtopiagray-700`}>
                                                        {item.initial_rating}
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
                    </View>)}
                </View>
            </Screen>
        )
    })
