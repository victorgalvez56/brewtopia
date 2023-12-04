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
import ListSkeleton from "./Category/ListSkeleton"
import List from "./Category/List"
import Toast from "react-native-toast-message"

export const BeerViewAllScreen: FC<StackScreenProps<NavigatorParamList, "beerViewAll">> = observer(
  ({ navigation }) => {
    // Pull in one of our MST stores
    const { beerStore } = useStores()
    const {
      getSearchBeersViewAll,
      setAddFavouriteBeer,
      setRemoveFavouriteBeer,
      beersFavouritesList,
    } = beerStore
    const [loading, setLoading] = useState(false)

    const onSearch = async (text: string) => {
      setLoading(true)
      await getSearchBeersViewAll(text)
      setLoading(false)
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

    return (
      <Screen backgroundColor={color.palette.white}>
        <HeaderCustom variant="secondary" headerText="Beers" headerStyle="text-center" />
        <View style={tw`items-center justify-between flex-1 `}>
          <View style={tw`w-full px-4 py-4`}>
            <SearchInput navigation={navigation} onSearch={onSearch} />
          </View>
          <View style={tw`flex-1 w-full`}>
            {loading ? (
              <ListSkeleton />
            ) : (
              <List navigation={navigation} onPressFavoriteBeers={onPressFavoriteBeers} />
            )}
          </View>
        </View>
      </Screen>
    )
  },
)
