import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen } from "../../components"
import { Text, View } from "react-native"
import { color } from "../../theme"
import tw from "../../utils/tailwind"
import HeaderCustom from "../../components/header-custom/header-custom"
import TextArea from "../../components/text-area/text-area"
import CustomButton from "../../components/custom-button/custom-button"
import { Formik } from "formik"
import * as Yup from "yup"
import Toast from "react-native-toast-message"
import { useStores } from "../../models"
import { emailData } from "../../services/api/email-api"

export const FeedbackScreen: FC<StackScreenProps<NavigatorParamList, "feedback">> = observer(
  ({ navigation }) => {
    const { emailStore, userStore } = useStores()
    const { email } = userStore
    const { sendFeedBackEmail } = emailStore

    const initialValues = {
      text: "",
    }
    const validationSchema = Yup.object().shape({
      text: Yup.string().required("It's required").max(255, "max:255 character"),
    })

    const onSubmit = async (values, actions) => {
      const data: emailData = {
        from: email,
        message: values.text,
      }
      const contact = await sendFeedBackEmail(data)

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
          text1: "Subject and Feedback must exist!",
        })
      }
    }
    return (
      <Screen backgroundColor={color.palette.white}>
        <HeaderCustom
          variant="secondary"
          headerText="Submit Feedback"
          back={true}
          headerStyle="text-center"
        />
        <View style={tw`flex-1 px-4`}>
          <Text style={tw`text-base text-brewtopiagray-700`}>How are we doing?</Text>
          <Text style={tw`mb-5 text-base text-brewtopiagray-700`}>
            Share your experience with us. What went well? {"\n"}
            What could have gone better?
          </Text>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <View style={tw`justify-between flex-1 `}>
                <TextArea
                  placeholder="Let us know waht you think.."
                  onChangeText={formik.handleChange("text")}
                  value={formik.values.text}
                  error={"text" in formik.errors ? formik.errors.text : ""}
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
