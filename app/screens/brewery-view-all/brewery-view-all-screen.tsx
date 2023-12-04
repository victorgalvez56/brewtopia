import React, { FC, useState,useEffect } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen, SearchInput } from "../../components"
import { View } from "react-native"
import { useStores } from "../../models"
import { color } from "../../theme"
import tw from "../../utils/tailwind"
import HeaderCustom from "../../components/header-custom/header-custom"
import ListSkeleton from "./Category/ListSkeleton"
import List from "./Category/List"
import Toast from "react-native-toast-message"

export const BreweryViewAllScreen: FC<StackScreenProps<NavigatorParamList, "breweryViewAll">> =
  observer(({ navigation }) => {
    // Pull in one of our MST stores
    const { breweryStore } = useStores()
    const {
      getSearchBreweriesViewAll,
      setAddFavouriteBrewery,
      setRemoveFavouriteBrewery,
      breweriesFavouritesList,breweriesSearchViewAllList
    } = breweryStore
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      console.warn("get achi:::", breweriesSearchViewAllList)
    }, [])

    const onSearch = async (text: string) => {
      setLoading(true)
      await getSearchBreweriesViewAll(text)
      setLoading(false)
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
        <HeaderCustom variant="secondary" headerText="Breweries" headerStyle="text-center" />
        <View style={tw`items-center justify-between flex-1 `}>
          <View style={tw`w-full px-4 py-4`}>
            <SearchInput navigation={navigation} onSearch={onSearch} filter={false} />
          </View>
          <View style={tw`flex-1 w-full`}>
            {loading ? <ListSkeleton /> : <List navigation={navigation} onPressFavoriteBrewery={onPressFavoriteBrewery}/>}
          </View>
        </View>
      </Screen>
    )
  })
