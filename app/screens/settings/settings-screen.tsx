import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen } from "../../components"
import { Text, TouchableNativeFeedback, View } from "react-native"
import { useStores } from "../../models"
import { color } from "../../theme"
import tw from "../../utils/tailwind"
import HeaderCustom from "../../components/header-custom/header-custom"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import Toast from "react-native-toast-message"
import { ActivityIndicator } from "react-native-paper"

export const SettingsScreen: FC<StackScreenProps<NavigatorParamList, "settings">> = observer(
  ({ navigation }) => {
    // Pull in one of our MST stores
    const { authStore } = useStores()
    const { signOut } = authStore
    const [loading, setLoading] = useState(false)

    const onSignOut = async () => {
      try {
        setLoading(true)
        const logout = await signOut()
        if (logout) {
          navigation.navigate("dashboard")
        } else {
          Toast.show({
            type: "error",
            text1: "Error when logging out",
          })
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    return (
      <Screen backgroundColor={color.palette.white} preset="scroll">
        <HeaderCustom
          variant="secondary"
          headerText="Settings"
          back={true}
          headerStyle="text-center"
        />
        <View style={tw`flex-1`}>
          <View style={tw`p-4 bg-gray-50`}>
            <Text style={tw`text-base font-bold text-brewtopia-500`}>Account</Text>
          </View>
          <View style={tw`px-4`}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple("#f4f4f4", false)}
              onPress={() => navigation.navigate("profileEdit")}
            >
              <View style={tw`flex-row items-center justify-between py-4`}>
                <Text style={tw`text-base text-brewtopiagray-700`}>Edit Profile</Text>
                <FontAwesome name="angle-right" size={25} color="#49484D" />
              </View>
            </TouchableNativeFeedback>
            <View style={tw`h-0.3 w-full bg-gray-300`} />
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple("#f4f4f4", false)}
              onPress={() => navigation.navigate("loginDetails")}
            >
              <View style={tw`flex-row items-center justify-between py-4`}>
                <Text style={tw`text-base text-brewtopiagray-700`}>Login Details</Text>
                <FontAwesome name="angle-right" size={25} color="#49484D" />
              </View>
            </TouchableNativeFeedback>
            <View style={tw`h-0.3 w-full bg-gray-300`} />
          </View>
          <View style={tw`p-4 bg-gray-50`}>
            <Text style={tw`text-base font-bold text-brewtopia-500`}>App</Text>
          </View>
          <View style={tw`px-4`}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple("#f4f4f4", false)}
              onPress={() => navigation.navigate("feedback")}
            >
              <View style={tw`flex-row items-center justify-between py-4`}>
                <Text style={tw`text-base text-brewtopiagray-700`}>Submit Feedback</Text>
                <FontAwesome name="angle-right" size={25} color="#49484D" />
              </View>
            </TouchableNativeFeedback>
            <View style={tw`h-0.3 w-full bg-gray-300`} />
          </View>
          <View style={tw`p-4 bg-gray-50`}>
            <Text style={tw`text-base font-bold text-brewtopia-500`}>Others</Text>
          </View>
          <View style={tw`px-4`}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple("#f4f4f4", false)}
              onPress={() => navigation.navigate("contactUs")}
            >
              <View style={tw`flex-row items-center justify-between py-4`}>
                <Text style={tw`text-base text-brewtopiagray-700`}>Contact us</Text>
                <FontAwesome name="angle-right" size={25} color="#49484D" />
              </View>
            </TouchableNativeFeedback>
            <View style={tw`h-0.3 w-full bg-gray-300`} />
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple("#f4f4f4", false)}
              onPress={() => navigation.navigate("privacy")}
            >
              <View style={tw`flex-row items-center justify-between py-4`}>
                <Text style={tw`text-base text-brewtopiagray-700`}>Privacy Policy</Text>
                <FontAwesome name="angle-right" size={25} color="#49484D" />
              </View>
            </TouchableNativeFeedback>
            <View style={tw`h-0.3 w-full bg-gray-300`} />
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple("#f4f4f4", false)}
              onPress={() => navigation.navigate("faq")}
            >
              <View style={tw`flex-row items-center justify-between py-4`}>
                <Text style={tw`text-base text-brewtopiagray-700`}>FAQ</Text>
                <FontAwesome name="angle-right" size={25} color="#49484D" />
              </View>
            </TouchableNativeFeedback>
            <View style={tw`h-0.3 w-full bg-gray-300`} />
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple("#f4f4f4", false)}
              onPress={() => navigation.navigate("termsConditions")}
            >
              <View style={tw`flex-row items-center justify-between py-4`}>
                <Text style={tw`text-base text-brewtopiagray-700`}>Terms & Conditions</Text>
                <FontAwesome name="angle-right" size={25} color="#49484D" />
              </View>
            </TouchableNativeFeedback>
            <View style={tw`h-0.3 w-full bg-gray-300`} />
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple("#f4f4f4", false)}
              onPress={() => navigation.navigate("aboutUs")}
            >
              <View style={tw`flex-row items-center justify-between py-4`}>
                <Text style={tw`text-base text-brewtopiagray-700`}>About us</Text>
                <FontAwesome name="angle-right" size={25} color="#49484D" />
              </View>
            </TouchableNativeFeedback>
            <View style={tw`h-0.3 w-full bg-gray-300`} />
          </View>
          <View style={tw`mb-10`}>
            <TouchableNativeFeedback
              onPress={() => onSignOut()}
              background={TouchableNativeFeedback.Ripple("#f4f4f4", false)}
            >
              <View style={tw`items-center justify-center p-2`}>
                <Text style={tw`text-base font-bold text-brewtopiagray-700`}>Logout</Text>
                {loading && <ActivityIndicator size="small" color={"#4267b2"} />}
              </View>
            </TouchableNativeFeedback>
            <Text style={tw`text-base font-bold text-center text-gray-500`}>
              Brewtopia 0.2.5
            </Text>
          </View>
        </View>
      </Screen>
    )
  },
)
