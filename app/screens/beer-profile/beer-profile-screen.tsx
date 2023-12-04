import React, { FC, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen, Skeleton } from "../../components"
import SwiperFlatList from "react-native-swiper-flatlist"
import { View, FlatList, ImageBackground, Dimensions, Pressable, Text, Alert } from "react-native"
import { useStores } from "../../models"
import { color } from "../../theme"
import tw from "../../utils/tailwind"
import HeaderCustom from "../../components/header-custom/header-custom"
import { screen1, screen2, screen3, screen4, screen5 } from "./data"
import Spinner from "react-native-loading-spinner-overlay/lib"

const data = [screen1, screen2, screen3, screen4, screen5]

const { width, height } = Dimensions.get("window")

const pic = {
  width: width / 2 - 5,
  height: width / 2 + height * 0.05 - 13,
}

const card = {
  flex: 1,
  height: width / 2 + height * 0.045,
  paddingHorizontal: 4,
}

const initial = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
  10: 0,
  11: 0,
  12: 0,
}
export const BeerProfileScreen: FC<StackScreenProps<NavigatorParamList, "beerProfile">> = observer(
  ({ navigation }) => {
    // Pull in one of our MST stores
    const { userStore } = useStores()
    const { updateProfileBeer } = userStore
    const refSwiper = useRef<SwiperFlatList>(null)
    const [state, setState] = useState(initial)
    const [active, setActive] = useState(1)
    const [loading, setLoading] = useState(true)

    const choiceClicked = async (nextSlide: number, choiceTypes: number[]) => {
      choiceTypes.forEach((type) => {
        setState({
          ...state,
          [type]: state[type] + 1,
        })
      })
      if (nextSlide === 5) {
        const highest = Object.keys(state).reduce((a, b) => {
          return state[a] > state[b] ? a : b
        })
        await updateProfileBeer(highest)
        navigation.navigate("beerProfileReveal")
        setState(initial)
      } else {
        setActive(nextSlide + 1)
        refSwiper.current.scrollToIndex({ index: nextSlide, animated: true })
      }
    }
    return (
      <Screen style={tw`flex-1`} backgroundColor={color.palette.white} preset="scroll">
        <Spinner visible={loading} />
        <HeaderCustom
          variant="secondary"
          headerText="Create Beer Profile"
          back={true}
          headerStyle="text-center"
        />
        <View style={tw`px-4 py-2`}>
          <Text style={tw`text-base text-brewtopiagray-700`}>
            Which brew best suits you? ({active}/5)
          </Text>
        </View>
        <SwiperFlatList
          disableGesture
          ref={refSwiper}
          scrollEnabled={true}
          style={tw`w-[${width}px] flex-1`}
        >
          {data.map((element, key) => (
            <FlatList
              {...{ key }}
              scrollEnabled={true}
              data={element.options}
              numColumns={2}
              keyExtractor={(item) => item.image.toString()}
              renderItem={({ item, index }) => {
                const { types, image } = item
                return (
                  <Pressable onPress={() => choiceClicked(key + 1, types)} style={card}>
                    <ImageBackground
                      // onLoadStart={() =>setLoading(true)}
                      onLoadEnd={() =>setLoading(false)}
                      source={{ uri: image }}
                      resizeMode="cover"
                      style={tw`w-[${pic.width}px] h-[${pic.height}px] rounded-xl  overflow-hidden p-1 shadow-md`}
                    />
                  </Pressable>
                )
              }}
            />
          ))}
        </SwiperFlatList>
      </Screen>
    )
  },
)
