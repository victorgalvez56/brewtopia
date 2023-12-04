import React, { FC, useRef } from "react"
import { View, Animated } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { NavigatorParamList } from "../../navigators"
import { Screen } from "../../components"
import { color } from "../../theme"
import tw from "../../utils/tailwind"
import Lottie from "lottie-react-native"
import { useFocusEffect } from "@react-navigation/native"

export const WelcomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
  ({ navigation }) => {
    const progress = useRef(new Animated.Value(0)).current
    const animation = useRef(null)

    useFocusEffect(
      React.useCallback(() => {
        console.log("focus")
        Animated.timing(progress, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: false,
        }).start(() => {
          navigation.navigate("intro")
        })
      }, []),
    )

    return (
      <Screen style={tw`flex-1`} backgroundColor={color.primary}>
        <View style={tw`flex-1 justify-center items-center`}>
          <Lottie
            ref={animation}
            source={require("../../icons/animations/Brewtopia_Loading_Logo.json")}
            style={{ width: 300 }}
            progress={progress}
            loop={false}
          />
        </View>
      </Screen>
    )
  },
)
