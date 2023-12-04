import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen } from "../../components"
import {
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableNativeFeedback,
  View,
  Modal,
  Pressable,
} from "react-native"
import { Achievement, useStores } from "../../models"
import { color } from "../../theme"
import tw from "../../utils/tailwind"
import LogoHeader from "../../icons/LogoHeader"
import Ionicons from "@expo/vector-icons/Ionicons"
import CustomButton from "../../components/custom-button/custom-button"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import MedalIcon from "../../icons/MedalIcon"
import { useFocusEffect } from "@react-navigation/native"
import { UserApi } from "../../services/api/user-api"
import Toast from "react-native-toast-message"
import LogoPrincipal from "../../icons/LogoPrincipal"

export const ProfileScreen: FC<StackScreenProps<NavigatorParamList, "profile">> = observer(
  ({ navigation }) => {
    // Pull in one of our MST stores
    const { userStore } = useStores()
    const {
      isGuest,
      name,
      lastname,
      avatar,
      getUser,
      beer_profile_id,
      beer_profile_name,
      beer_profile_detail,
    } = userStore
    const [openModalBadge, setOpenModalBadge] = useState(false)
    const [data, setData] = useState([])
    const [dataAchievement, setDataAchievement] = useState<Achievement>()

    useEffect(() => {
      getUser()

      const focusListener = navigation.addListener("focus", () => {
        getBadges().then()
      })
      return focusListener

    }, [])

    useFocusEffect(
      React.useCallback(() => {
        if (isGuest) {
          navigation.navigate("makeMost")
        }
      }, [isGuest]),
    )

    const getBadges = async () => {
      try {
        const api = new UserApi()
        const result = await api.getAchievements(false)
        if (result.kind === "ok") {
          setData(result.achievements)
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
    }

    const validateAchievements = async (achievement) => {

      setDataAchievement(achievement)
      setOpenModalBadge(true)
    }

    const PostUpdateAchievements = async (achievement) => {
      if (achievement.is_new !== 0) {
        try {
          const api = new UserApi()
          const result = await api.updateAchievementsService(achievement.id)
          if (result.kind === "ok") {
            setOpenModalBadge(false)
            await getBadges()
            /* Toast.show({
              type: "success",
              text1: "You claimed a new badge",
            }) */
          }
        } catch (error) {
          __DEV__ && console.log(error)
        }
      } else {
        setOpenModalBadge(false)
        /* Toast.show({
          type: "error",
          text1: "You already claimed this badge",
        }) */
      }
    }

    return (
      <Screen backgroundColor={color.palette.white} preset="scroll">
        <View>
          <View style={tw`h-30 bg-brewtopia-500`}>
            <View style={tw`flex-row items-center justify-between px-4 mt-5`}>
              <View style={tw`items-center flex-1 ml-15`}>
                <LogoHeader />
              </View>
              <View style={tw`items-center justify-center w-10 h-10 overflow-hidden rounded-full`}>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple("#c4c4c4", true)}
                  onPress={() => requestAnimationFrame(() => navigation.navigate("settings"))}
                >
                  <View style={tw`bg-[#c2614d] items-center justify-center w-full h-full `}>
                    <Ionicons name="settings" size={25} color="#fff" />
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          </View>
          <ImageBackground
            source={{
              uri: avatar,
            }}
            resizeMode="cover"
            style={tw`absolute p-1 overflow-hidden border-2 border-white rounded-full shadow-md w-25 h-25 top-16 left-5`}
          />
          <View>
            <CustomButton
              variant="primary"
              title={beer_profile_id ? "Rebuild Beer Profile" : "Create Beer Profile"}
              onPress={() => navigation.navigate("beerProfile")}
              styleContainer="w-1/2 self-end mt-3 absolute right-5 py-3"
            />
          </View>
          <View style={tw`w-3/4 ml-6 mt-15`}>
            <Text style={tw`text-lg font-bold text-brewtopiagray-700`}>
              {name} {lastname}
            </Text>
          </View>
          {beer_profile_id && (
            <View style={tw`px-6 `}>
              <Text style={tw`text-xl font-bold text-brewtopia-500`}>{beer_profile_name}</Text>
              <Text style={tw`mt-2 text-sm text-gray-500`}>{beer_profile_detail}</Text>
            </View>
          )}

          <View style={tw`mt-5 `}>
            <View style={tw`justify-center overflow-hidden border border-white rounded-md h-18`}>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple("#f4f4f4", true)}
                onPress={() => requestAnimationFrame(() => navigation.navigate("favorites"))}
              >
                <View style={tw`flex-row items-center justify-between px-6`}>
                  <View
                    style={tw`items-center justify-center w-12 h-12 rounded-md bg-brewtopia-500`}
                  >
                    <FontAwesome name="heart" size={30} color="#fff" />
                  </View>
                  <Text style={tw`flex-1 ml-3 text-base text-brewtopiagray-700`}>
                    Your Favourites
                  </Text>
                  <FontAwesome name="angle-right" size={25} color="#ff7558" />
                </View>
              </TouchableNativeFeedback>
            </View>
            <View style={tw`w-full h-0.3 bg-gray-200 my-2`} />
            {/* HOLD ON FOR BEERS SCANNED */}
            {/* <View style={tw`justify-center overflow-hidden border border-white rounded-md h-18`}>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple("#f4f4f4", true)}
                onPress={() => requestAnimationFrame(() => console.log("hello word"))}
              >
                <View style={tw`flex-row items-center justify-between px-6`}>
                  <View
                    style={tw`items-center justify-center w-12 h-12 rounded-md bg-brewtopia-500`}
                  >
                    <ScannerBeersIcon />
                  </View>
                  <Text style={tw`flex-1 ml-3 text-base text-brewtopiagray-700`}>
                    Your beers scanned
                  </Text>
                  <FontAwesome name="angle-right" size={25} color="#ff7558" />
                </View>
              </TouchableNativeFeedback>
            </View> */}
          </View>
          <View style={tw`flex-row items-center justify-between px-6 mt-10`}>
            <View style={tw`flex-row items-center`}>
              <MedalIcon />
              <Text style={tw`ml-4 text-base text-brewtopiagray-700`}>Your badges</Text>
            </View>
          </View>
          <View style={tw`flex-row items-center justify-around mt-5`}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              contentContainerStyle={tw`px-4 `}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                if (item.image_path) {
                  return (
                    <TouchableNativeFeedback
                      background={TouchableNativeFeedback.Ripple("#c4c4c4", false)}
                      onPress={() => validateAchievements(item)}
                    >
                      <View
                        style={tw`items-center justify-center w-20 h-20 mr-2 overflow-hidden border border-gray-200 rounded-full`}
                      >
                        <Image
                          source={{ uri: item.icon_path }}
                          style={tw`w-35 h-35`}
                          resizeMode="cover"
                        />
                      </View>
                    </TouchableNativeFeedback>
                  )
                }
                return null
              }}
            />
            {/* <Badge1 />
            <Badge5 />
            <Badge10 />
            <Badge20 /> */}
          </View>

          <Modal
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
                {dataAchievement ? (
                  <ImageBackground
                    source={{
                      uri: dataAchievement.image_path,
                    }}
                    resizeMode="cover"
                    style={tw`w-${30} h-${30} rounded-xl  overflow-hidden p-1 shadow-md`}
                  ></ImageBackground>
                ) : (
                  <LogoPrincipal />
                )}

                <Text style={tw`mb-3 mt-3 text-2xl font-bold text-brewtopia-500`}>
                  Congratulations!
                </Text>
                <Text style={tw`text-base text-center text-brewtopiagray-700`}>
                  You have earned a new badge.
                </Text>
                <CustomButton
                  title="Great!"
                  onPress={() => setOpenModalBadge(false)}
                  variant="primary"
                  styleContainer="mt-5"
                />
              </View>
            </View>
          </Modal>
        </View>
      </Screen>
    )
  },
)
