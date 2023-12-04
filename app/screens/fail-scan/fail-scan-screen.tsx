import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, TabScreenParamList } from "../../navigators"
import { Screen } from "../../components"
import { Text, View } from "react-native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import tw from "../../utils/tailwind"
import HeaderCustom from "../../components/header-custom/header-custom"
import Lottie from "lottie-react-native"
import CustomButton from "../../components/custom-button/custom-button"
import { useStores } from "../../models"
import Spinner from "react-native-loading-spinner-overlay/lib"

export const FailScanScreen: FC<
  StackScreenProps<NavigatorParamList & TabScreenParamList, "failScan">
> = observer(({ navigation }) => {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const { beerStylesStore } = useStores()
  const { getBeerStyles } = beerStylesStore
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    getList()
  }, [])

  const getList = async () => {
    setLoading(true)
    await getBeerStyles()
    setLoading(false)
  }
  return (
    <Screen style={tw`flex-1`} backgroundColor={color.palette.white} preset="scroll">
      <Spinner visible={loading} />
      <HeaderCustom
        variant="secondary"
        headerText="Fail Scan"
        back={true}
        headerStyle="text-center"
      />
      <View style={tw`flex-1 px-6 `}>
        <View style={tw`h-[${300}px]`}>
          <Lottie
            source={require("../../icons/animations/simple-drunk-beer-bottle.json")}
            loop={true}
            resizeMode="contain"
            autoPlay
          />
        </View>
        <Text style={tw`text-xl font-bold text-center text-brewtopia-500`}>
          Oh no! That concoction isn't in our inventory yet.
        </Text>
        <Text style={tw`mt-3 text-base text-center text-brewtopiagray-700`}>
          This isn’t what you ordered, is it? Sorry. We’re continually updating our brews, so might
          have a few beers missing.
        </Text>

        <View style={tw`items-center justify-center mt-20`}>
          <CustomButton
            styleContainer="w-full"
            variant="primary"
            title="Try a different pic"
            onPress={() => navigation.navigate("camera_home")}
          />
          <CustomButton
            title="Submit a beer"
            onPress={() => navigation.navigate("beerCreate")}
            variant="primary"
            styleContainer="mt-5"
          />
        </View>
      </View>
    </Screen>
  )
})
