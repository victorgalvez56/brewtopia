import * as React from "react"
import { View, TextInput, ViewStyle, TextInputProps, Text } from "react-native"
import tw from "../../utils/tailwind"
import Icon from "@expo/vector-icons/FontAwesome"
import { FormikErrors } from "formik"
import RNPickerSelect from "react-native-picker-select"

export interface InputProps extends TextInputProps {
  label?: string
  iconSize?: number
  error?: boolean | string | string[] | FormikErrors<any>[] | FormikErrors<any>
  /** Style for the input container */
  containerStyle?: ViewStyle
  /** Custom component to render icon */
  LeftIconComponent?: React.ReactElement
  /** Custom component to render icon */
  RightIconComponent?: React.ReactElement
}

const errorColors = { left: "red-900", right: "red-600" }
const iconContainer = "justify-center items-center"

const Select = React.forwardRef<TextInput, InputProps>(
  ({ label, error, containerStyle, LeftIconComponent, RightIconComponent, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)

    const onFocus = () => {
      setIsFocused(true)
    }

    const onBlur = () => {
      setIsFocused(false)
    }

    const getIconColor = (type: "left" | "right") => {
      if (error) {
        return tw.color(errorColors[type])
      }
      if (isFocused && type === "left") {
        return tw.color("primary-500") // Only left icon changes to primary color
      }
      return tw.color("gray-400")
    }

    const leftIconColorProp = { color: getIconColor("left") }
    const rigthIconColorProp = { color: getIconColor("right") }

    const getRightIcon = () => {
      if (error) {
        return (
          <View style={tw.style(iconContainer, "mr-4")}>
            <Icon name="exclamation-circle" size={24} color={getIconColor("right")} />
          </View>
        )
      }
      if (RightIconComponent && React.isValidElement(RightIconComponent)) {
        return (
          <View style={tw.style(iconContainer, "mr-4")}>
            {React.cloneElement(RightIconComponent, rigthIconColorProp)}
          </View>
        )
      }
      return null
    }

    return (
      <View style={tw.style("w-11/12", containerStyle)}>
        {label && <Text style={tw`mb-1 ml-1 text-gray-500`}>{label}</Text>}
        <View
          style={tw.style(
            "flex-row rounded-lg border border-gray-300",
            isFocused ? "border-brewtopia-500" : "",
            error && "border-red-600",
          )}
        >
          {LeftIconComponent && React.isValidElement(LeftIconComponent) && (
            <View style={tw.style(iconContainer, "ml-2 pt-2")}>
              {React.cloneElement(LeftIconComponent, leftIconColorProp)}
            </View>
          )}
          <TextInput
            ref={ref}
            onFocus={onFocus}
            onBlur={onBlur}
            style={tw.style(
              "rounded-lg flex-1 text-base text-gray-900 p-4 h-16",
              props.editable === false && "text-gray-600",
              error && "text-red-900",
            )}
            placeholderTextColor={tw.color("gray-500")}
            {...props}
          />
          {getRightIcon()}
        </View>
        <Text style={tw`text-red-600 mb-2 ml-2`}>{typeof error === "string" && `${error}`}</Text>
      </View>
    )
  },
)
export default Select
