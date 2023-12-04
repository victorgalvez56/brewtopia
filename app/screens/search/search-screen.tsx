import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { TabScreenParamList } from "../../navigators"
import { Screen, SearchInput } from "../../components"
import { View } from "react-native"
import { useStores } from "../../models"
import { color } from "../../theme"
import tw from "../../utils/tailwind"
import TabCustom from "../../components/tab-custom/tab-custom"
import ListSkeleton from "./Skeleton/ListSkeleton"
import PubList from "./PubListSearch/PubList"
import MakeMostModal from "../explore/Modal/MakeMostModal"
import BreweryList from "./BreweriesListSearch/BreweryList"
import BeerList from "./BeerListSearch/BeerList"
import Toast from "react-native-toast-message"

export const SearchScreen: FC<StackScreenProps<TabScreenParamList, "search">> = observer(
  ({ navigation }) => {
    // Pull in one of our MST stores
    const { pubStore, breweryStore, beerStore, beerStylesStore } = useStores()
    const [tab, setTab] = useState(1)
    const { getSearchPubs } = pubStore
    const {
      getSearchBreweries,
      setAddFavouriteBrewery,
      setRemoveFavouriteBrewery,
      breweriesFavouritesList,
    } = breweryStore
    const { getSearchBeers, setAddFavouriteBeer, setRemoveFavouriteBeer, beersFavouritesList } =
      beerStore
    const { onSelectedStyle } = beerStylesStore

    const [loading, setLoading] = useState(false)
    const [openModalMakeMost, setOpenModalMakeMost] = useState(false)
    const [searchBeer, setSearchBeer] = useState(false)

    /* useEffect(() => {

      const focusListener = navigation.addListener("focus", () => {

      })
      return focusListener

    }, []) */

    const onSearch = async (text: string) => {
      switch (tab) {
        case 1:
          setLoading(true)
          setSearchBeer(true)
          // await getSearchBeers(text)
          await onSelectedStyle([], text)
          setLoading(false)
          break
        case 2:
          setLoading(true)
          setSearchBeer(false)
          await getSearchBreweries(text)
          setLoading(false)
          break
        default:
          setLoading(true)
          setSearchBeer(false)
          await getSearchPubs(text)
          setLoading(false)
          break
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
        <View style={tw`p-5 bg-white shadow-xl`}>
          <SearchInput navigation={navigation} onSearch={onSearch} filter={tab === 1} />
          <TabCustom tab={tab} setTab={setTab} styleContainer="mt-5" />
        </View>
        <View style={tw`flex-1`}>
          {loading ? (
            <ListSkeleton />
          ) : (
            <View style={tw`pb-20`}>
              {tab === 1 && (
                <BeerList
                  searchBeer={searchBeer}
                  navigation={navigation}
                  setOpenModalMakeMost={setOpenModalMakeMost}
                  onPressFavoriteBeers={onPressFavoriteBeers}
                />
              )}

              {tab === 2 && (
                <BreweryList
                  navigation={navigation}
                  setOpenModalMakeMost={setOpenModalMakeMost}
                  onPressFavoriteBrewery={onPressFavoriteBrewery}
                />
              )}
              {tab === 3 && (
                <PubList navigation={navigation} setOpenModalMakeMost={setOpenModalMakeMost} />
              )}
            </View>
          )}
        </View>
        <MakeMostModal
          open={openModalMakeMost}
          setOpen={setOpenModalMakeMost}
          navigation={navigation}
        />
      </Screen>
    )
  },
)
