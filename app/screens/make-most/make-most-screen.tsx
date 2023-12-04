import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen } from "../../components"
import { Text, View } from "react-native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import tw from "../../utils/tailwind"
import HeaderCustom from "../../components/header-custom/header-custom"
import MostIcon from "../../icons/MostIcon"
import CustomButton from "../../components/custom-button/custom-button"

export const MakeMostScreen: FC<StackScreenProps<NavigatorParamList, "makeMost">> = observer(
  ({ navigation }) => {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    return (
      <Screen backgroundColor={color.primary}>
        <HeaderCustom
          variant="primary"
          back={false}
          headerStyle="items-center"
          iconSetting={true}
          onSetting={() => navigation.navigate("settings")}
        />
        <View style={tw`justify-between flex-1 px-4 py-13`}>
          <View>
            <Text style={tw`text-2xl font-semibold text-center text-white`}>
              Make the most of Brewtopia!
            </Text>
            <Text style={tw`mt-5 text-base text-center text-white`}>
              Find beers near you, earn badges and awards{"\n"}
              and get personalised recommendations!
            </Text>
          </View>
          <View style={tw`items-center`}>
            <MostIcon />
          </View>
          <View>
            <CustomButton
              title="Become a Brewtopian"
              onPress={() => navigation.navigate("register")}
              variant="secondary"
              styleContainer="mb-5"
            />
            <CustomButton
              title="I'm already a Brewtopian"
              onPress={() => navigation.navigate("login")}
              variant="primary"
              styleContainer="bg-[#BD5740] shadow-none"
              backgroundColorRiple="#BD5740"
            />
          </View>
        </View>
      </Screen>
    )
  },
)
