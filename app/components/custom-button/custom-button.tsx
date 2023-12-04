import * as React from "react"
import { View, Text, TouchableNativeFeedback, ActivityIndicator } from "react-native"
import tw from "../../utils/tailwind"

interface CustomButtonProps {
  onPress?: () => void
  title?: string
  variant: "primary" | "secondary"
  children?: React.ReactNode | string
  styleContainer?: string
  backgroundColorRiple?: string
  loading?: boolean
  disabled?: boolean
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  title,
  variant,
  children,
  styleContainer,
  backgroundColorRiple,
  loading,
  disabled,
}) => {
  return (
    <TouchableNativeFeedback
      disabled={loading || disabled}
      background={TouchableNativeFeedback.Ripple(backgroundColorRiple, false)}
      onPress={onPress}
    >
      <View
        style={tw`items-center justify-center w-full px-4 py-4 shadow-xl rounded-xl ${
          variant === "primary" ? "bg-brewtopia-500" : "bg-white"
        } ${styleContainer}  ${disabled ? "bg-brewtopia-300" : ""}`}
      >
        {!children && (
          <View style={tw`flex-row items-center`}>
            <Text
              style={tw`text-base font-bold ${
                variant === "primary" ? "text-white" : "text-brewtopia-500"
              } ${loading ? "mr-2" : ""}`}
            >
              {title}
            </Text>
            {loading && (
              <ActivityIndicator size="small" color={variant === "primary" ? "#fff" : "#0000ff"} />
            )}
          </View>
        )}
        {children}
      </View>
    </TouchableNativeFeedback>
  )
}

CustomButton.defaultProps = {
  backgroundColorRiple: "#ffc8bc",
  loading: false,
  disabled: false,
}

export default CustomButton
