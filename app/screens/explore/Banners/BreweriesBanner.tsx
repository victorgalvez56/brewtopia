import React, { useEffect, useState } from "react"
import BannersList from "../component/BannersList"
import { observer } from "mobx-react-lite"
import { useStores } from "../../../models"
import BannersListSkeleton from "../component/BannerListSkeleton"
import Toast from "react-native-toast-message"

interface Props {
  setOpenModalMakeMost: (v: boolean) => void
  navigation: any
}

const BreweriesBanner: React.FC<Props> = observer(({ setOpenModalMakeMost, navigation }) => {
  const { userStore, breweryStore } = useStores()
  const { isGuest } = userStore
  const {
    getBreweriesTopRated,
    breweriesTopRatedList,
    setAddFavouriteBrewery,
    setRemoveFavouriteBrewery,
    breweriesFavouritesList,
  } = breweryStore
  const [loading, setLoading] = useState(true)
  const [fail, setFail] = useState(false)

  const reloadBackground = async () => {
    await getBreweriesTopRated()
  }
  useEffect(() => {
    const willFocusSubscription = navigation.addListener("focus", () => {
      reloadBackground()
      getList()
      setLoading(false)
    })
    return willFocusSubscription
  }, [])

  const getList = async () => {
    if (breweriesTopRatedList.length === 0) {
      setLoading(true)
      const res = await getBreweriesTopRated()
      if (!res) {
        setFail(true)
      } else {
        setFail(false)
      }
      setLoading(false)
    }
  }

  const onBrewerieDetail = (item: any) => {
    if (isGuest) {
      setOpenModalMakeMost(true)
    } else {
      navigation.navigate("brewerieDetails", item)
    }
  }

  const onPressFavorite = async (id: number) => {
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

  const onPressViewAll = () => {
    navigation.navigate("breweryViewAll")
  }
  return (
    <>
      {loading ? (
        <BannersListSkeleton title="Rated Breweries" />
      ) : (
        <BannersList
          title="Rated Breweries"
          onPressItem={onBrewerieDetail}
          data={breweriesTopRatedList}
          onPressLike={onPressFavorite}
          onRefresh={getList}
          fail={fail}
          onPressViewAll={onPressViewAll}
          breweries={true}
        />
      )}
    </>
  )
})

export default BreweriesBanner
