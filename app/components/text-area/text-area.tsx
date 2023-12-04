import { FormikErrors } from "formik"
import * as React from "react"
import { Text, TextInput, TextInputProps, View } from "react-native"
import tw from "../../utils/tailwind"

export interface TextAreaProps extends TextInputProps {
  inputStyle?: string
  error?: boolean | string | string[] | FormikErrors<any>[] | FormikErrors<any>
}

/**
 * Describe your component here
 */
const TextArea = React.forwardRef<TextInput, TextAreaProps>(
  ({ inputStyle, error, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)

    const onFocus = () => {
      setIsFocused(true)
    }

    const onBlur = () => {
      setIsFocused(false)
    }
    return (
      <View>
        <TextInput
          ref={ref}
          style={[
            tw`p-4 pb-6 border border-gray-300 rounded-lg ${
              isFocused ? "border-brewtopia-500" : ""
            } ${inputStyle} ${error ? "text-red-900 border-red-600" : "text-black"} `,
            { textAlignVertical: "top" },
          ]}
          onFocus={onFocus}
          onBlur={onBlur}
          multiline={true}
          placeholderTextColor="grey"
          underlineColorAndroid="transparent"
          numberOfLines={6}
          {...props}
        />
        <Text style={tw`mb-2 ml-2 text-red-600`}>{typeof error === "string" && `${error}`}</Text>
      </View>
    )
  },
)

export default TextArea
