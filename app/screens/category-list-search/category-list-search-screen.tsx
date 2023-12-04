import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen, SearchInput } from "../../components"
import { View } from "react-native"
import { useStores } from "../../models"
import { color } from "../../theme"
import tw from "../../utils/tailwind"
import HeaderCustom from "../../components/header-custom/header-custom"
import List from "./Category/List"
import MakeMostModal from "../explore/Modal/MakeMostModal"
import ListSkeleton from "./Category/ListSkeleton"
import Toast from "react-native-toast-message"
import reactotron from "reactotron-react-native"

export const CategoryListSearchScreen: FC<
  StackScreenProps<NavigatorParamList, "categoryListSearch">
> = observer(({ navigation, route }) => {
  const [openModalMakeMost, setOpenModalMakeMost] = useState(false)
  // Pull in one of our MST stores
  const { beerStore, pubStore, breweryStore, userStore } = useStores()
  const {
    getSearchBeersViewAll,
    setAddFavouriteBeer,
    setRemoveFavouriteBeer,
    beersFavouritesList,
    beersTredingList,
    beersTopRateList,
  } = beerStore
  const { pubsSearchViewAllList, pubsTrendingList, getSearchPubsViewAll } = pubStore
  const {
    getSearchBreweriesViewAll,
    breweriesTopRatedList,
    setAddFavouriteBrewery,
    setRemoveFavouriteBrewery,
    breweriesFavouritesList,
  } = breweryStore

  const { isGuest } = userStore
  const [loading, setLoading] = useState(false)

  const params = route?.params || {
    id: 1,
    title: "",
    type: "beers",
  }

  const onSearch = async (text: string) => {
    switch (params.type) {
      case "breweries":
        setLoading(true)
        await getSearchBreweriesViewAll(text, true)
        setLoading(false)
        break
      case "pubs":
        setLoading(true)
        await getSearchPubsViewAll(text, true)
        setLoading(false)
        break
      default:
        setLoading(true)
        if (params.id === 1) {
          await getSearchBeersViewAll(text, true, true)
        } else if (params.id === 3) {
          await getSearchBeersViewAll(text, true)
        }
        setLoading(false)
        break
    }
  }

  const onDetails = (item: any) => {
    if (isGuest) {
      setOpenModalMakeMost(true)
    } else {
      switch (params.type) {
        case "breweries":
          navigation.navigate("brewerieDetails", item)
          break
        case "pubs":
          navigation.navigate("pubDetails", item)
        default:
          navigation.navigate("beerDetails", item)
          break
      }
    }
  }

  const onPressFavorite = async (id: number) => {
    switch (params.type) {
      case "breweries":
        return onPressFavoriteBrewery(id)
      case "pubs":
        return pubsSearchViewAllList
      default:
        return onPressFavoriteBeers(id)
    }
  }

  const onPressFavoriteBeers = async (id: number) => {
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

  const onPressFavoriteBrewery = async (id: number) => {
    const index = breweriesFavouritesList.findIndex((i) => i.id === id)
    if (index !== -1) {
      const res = await setRemoveFavouriteBrewery(id)
      if (res) {
        Toast.show({
          type: "success",
          text1: "Removed from favorites",
        })
      }
    } else {
      const res = await setAddFavouriteBrewery(id)
      if (res) {
        Toast.show({
          type: "success",
          text1: "added to favorites",
        })
      }
    }
  }

  return (
    <Screen backgroundColor={color.palette.white}>
      <HeaderCustom variant="secondary" headerText={params.title} headerStyle="text-center" />
      <View style={tw`items-center justify-between flex-1 `}>
        <View style={tw`w-full px-4 py-4`}>
          <SearchInput
            navigation={navigation}
            onSearch={onSearch}
            filter={params.type === "beers"}
          />
        </View>
        <View style={tw`flex-1 w-full`}>
          {loading ? (
            <ListSkeleton />
          ) : (
            <List
              onDetails={onDetails}
              type={params.type}
              list={
                params.id === 1
                  ? beersTopRateList
                  : params.id === 2
                  ? breweriesTopRatedList
                  : params.id === 3
                  ? beersTredingList
                  : pubsTrendingList
              }
              onPressFavorite={onPressFavorite}
            />
          )}
        </View>
      </View>
      <MakeMostModal
        open={openModalMakeMost}
        setOpen={setOpenModalMakeMost}
        navigation={navigation}
      />
    </Screen>
  )
})
