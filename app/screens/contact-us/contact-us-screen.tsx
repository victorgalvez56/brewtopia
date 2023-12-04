import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen } from "../../components"
import { Text, View } from "react-native"
import { color } from "../../theme"
import tw from "../../utils/tailwind"
import HeaderCustom from "../../components/header-custom/header-custom"
import Toast from "react-native-toast-message"
import { Formik } from "formik"
import * as Yup from "yup"
import TextArea from "../../components/text-area/text-area"
import CustomButton from "../../components/custom-button/custom-button"
import { useStores } from "../../models"
import { emailData } from "../../services/api/email-api"

export const ContactUsScreen: FC<StackScreenProps<NavigatorParamList, "contactUs">> = observer(
  ({ navigation }) => {
    const { emailStore, userStore } = useStores()
    const { email } = userStore
    const { sendContactEmail } = emailStore

    const initialValues = {
      subject: "",
      message: "",
    }
    const validationSchema = Yup.object().shape({
      message: Yup.string().required("It's required"),
    })

    const onSubmit = async (values, actions) => {
      const data: emailData = {
        from: email,
        message: values.message,
      }
      const contact = await sendContactEmail(data)

      if (contact) {
        actions.setSubmitting(true)
        actions.resetForm()
        Toast.show({
          type: "success",
          text1: "Queued. Thank you.",
        })
      } else {
        Toast.show({
          type: "error",
          text1: "Feedback must exist!",
        })
      }
    }
    return (
      <Screen backgroundColor={color.palette.white}>
        <HeaderCustom
          variant="secondary"
          headerText="Contact us"
          back={true}
          headerStyle="text-center"
        />
        <View style={tw`flex-1 px-4 mt-5`}>
          <Text style={tw`mb-5 text-base text-brewtopiagray-700`}>
            Please let us know how we can assist you.
          </Text>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <View style={tw`justify-between flex-1 `}>
                <TextArea
                  placeholder="Message"
                  onChangeText={formik.handleChange("message")}
                  value={formik.values.message}
                  error={"message" in formik.errors ? formik.errors.message : ""}
                />
                <CustomButton
                  onPress={formik.handleSubmit}
                  loading={formik.isSubmitting}
                  title="Submit"
                  variant="primary"
                  styleContainer="mb-5"
                />
              </View>
            )}
          </Formik>
        </View>
      </Screen>
    )
  },
)
