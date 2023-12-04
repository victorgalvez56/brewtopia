import { View, Animated } from "react-native"
import React, { useEffect, useRef } from "react"
import Lottie from "lottie-react-native"

type Props = {}

const Animation5 = (props: Props) => {
  const animation = useRef(null)
  const progress = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
      }),
    ).start()
  }, [])

  return (
    <View>
      <Lottie
        ref={animation}
        source={require("../../../icons/animations/Brewtopia_Explainer_04.json")}
        style={{ width: 200 }}
        progress={progress}
        loop={false}
      />
    </View>
  )
}

export default Animation5
