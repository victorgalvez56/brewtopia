import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen } from "../../components"
import { ImageBackground, Pressable, ScrollView, Text, TextInput, View } from "react-native"
import { color } from "../../theme"
import tw from "../../utils/tailwind"
import HeaderCustom from "../../components/header-custom/header-custom"
import { Formik } from "formik"
import * as Yup from "yup"
import Toast from "react-native-toast-message"
import Input from "../../components/input-custom/input-custom"
import CustomButton from "../../components/custom-button/custom-button"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { useStores } from "../../models"
import { updateUser } from "../../services/api/user-api"
import CountryPicker, { Country } from "react-native-country-picker-modal"
import { countries } from "../../utils/countries"
export const ProfileEditScreen: FC<StackScreenProps<NavigatorParamList, "profileEdit">> = observer(
  ({ navigation }) => {
    const { userStore } = useStores()
    const { getUser, ageUser, name, lastname, location, updateProfile, avatar } = userStore
    const [dbo, setDbo] = useState(ageUser.toLocaleDateString("en-GB"))
    const [show, setShow] = useState(false)
    const refLastName = React.useRef<TextInput>(null)
    const [showCountries, setShowCountries] = useState(false)
    const [countryCca2Code, setCountryCca2Code] = useState<any>(location ? location : "NZ")
    const [country, setCountry] = useState("Peru")
    const initialValues = {
      first_name: name,
      last_name: lastname,
    }
    const validationSchema = Yup.object().shape({
      first_name: Yup.string().max(30, "max:30 characters").required("It's required"),
      last_name: Yup.string().max(30, "max:30 characters").required("It's required"),
    })
    useEffect(() => {
      const countriesObj = Object.values(countries)
      const countriesVal = Object.keys(countries)
      let position = countriesVal.indexOf(location)
      let countryFound = countriesObj[position]
      setCountry(countryFound?.name.common)
    }, [])
    const onSubmit = async (values: any, actions: any) => {
      const data: updateUser = {
        dob: dbo.replace("/", "-").replace("/", "-"),
        lastname: values.last_name,
        location: countryCca2Code,
        name: values.first_name,
        new_avatar: avatar,
      }
      const update = await updateProfile(data)

      if (update) {
        if (update.code == "200") {
          actions.setSubmitting(true)
          Toast.show({
            type: "success",
            text1: "Profile successful saved!",
          })
        } else {
          Toast.show({
            type: "error",
            text1: update.message,
          })
        }
      }
    }
    const changeCountryParams = async (countryC: Country) => {
      setCountryCca2Code(countryC.cca2)
      setCountry(countryC.name as string)
      setShowCountries(false)
    }
    return (
      <Screen backgroundColor={color.palette.white}>
        <HeaderCustom
          variant="secondary"
          headerText="Edit User Profile"
          back={true}
          headerStyle="text-center"
        />
        <View style={tw`flex-1`}>
          <View style={tw`items-center justify-center`}>
            <ImageBackground
              source={{
                uri: avatar,
              }}
              resizeMode="cover"
              style={tw`p-1 overflow-hidden border-2 border-white rounded-full shadow-md w-25 h-25`}
            />
            <Pressable onPress={() => navigation.navigate("avatarEdit")}>
              <Text style={tw`text-base underline text-brewtopiagray-700`}>
                Edit Profile Picture
              </Text>
            </Pressable>
          </View>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <View style={tw`justify-between flex-1 px-6 mt-5`}>
                <ScrollView>
                  <View>
                    <Input
                      placeholder="First Name"
                      containerStyle={tw`w-full`}
                      value={formik.values.first_name}
                      onChangeText={formik.handleChange("first_name")}
                      error={"first_name" in formik.errors ? formik.errors.first_name : ""}
                      returnKeyType="next"
                      label="First Name"
                      onSubmitEditing={() => {
                        refLastName?.current.focus()
                      }}
                    />
                    <Input
                      ref={refLastName}
                      placeholder="Last Name"
                      containerStyle={tw`w-full`}
                      value={formik.values.last_name}
                      onChangeText={formik.handleChange("last_name")}
                      error={"last_name" in formik.errors ? formik.errors.last_name : ""}
                      label="Last name"
                      returnKeyType="done"
                      onSubmitEditing={() => {
                        formik.handleSubmit()
                      }}
                    />
                    <Pressable onPress={() => setShow(true)}>
                      <>
                        <Text style={tw`mb-1 ml-1 text-sm text-gray-500`}>Birthdate</Text>
                        <View style={tw`p-4 mb-5 border border-gray-300 rounded-lg`}>
                          <Text style={tw`text-base text-brewtopiagray-700`}>{dbo}</Text>
                        </View>
                      </>
                    </Pressable>

                    {/* <Input
                      onPressIn={() => setShowCountries(true)}
                      ref={refLastName}
                      placeholder={country}
                      containerStyle={tw`w-full`}
                      value={country}
                      label="Location"
                      returnKeyType="done"
                      onChangeText={(v) => {
                        setCountry(v)
                      }}
                      onSubmitEditing={() => {
                        formik.handleSubmit()
                      }}
                      editable={true}
                      // LeftIconComponent={
                      //   <CountryPicker
                      //     visible={showCountries}
                      //     onClose={() => setShowCountries(false)}
                      //     withFlagButton={true}
                      //     countryCode={countryCca2Code}
                      //     withAlphaFilter={false}
                      //     withCallingCodeButton={false}
                      //     withFilter
                      //     onSelect={(country: Country) => {
                      //       changeCountryParams(country)
                      //     }}
                      //   />
                      // }
                    /> */}
                  </View>
                </ScrollView>

                <CustomButton
                  onPress={formik.handleSubmit}
                  // loading={formik.isSubmitting}
                  title="Done"
                  variant="primary"
                  styleContainer="mb-10"
                />
              </View>
            )}
          </Formik>

          <DateTimePickerModal
            isVisible={show}
            mode="date"
            onConfirm={(date) => {
              setShow(false)
              setDbo(date.toLocaleDateString("en-GB"))
            }}
            onCancel={() => {
              setShow(false)
            }}
          />
        </View>
      </Screen>
    )
  },
)
