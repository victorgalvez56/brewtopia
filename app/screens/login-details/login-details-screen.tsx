import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen } from "../../components"
import { View } from "react-native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import tw from "../../utils/tailwind"
import HeaderCustom from "../../components/header-custom/header-custom"
import Toast from "react-native-toast-message"
import { Formik } from "formik"
import * as Yup from "yup"
import Input from "../../components/input-custom/input-custom"
import Father from "@expo/vector-icons/Feather"
import CustomButton from "../../components/custom-button/custom-button"
import { updateLoginDetails } from "../../services/api/user-api"
import { useStores } from "../../models"

export const LoginDetailsScreen: FC<StackScreenProps<NavigatorParamList, "loginDetails">> =
  observer(({ navigation }) => {
    const { userStore } = useStores()
    const { updateLoginDetails, email } = userStore

    const [visiblePassword, setVisiblePassword] = useState(false)
    const [visibleNewPassword, setVisibleNewPassword] = useState(false)
    const [visibleConfirmanPassword, setVisibleConfirmPassword] = useState(false)

    const initialValues = {
      email: email,
      password: "",
      newPassword: "",
      confirmPassword: "",
    }
    const validationSchema = Yup.object().shape({
      email: Yup.string().email("Email invalid").required("It's required"),
      password: Yup.string().required("It's required"),
      newPassword: Yup.string().min(6, "min:6 character").required("It's required"),
      confirmPassword: Yup.string().min(6, "min:6 character").required("It's required"),
    })

    const onSubmit = async (values: any, actions: any) => {
      const data: updateLoginDetails = {
        email: values.email,
        actual_password: values.password,
        new_password: values.newPassword,
        confirm_new_password: values.confirmPassword,
      }
      const update = await updateLoginDetails(data)

      if (update) {
        if (update.code == "200") {
          actions.setSubmitting(true)
          actions.resetForm()
          Toast.show({
            type: "success",
            text1: "Password successful saved!",
          })
        } else {
          Toast.show({
            type: "error",
            text1: update.message,
          })
        }
      }
    }
    return (
      <Screen backgroundColor={color.palette.white}>
        <HeaderCustom
          variant="secondary"
          headerText="Login Details"
          back={true}
          headerStyle="text-center"
        />
        <View style={tw`flex-1`}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <View style={tw`justify-between flex-1 px-6 `}>
                <View>
                  <Input
                    label="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    containerStyle={tw`w-full mt-5`}
                    value={formik.values.email}
                    onChangeText={formik.handleChange("email")}
                    error={"email" in formik.errors ? formik.errors.email : ""}
                    returnKeyType="next"
                  />
                  <Input
                    label="Current password"
                    secureTextEntry={!visiblePassword}
                    containerStyle={tw`w-full`}
                    value={formik.values.password}
                    onChangeText={formik.handleChange("password")}
                    error={"password" in formik.errors ? formik.errors.password : ""}
                    RightIconComponent={
                      <Father
                        name={!visiblePassword ? "eye-off" : "eye"}
                        size={24}
                        onPress={() => {
                          setVisiblePassword(!visiblePassword)
                        }}
                      />
                    }
                    returnKeyType="next"
                    onSubmitEditing={() => {}}
                  />
                  <Input
                    label="New password"
                    secureTextEntry={!visibleNewPassword}
                    containerStyle={tw`w-full`}
                    value={formik.values.newPassword}
                    onChangeText={formik.handleChange("newPassword")}
                    error={"newPassword" in formik.errors ? formik.errors.newPassword : ""}
                    RightIconComponent={
                      <Father
                        name={!visibleNewPassword ? "eye-off" : "eye"}
                        size={24}
                        onPress={() => {
                          setVisibleNewPassword(!visibleNewPassword)
                        }}
                      />
                    }
                    returnKeyType="next"
                    onSubmitEditing={() => {}}
                  />
                  <Input
                    label="Confirm new password"
                    secureTextEntry={!visibleConfirmanPassword}
                    containerStyle={tw`w-full`}
                    value={formik.values.confirmPassword}
                    onChangeText={formik.handleChange("confirmPassword")}
                    error={"password" in formik.errors ? formik.errors.confirmPassword : ""}
                    RightIconComponent={
                      <Father
                        name={!visibleNewPassword ? "eye-off" : "eye"}
                        size={24}
                        onPress={() => {
                          setVisibleConfirmPassword(!visibleConfirmanPassword)
                        }}
                      />
                    }
                    returnKeyType="next"
                    onSubmitEditing={() => {}}
                  />
                </View>
                <CustomButton
                  onPress={formik.handleSubmit}
                  loading={formik.isSubmitting}
                  title="Save"
                  variant="primary"
                  styleContainer="mb-10"
                />
              </View>
            )}
          </Formik>
        </View>
      </Screen>
    )
  })
