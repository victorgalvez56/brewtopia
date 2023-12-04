import React, { useEffect, useState } from "react"
import BannersList from "../component/BannersList"
import { observer } from "mobx-react-lite"
import { useStores } from "../../../models"
import BannersListSkeleton from "../component/BannerListSkeleton"
import Toast from "react-native-toast-message"
import reactotron from "reactotron-react-native"

interface Props {
  setOpenModalMakeMost: (v: boolean) => void
  navigation: any
}

const BeersBanner: React.FC<Props> = observer(({ setOpenModalMakeMost, navigation }) => {
  const { userStore, beerStore } = useStores()
  const { isGuest } = userStore
  const { getBeers, beersLike, setAddFavouriteBeer, setRemoveFavouriteBeer, beersFavouritesList } =
    beerStore
  const [loading, setLoading] = useState(false)
  const [fail, setFail] = useState(false)

  const reloadBackground = async () => {
    await getBeers()
  }

  const getList = async () => {
    if (beersLike.length === 0) {
      setLoading(true)
      const res = await getBeers()
      if (!res) {
        setFail(true)
      } else {
        setFail(false)
      }
      setLoading(false)
    }
  }

  useEffect(() => {
    const willFocusSubscription = navigation.addListener("focus", () => {
      reloadBackground()
      getList()
      setLoading(false)
    })
    return willFocusSubscription
  }, [])

  const onBeerDetail = (item: any) => {
    if (isGuest) {
      setOpenModalMakeMost(true)
    } else {
      navigation.navigate("beerDetails", item)
    }
  }

  const onPressViewAll = () => {
    navigation.navigate("beerViewAll")
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
      {loading ? (
        <BannersListSkeleton title="Beers you maybe like" />
      ) : (
        <BannersList
          title="Beers you maybe like"
          onPressItem={onBeerDetail}
          data={beersLike}
          onPressLike={onPressFavorite}
          onRefresh={getList}
          fail={fail}
          onPressViewAll={onPressViewAll}
        />
      )}
    </>
  )
})

export default BeersBanner
