import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen } from "../../components"
import { ImageBackground, Pressable, TouchableOpacity, View } from "react-native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import tw from "../../utils/tailwind"
import AntDesign from "@expo/vector-icons/AntDesign"
import SendIcon from "../../icons/SendIcon"
import { LinearGradient } from "expo-linear-gradient"

export const PreviewScanScreen: FC<StackScreenProps<NavigatorParamList, "previewScan">> = observer(
  ({ navigation, route }) => {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()
    console.log(route)
    const { base64 } = route.params

    return (
      <Screen backgroundColor={color.palette.white}>
        <View style={tw`flex-1`}>
          <ImageBackground
            source={{ uri: `data:image/png;base64,${base64}` }}
            resizeMode="cover"
            style={tw`w-full h-full p-1 overflow-hidden`}
          >
            <View style={tw`items-end justify-end flex-1 px-6 py-10`}>
              <LinearGradient
                colors={["#00000010", "#00000045"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={tw`absolute p-2 rounded-full left-4 top-5`}
              >
                <Pressable onPress={() => navigation.goBack()}>
                  <AntDesign name="close" size={25} color="#FFF" />
                </Pressable>
              </LinearGradient>
              <TouchableOpacity onPress={() => console.log("hola mundo")}>
                <View style={tw`items-center justify-center bg-white rounded-full w-15 h-15`}>
                  <SendIcon />
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </Screen>
    )
  },
)
