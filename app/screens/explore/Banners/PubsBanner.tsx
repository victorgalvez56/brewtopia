import React, { useEffect, useState } from "react"
import BannersList from "../component/BannersList"
import { observer } from "mobx-react-lite"
import { useStores } from "../../../models"
import BannersListSkeleton from "../component/BannerListSkeleton"

interface Props {
  setOpenModalMakeMost: (v: boolean) => void
  navigation: any
}

const PubsBanner: React.FC<Props> = observer(({ setOpenModalMakeMost, navigation }) => {
  const { userStore, pubStore } = useStores()
  const { isGuest } = userStore
  const { getPubsNearYou, pubsNearList } = pubStore
  const [loading, setLoading] = useState(false)
  const [fail, setFail] = useState(false)

  const reloadBackground = async () => {
    await getPubsNearYou()
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
    if (pubsNearList.length === 0) {
      setLoading(true)
      const res = await getPubsNearYou()
      if (!res) {
        setFail(true)
      } else {
        setFail(false)
      }
      setLoading(false)
    }
  }

  const onPubDetail = (item: any) => {
    if (isGuest) {
      setOpenModalMakeMost(true)
    } else {
      navigation.navigate("pubDetails", item)
    }
  }
  const onPressViewAll = () => {
    navigation.navigate("pubViewAll")
  }

  return (
    <>
      {loading ? (
        <BannersListSkeleton title="Pubs near you" />
      ) : (
        <BannersList
          title="Pubs near you"
          onPressItem={onPubDetail}
          data={pubsNearList}
          fail={fail}
          onRefresh={getList}
          onPressViewAll={onPressViewAll}
        />
      )}
    </>
  )
})

export default PubsBanner
