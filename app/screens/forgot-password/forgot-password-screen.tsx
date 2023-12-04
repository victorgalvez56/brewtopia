import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen } from "../../components"
import { Pressable, Text, View } from "react-native"
import { color } from "../../theme"
import tw from "../../utils/tailwind"
import HeaderCustom from "../../components/header-custom/header-custom"
import * as Yup from "yup"
import Toast from "react-native-toast-message"
import { Formik } from "formik"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Input from "../../components/input-custom/input-custom"
import CustomButton from "../../components/custom-button/custom-button"
import { useStores } from "../../models"
import { forgotPasswordData } from "../../services/api"

export const ForgotPasswordScreen: FC<StackScreenProps<NavigatorParamList, "forgotPassword">> =
  observer(({ navigation }) => {
    const { authStore } = useStores()
    const { forgotPassword } = authStore

    const initialValues = {
      email: "",
    }

    const validationSchema = Yup.object().shape({
      email: Yup.string().email("Email invalid").required("It's required"),
    })

    const onSubmit = async (values, actions) => {
      const data: forgotPasswordData = {
        email: values.email,
      }
      const forgot = await forgotPassword(data)

      if (forgot) {
        if (forgot.code == "200") {
          actions.setSubmitting(true)
          actions.resetForm()
          navigation.navigate("login")
          Toast.show({
            type: "success",
            text1: forgot.message,
          })
        } else {
          Toast.show({
            type: "error",
            text1: forgot.message,
          })
        }
      }
    }

    return (
      <KeyboardAwareScrollView style={tw`bg-white`}>
        <Screen backgroundColor={color.palette.white} preset="scroll">
          <HeaderCustom
            variant="secondary"
            headerText="Forgot password"
            back={true}
            headerStyle="text-center"
          />
          <View style={tw`px-6 py-4`}>
            <Text style={tw`text-base text-brewtopiagray-700`}>
              Enter the email associated to your account and{"\n"}
              we will send you an email with a link to recover{"\n"}
              your password
            </Text>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <>
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

                    }}
                  />
                  <CustomButton
                    onPress={formik.handleSubmit}
                    loading={formik.isSubmitting}
                    title="Re-estabinsh password"
                    variant="primary"
                    styleContainer="mb-5"
                  />
                  <View style={tw`flex-row items-center justify-center my-5`}>
                    <Text style={tw`text-base text-center text-brewtopiagray-700`}>
                      Don't have a Brewtopia account yet?
                    </Text>
                    <Pressable onPress={() => navigation.navigate("register")}>
                      <Text style={tw`ml-2 text-base underline text-brewtopia-500`}>Register</Text>
                    </Pressable>
                  </View>
                </>
              )}
            </Formik>
          </View>
        </Screen>
      </KeyboardAwareScrollView>
    )
  })
