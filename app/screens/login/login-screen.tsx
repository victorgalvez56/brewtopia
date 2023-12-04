import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen } from "../../components"
import { Pressable, Text, TextInput, View, LogBox } from "react-native"
import { useStores } from "../../models"
import { color } from "../../theme"
import tw from "../../utils/tailwind"
import { Formik } from "formik"
import * as Yup from "yup"
import Toast from "react-native-toast-message"
import Father from "@expo/vector-icons/Feather"
import Fontisto from "@expo/vector-icons/Fontisto"
import HeaderCustom from "../../components/header-custom/header-custom"
import Input from "../../components/input-custom/input-custom"
import CustomButton from "../../components/custom-button/custom-button"
import { loginData } from "../../services/api"
import { AuthModeBasic } from "../../utils/app-values"
import { ActivityIndicator } from "react-native-paper"
import { useFocusEffect } from "@react-navigation/native"
import useFacebookLogin from "../../hook/useFacebookLogin"

export const LoginScreen: FC<StackScreenProps<NavigatorParamList, "login">> = observer(
  ({ navigation }) => {
    LogBox.ignoreAllLogs()
    const { authStore, userStore } = useStores()
    const { signIn, access_token, signInFacebook } = authStore
    const { getUser } = userStore
    const refPassword = React.useRef<TextInput>(null)
    const [isVisible, setIsVisible] = useState(false)
    const { prompt, accessToken, getUserData, loading } = useFacebookLogin()

    const login = async () => {
      const result = await getUserData(accessToken)
      const { id, email } = result
      const login = await signInFacebook(id, email)
      if (login) {
        navigation.navigate("dashboard")
      } else {
        Toast.show({
          type: "error",
          text1: "Unregistered Facebook user",
        })
      }
    }

    useEffect(() => {
      if (accessToken) {
        login()
      }
    }, [accessToken])

    const onPressFacebook = async () => {
      try {
        if (accessToken) {
          login()
        } else {
          prompt()
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
    }

    //prueba@mail.com
    //123456

    const initialValues = {
      email: "",
      password: "",
    }

    const validationSchema = Yup.object().shape({
      email: Yup.string().email("Email invalid").required("It's required"),
      password: Yup.string().required("It's required"),
    })

    useEffect(() => {
      if (access_token !== "") {
        navigation.navigate("dashboard")
      }
    }, [])

    useFocusEffect(
      React.useCallback(() => {
        if (access_token !== "") {
          navigation.navigate("dashboard")
        }
      }, [access_token]),
    )

    const onSubmit = async (values, actions) => {
      const data: loginData = {
        email: values.email,
        password: values.password,
        auth_mode: AuthModeBasic,
      }
      const login = await signIn(data)
      if (login) {
        actions.setSubmitting(false)
        actions.resetForm()
        navigation.navigate("dashboard")
        getUser()
      } else {
        Toast.show({
          type: "error",
          text1: "Invalid username and/or password",
        })
      }
    }

    return (
      <Screen style={tw`flex-1`} backgroundColor={color.palette.orange} preset="scroll">
        <HeaderCustom variant="primary" back={true} headerStyle="items-center" />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <View style={tw`flex-1 px-6 py-4 bg-white`}>
              <Text style={tw`text-base text-center text-brewtopiagray-700`}>
                Log in and start drinking better beers!{" "}
              </Text>
              <Input
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Email"
                containerStyle={tw`w-full mt-5`}
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
                onSubmitEditing={() => {}}
              />
              <CustomButton
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
                title="Log in"
                variant="primary"
                styleContainer="mb-5"
              />
              <Pressable onPress={() => navigation.navigate("forgotPassword")}>
                <Text style={tw`my-5 text-base font-semibold text-center text-brewtopia-500`}>
                  Forgot your password?
                </Text>
              </Pressable>

              <Text style={tw`my-5 text-base text-center text-brewtopiagray-700`}>
                Or log in to your account with
              </Text>

              <CustomButton
                onPress={() => onPressFacebook()}
                variant="secondary"
                loading={loading}
                styleContainer="my-5 border border-facebook-500"
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
              <View style={tw`flex-row items-center justify-center my-5`}>
                <Text style={tw`text-base text-center text-brewtopiagray-700`}>
                  Don't have a Brewtopia account yet?
                </Text>
                <Pressable onPress={() => navigation.navigate("register")}>
                  <Text style={tw`ml-2 text-base underline text-brewtopia-500`}>Register</Text>
                </Pressable>
              </View>
            </View>
          )}
        </Formik>
      </Screen>
    )
  },
)
