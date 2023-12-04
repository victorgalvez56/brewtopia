import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen } from "../../components"
import { Text, View } from "react-native"
import { useStores } from "../../models"
import { color } from "../../theme"
import tw from "../../utils/tailwind"
import CustomButton from "../../components/custom-button/custom-button"

export const BeerProfileRevealScreen: FC<
  StackScreenProps<NavigatorParamList, "beerProfileReveal">
> = observer(({ navigation }) => {
  // Pull in one of our MST stores
  const { userStore } = useStores()
  const { name, lastname, beer_profile_name, beer_profile_detail } = userStore

  return (
    <Screen style={tw`ios:flex-1`} backgroundColor={color.primary}>
      <View style={tw`px-4 py-6  flex-1 justify-between items-center`}>
        <View style={tw``}>
          <Text style={tw`text-2xl font-bold text-center text-white`}>
            {name} {lastname}
          </Text>
          <Text style={tw`mt-2 text-xl font-semibold text-center text-white`}>
            {beer_profile_name}
          </Text>
        </View>
        <View style={tw`items-center justify-center`}>
          <Text style={tw`text-lg text-center text-white`}>{beer_profile_detail}</Text>
        </View>

        <CustomButton
          title="I'm already a Brewtopian"
          onPress={() => navigation.navigate("profile")}
          variant="secondary"
          styleContainer="mb-4 border-2 border-white mt-6 shadow-none"
        >
          <Text style={tw`text-base text-brewtopia-500 font-bold`}>Continue</Text>
        </CustomButton>
      </View>
    </Screen>
  )
})
