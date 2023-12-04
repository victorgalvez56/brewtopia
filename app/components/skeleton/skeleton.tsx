import * as React from "react"
import { View, Animated } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import tw from "../../utils/tailwind"

export interface SkeletonProps {
  style?: string
  width: number
}

/**
 * Describe your component here
 */
export const Skeleton: React.FC<SkeletonProps> = ({ style, width }) => {
  const translateX = React.useRef(new Animated.Value(-width)).current
  React.useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: width,
        useNativeDriver: true,
        duration: 1000,
      }),
    ).start()
  }, [width])
  return (
    <View style={[tw.style([`bg-[rgba(0,0,0,0.12)] overflow-hidden`, style]), { width: width }]}>
      <Animated.View
        style={[
          tw`w-full h-full`,
          {
            transform: [
              {
                translateX: translateX,
              },
            ],
          },
        ]}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.05)", "transparent"]}
          style={tw`w-full h-full`}
          start={{ x: 1, y: 1 }}
        />
      </Animated.View>
    </View>
  )
}
