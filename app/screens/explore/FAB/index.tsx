import { View, Text, Pressable, Animated, Easing } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import tw from "../../../utils/tailwind"
import BIcon from "../../../icons/BIcon"

type Props = {}

const Fab = (props: Props) => {
  const fadeAnim = useState(new Animated.Value(0))[0]
  const translation = useRef(new Animated.Value(0)).current
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (show) {
      fadeIn()
    } else {
      fadeOut()
    }
  }, [show])

  useEffect(() => {
    setTimeout(() => {
      fadeIn()
    }, 3000)
  }, [])

  function fadeIn() {
    Animated.parallel([
      // after decay, in parallel:
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.timing(translation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.bounce,
      }),
    ]).start() // start the sequence group
  }

  function fadeOut() {
    Animated.parallel([
      // after decay, in parallel:
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.timing(translation, {
        toValue: 2,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.bounce,
      }),
    ]).start() // start the sequence group
  }
  return (
    <>
      <Pressable
        style={[tw`absolute left-0 mx-4 bottom-22`, { zIndex: 3, elevation: 3 }]}
        onPress={() => setShow(!show)}
      >
        <Animated.View
          style={[
            tw`items-center justify-center w-20 h-20 border border-red-500 rounded-full bg-brewtopia-500`,
            {
              transform: [
                {
                  rotateZ: translation.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: ["-45deg", "10deg", "0deg"],
                    extrapolate: "clamp",
                  }),
                },
              ],
            },
          ]}
        >
          <View style={tw`border-2 border-white rounded-full w-18 h-18`}>
            <View
              style={tw`items-center justify-center overflow-hidden border-2 border-green-500 rounded-full w-17 h-17`}
            >
              <BIcon />
            </View>
          </View>
        </Animated.View>
      </Pressable>
      <Animated.View
        style={[
          tw`absolute left-0 flex-row h-20 pl-20 mx-4 bg-white border border-gray-300 rounded-full shadow-md w-88 bottom-22`,
          {
            zIndex: 0,
            elevation: 0,
            // Bind opacity to animated value
            opacity: fadeAnim,
          },
        ]}
      >
        <View style={tw`px-2 py-1`}>
          <Text style={tw`text-sm font-bold text-brewtopia-500`}>
            Benefits of being a Brewtopian
          </Text>
          <Text style={tw`mt-1 text-xs text-brewtopiagray-700`}>
            Find beers near you, earn badges and awardas{"\n"}
            and get personalised recommendations!
          </Text>
        </View>
      </Animated.View>
    </>
  )
}

export default Fab
