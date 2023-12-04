import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen } from "../../components"
import { TouchableOpacity, Text, View } from "react-native"
import { useStores } from "../../models"
import { color } from "../../theme"
import tw from "../../utils/tailwind"
import CustomButton from "../../components/custom-button/custom-button"
import LogoPrincipal from "../../icons/LogoPrincipal"
import { useFocusEffect } from "@react-navigation/native"

export const BecomeScreen: FC<StackScreenProps<NavigatorParamList, "become">> = observer(
  ({ navigation }) => {
    // Pull in one of our MST stores
    const { authStore } = useStores()
    // const { setGuest } = userStore
    const { access_token } = authStore

    // const onGuest = () => {
    //   setGuest(true)
    //   navigation.navigate("dashboard")
    // }

    useEffect(() => {
      if (access_token !== "") {
        navigation.navigate("dashboard")
      }
    }, [])

    useFocusEffect(
      React.useCallback(() => {
        if (access_token !== "") {
          navigation.navigate("dashboard")
        }
      }, [access_token]),
    )

    return (
      <Screen style={tw`flex-1`} backgroundColor={color.primary} preset="scroll">
        <View style={tw`flex-1 px-4 pb-10`}>
          <View style={tw`items-center justify-center flex-1`}>
            <View style={tw`mb-4 mt-10`}>
              <LogoPrincipal />
            </View>
            <Text style={tw`text-base font-bold text-center text-white`}>
              At Brewtopia we belive that people deserve{"\n"}
              to drink better beer!
            </Text>
          </View>
          <View>
            <CustomButton
              variant="secondary"
              title="Become a Brewtopian"
              onPress={() => navigation.navigate("register")}
            />
            <CustomButton
              title="I'm already a Brewtopian"
              onPress={() => navigation.navigate("login")}
              variant="primary"
              styleContainer="mb-4 border-2 border-white mt-6 shadow-none"
            />
            {/* <TouchableOpacity onPress={() => onGuest()}>
            <Text style={tw`mb-6 text-base font-bold text-center text-white`}>
              Continue as guest
            </Text>
          </TouchableOpacity> */}
          </View>
        </View>
      </Screen>
    )
  },
)
