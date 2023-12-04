import React, { FC, useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen } from "../../components"
import { useStores } from "../../models"
import { color } from "../../theme"
import tw from "../../utils/tailwind"
import HeaderCustom from "../../components/header-custom/header-custom"
import TopSearchList from "./Tops/TopSearchList"
import Fab from "./FAB"
import MakeMostModal from "./Modal/MakeMostModal"
import BeersBanner from "./Banners/BeersBanner"
import PubsBanner from "./Banners/PubsBanner"
import BreweriesBanner from "./Banners/BreweriesBanner"
import { UserApi } from "../../services/api/user-api"
import { View, Text, Modal, Pressable, ImageBackground } from "react-native"
import CustomButton from "../../components/custom-button/custom-button"
import reactotron from "reactotron-react-native"

export const ExploreScreen: FC<StackScreenProps<NavigatorParamList, "explore">> = observer(
  ({ navigation }) => {
    // Pull in one of our MST stores
    const { userStore, breweryStore, beerStore, pubStore } = useStores()
    const { id, isGuest } = userStore
    const { getBreweries } = breweryStore
    const { getBeersTrendingTop, getBeersTopRated } = beerStore
    const { getPubsTrendingTop, getPubs } = pubStore
    const [openModalMakeMost, setOpenModalMakeMost] = useState(false)
    const [openModalBadge, setOpenModalBadge] = useState(false)
    const [data, setData] = useState(null)

    useEffect(() => {
      const focusListener = navigation.addListener("focus", () => {
        reloadBackground()
      })
      return focusListener
    }, [])

    const reloadBackground = async () => {
      await getPubs()
      await getBreweries()
      await getBeersTopRated()
      await getBeersTrendingTop()
      await getPubsTrendingTop()
      await getBeersTrendingTop()

      await getBadges()
    }

    const getBadges = async () => {
      try {
        const api = new UserApi()
        const result = await api.getAchievements(true)
        if (result.kind === "ok") {
          if (result.achievements.length !== 0) {
            setOpenModalBadge(true)
            setData(result.achievements[0])
          }
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
    }

    const PostUpdateAchievements = async (id: string) => {
      try {
        const api = new UserApi()
        const result = await api.updateAchievementsService(id)
        if (result.kind === "ok") {
          setOpenModalBadge(false)
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
    }

    return (
      <>
        <Screen style={tw`pb-20`} backgroundColor={color.palette.orange} preset="scroll">
          <HeaderCustom
            variant="primary"
            searchable
            back={false}
            onSearch={() => navigation.navigate("search")}
            type={"brewery"}
            objectId={id}
          />
          <View style={tw`p-4 bg-white`}>
            <TopSearchList navigation={navigation} />
            <BeersBanner setOpenModalMakeMost={setOpenModalMakeMost} navigation={navigation} />
            <PubsBanner setOpenModalMakeMost={setOpenModalMakeMost} navigation={navigation} />
            <BreweriesBanner setOpenModalMakeMost={setOpenModalMakeMost} navigation={navigation} />
          </View>
          {isGuest && (
            <MakeMostModal
              open={openModalMakeMost}
              setOpen={setOpenModalMakeMost}
              navigation={navigation}
            />
          )}
          {data ? (
            <Modal
              key={data.id}
              animationType="fade"
              transparent={true}
              visible={openModalBadge}
              onRequestClose={() => {
                setOpenModalBadge(false)
              }}
            >
              <Pressable
                style={tw`absolute inset-0 bg-black opacity-75`}
                onPress={() => setOpenModalBadge(false)}
              />
              <View style={tw`p-5 bg-white shadow-xl top-60 mx-auto h-80 w-80 rounded-xl`}>
                <View style={tw`items-center justify-center`}>
                  <ImageBackground
                    source={{
                      uri: data.image_path,
                    }}
                    resizeMode="cover"
                    style={tw`w-${30} h-${30} rounded-xl  overflow-hidden p-1 shadow-md`}
                  ></ImageBackground>
                  <Text style={tw`mb-3 mt-3 text-2xl font-bold text-brewtopia-500`}>
                    Congratulations!
                  </Text>
                  <Text style={tw`text-base text-center text-brewtopiagray-700`}>
                    You have earned a new badge.
                  </Text>
                  <CustomButton
                    title="Great!"
                    onPress={() => PostUpdateAchievements(data.id)}
                    variant="primary"
                    styleContainer="mt-5"
                  />
                </View>
              </View>
            </Modal>
          ) : null}
        </Screen>
        {isGuest && <Fab />}
      </>
    )
  },
)
