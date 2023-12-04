import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen } from "../../components"
import { Text, View, Pressable, TextInput, ActivityIndicator, LogBox } from "react-native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import tw from "../../utils/tailwind"
import Father from "@expo/vector-icons/Feather"
import Fontisto from "@expo/vector-icons/Fontisto"
import CustomButton from "../../components/custom-button/custom-button"
import Input from "../../components/input-custom/input-custom"
import { Formik } from "formik"
import * as Yup from "yup"
import Toast from "react-native-toast-message"
import HeaderCustom from "../../components/header-custom/header-custom"
import { GetRegisterResult, registerData } from "../../services/api"
import { useStores } from "../../models"
import { AuthModeBasic } from "../../utils/app-values"
import useFacebookLogin from "../../hook/useFacebookLogin"

interface values {
  email: string
  password: string
  first_name: string
  last_name: string
}
export const RegisterScreen: FC<StackScreenProps<NavigatorParamList, "register">> = observer(
  ({ navigation }) => {
    LogBox.ignoreAllLogs()
    const [isVisible, setIsVisible] = useState(false)
    const refPassword = React.useRef<TextInput>(null)
    const refFirstName = React.useRef<TextInput>(null)
    const refLastName = React.useRef<TextInput>(null)
    const { prompt, accessToken, getUserData, loading } = useFacebookLogin()

    const { authStore } = useStores()
    const { signUp, signUpFacebook } = authStore
    const initialValues: values = {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    }

    const validationSchema = Yup.object().shape({
      email: Yup.string().email("Email invalid").required("It's required"),
      password: Yup.string().min(6, "min:6 character").required("It's required"),
      first_name: Yup.string().max(30, "max:30 characters").required("It's required"),
      last_name: Yup.string().max(30, "max:30 characters").required("It's required"),
    })

    const onSubmit = async (values: values, actions: any) => {
      const data: registerData = {
        email: values.email,
        auth_mode: AuthModeBasic,
        name: values.first_name,
        password: values.password,
        role_id: 2,
        lastname: values.last_name,
      }
      const register: GetRegisterResult = await signUp(data)

      if (register?.kind === "bad-data") {
        if (register?.message) {
          actions.setErrors(JSON.parse(register?.message))
        }

        Toast.show({
          type: "error",
          text1: "The email has already been taken.",
        })
      } else if (register?.kind === "ok") {
        actions.setSubmitting(true)
        actions.resetForm()
        navigation.navigate("login")
        Toast.show({
          type: "success",
          text1: "Successfully Registered User",
        })
      } else {
        Toast.show({
          type: "error",
          text1: "Oohh an unexpected error occurred",
        })
      }
    }

    const register = async () => {
      const result = await getUserData(accessToken)
      const { id, email, first_name, last_name } = result

      const register = await signUpFacebook(id, email, first_name, last_name)
      if (register) {
        navigation.navigate("login")
        Toast.show({
          type: "success",
          text1: "Successfully registered user",
        })
      } else {
        Toast.show({
          type: "error",
          text1: "User is already registered",
        })
      }
    }

    useEffect(() => {
      if (accessToken) {
        register()
      }
    }, [accessToken])

    const onPressFacebook = () => {
      try {
        if (accessToken) {
          register()
        } else {
          prompt()
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
    }

    return (
      <Screen backgroundColor={color.palette.orange} preset="scroll">
        <HeaderCustom variant="primary" headerStyle="items-center" />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <View style={tw`px-6 py-4 bg-white`}>
              <Text style={tw`text-base text-brewtopiagray-700`}>
                Create a fre account and start drinking better{"\n"}
                beers!.
              </Text>
              <CustomButton
                onPress={() => onPressFacebook()}
                variant="secondary"
                styleContainer="mt-4 border border-facebook-500"
                backgroundColorRiple="#c4c4c4"
              >
                <View style={tw`flex-row items-center`}>
                  <Fontisto name="facebook" size={20} color="#4267b2" />
                  <Text style={tw`ml-2 text-base font-semibold text-brewtopiagray-700`}>
                    Continue with Facebook
                  </Text>
                  {loading && <ActivityIndicator size="small" color={"#4267b2"} />}
                </View>
              </CustomButton>
              <View style={tw`flex-row items-center my-4`}>
                <View style={tw`h-0.3 flex-1  bg-gray-300`} />
                <Text style={tw`mx-4 text-lg font-semibold text-brewtopiagray-700`}>or</Text>
                <View style={tw`h-0.3 flex-1 bg-gray-300`} />
              </View>

              <View>
                <Input
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="Email"
                  containerStyle={tw`w-full`}
                  value={formik.values.email}
                  onChangeText={formik.handleChange("email")}
                  error={"email" in formik.errors ? formik.errors.email : ""}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    refPassword?.current.focus()
                  }}
                />
                <Input
                  ref={refPassword}
                  secureTextEntry={!isVisible}
                  containerStyle={tw`w-full`}
                  placeholder="Password"
                  value={formik.values.password}
                  onChangeText={formik.handleChange("password")}
                  error={"password" in formik.errors ? formik.errors.password : ""}
                  RightIconComponent={
                    <Father
                      name={isVisible ? "eye" : "eye-off"}
                      size={24}
                      onPress={() => {
                        setIsVisible(!isVisible)
                      }}
                    />
                  }
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    refFirstName?.current.focus()
                  }}
                />
                <Input
                  placeholder="First Name"
                  containerStyle={tw`w-full`}
                  value={formik.values.first_name}
                  onChangeText={formik.handleChange("first_name")}
                  error={"first_name" in formik.errors ? formik.errors.first_name : ""}
                  ref={refFirstName}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    refLastName?.current.focus()
                  }}
                />
                <Input
                  placeholder="Last Name"
                  containerStyle={tw`w-full`}
                  value={formik.values.last_name}
                  onChangeText={formik.handleChange("last_name")}
                  error={"last_name" in formik.errors ? formik.errors.last_name : ""}
                  returnKeyType="done"
                  onSubmitEditing={() => {
                    formik.handleSubmit()
                  }}
                  ref={refLastName}
                />
                <CustomButton
                  onPress={formik.handleSubmit}
                  loading={formik.isSubmitting}
                  title="Become a Brewtopian"
                  variant="primary"
                />
                <View style={tw`flex-row items-center justify-center mt-4`}>
                  <Text style={tw`text-base text-center text-brewtopiagray-700`}>
                    By clicking here, you agree to our
                  </Text>
                  <Pressable onPress={() => navigation.navigate("termsConditions")}>
                    <Text style={tw`ml-2 text-base underline text-brewtopiagray-700`}>T&C's</Text>
                  </Pressable>
                </View>
                <View style={tw`flex-row items-center justify-center my-6`}>
                  <Text style={tw`text-base text-center text-brewtopiagray-700`}>
                    Already have an account?
                  </Text>
                  <Pressable onPress={() => navigation.navigate("login")}>
                    <Text style={tw`ml-2 text-base underline text-brewtopia-500`}>Log In</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </Screen>
    )
  },
)
