import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen } from "../../components"
import { ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { useStores } from "../../models"
import { color } from "../../theme"
import tw from "../../utils/tailwind"
import HeaderCustom from "../../components/header-custom/header-custom"
import { Formik } from "formik"
import * as Yup from "yup"
import Input from "../../components/input-custom/input-custom"
import CustomButton from "../../components/custom-button/custom-button"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { UploadImage } from "../../components/upload-image/upload-image"
import Toast from "react-native-toast-message"
import RNPickerSelect from "react-native-picker-select"
import reactotron from "reactotron-react-native"

export const BeerCreateScreen: FC<StackScreenProps<NavigatorParamList, "beerCreate">> = observer(
  ({ navigation }) => {
    // Pull in one of our MST stores
    const { beerStore } = useStores()
    const { getUploadBeer } = beerStore

    const { beerStylesStore } = useStores()
    const { beerStylesList, getBeerStyles } = beerStylesStore
    const refBreweryName = useRef<TextInput>(null)
    const refBeerAbv = useRef<TextInput>(null)
    const refBeerStyle = useRef<TextInput>(null)

    const [showCamera, setShowCamera] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [image, setImage] = useState("")
    const [uri, setUri] = useState("http://18.134.172.89/media/custom/no-image-available.png")
    const [stylesList, setStylesList] = useState([])
    const [styleBeer, setStyleBeer] = useState("")

    useEffect(() => {
      getBeerStyles().then()
      let array = []
      beerStylesList.map((item) => {
        array.push({
          label: item.name,
          value: item.id,
        })
      })
      setStylesList(array)
    }, [])

    const handlePicture = (uri: string, base64: string) => {
      setImage(base64)
      setUri(uri)
      setShowCamera(false)
    }

    const initialValues = {
      name: "",
      brewery_name: "",
      image: "",
    }

    const validationSchema = Yup.object().shape({
      name: Yup.string().required("It's required"),
      brewery_name: Yup.string().max(30, "max:30 characters"),
    })

    const onSubmit = async (values: any, actions: any) => {
      console.warn(image)
      if (image === "") {
        actions.setErrors({ image: "It's required" })
      } else {
        const res = await getUploadBeer(
          values.name,
          values.brewery_name,
          "data:image/png;base64," + image,
          values.beer_abv,
          styleBeer,
        )
        if (res) {
          Toast.show({
            type: "success",
            text1: "We have received a request we are reviewing to publish the beer soon",
          })
          navigation.goBack()
        } else {
          Toast.show({
            type: "error",
            text1: "Oohh an unexpected error occurred",
          })
        }
      }
    }

    return (
      <Screen backgroundColor={color.palette.white} preset="scroll">
        {showCamera ? (
          <UploadImage
            navigation={navigation}
            loading={loading}
            handlePicture={handlePicture}
            onClose={() => setShowCamera(false)}
          />
        ) : (
          <>
            <HeaderCustom
              back={true}
              variant="secondary"
              headerText="Create Beer"
              headerStyle="text-center"
            />

            <View style={tw`flex-1  px-6 mt-10`}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(formik) => (
                  <View>
                    <View style={tw`items-center justify-center`}>
                      <ImageBackground
                        source={{
                          uri,
                        }}
                        resizeMode="cover"
                        style={tw`p-1 overflow-hidden border-2 border-white rounded-full shadow-md w-25 h-25`}
                      />
                      <Pressable onPress={() => setShowCamera(true)}>
                        <Text style={tw`text-base underline text-brewtopiagray-700`}>
                          Choose beer image
                        </Text>
                      </Pressable>
                      {"image" in formik.errors && (
                        <View style={tw`mt-2 flex-row items-center`}>
                          <FontAwesome name="exclamation-circle" size={25} color="red" />
                          <Text style={tw`font-bold text-red-500 text-sm ml-2`}>
                            {formik.errors.image}
                          </Text>
                        </View>
                      )}
                    </View>
                    <Input
                      placeholder="Name"
                      containerStyle={tw`w-full`}
                      value={formik.values.name}
                      onChangeText={formik.handleChange("name")}
                      error={"name" in formik.errors ? formik.errors.name : ""}
                      returnKeyType="next"
                      label="Name"
                      onSubmitEditing={() => {
                        refBreweryName?.current.focus()
                      }}
                    />
                    <Input
                      ref={refBreweryName}
                      placeholder="Brewery Name (Optional)"
                      containerStyle={tw`w-full`}
                      value={formik.values.brewery_name}
                      onChangeText={formik.handleChange("brewery_name")}
                      error={"brewery_name" in formik.errors ? formik.errors.brewery_name : ""}
                      label="Brewery Name"
                      returnKeyType="done"
                      onSubmitEditing={() => {
                        refBeerAbv?.current.focus()
                      }}
                    />

                    <Input
                      ref={refBeerAbv}
                      placeholder="ABV"
                      containerStyle={tw`w-full`}
                      value={formik.values.beer_abv}
                      onChangeText={formik.handleChange("beer_abv")}
                      error={"brewery_abv" in formik.errors ? formik.errors.beer_abv : ""}
                      label="Beer ABV"
                      returnKeyType="done"
                      onSubmitEditing={() => {
                        refBeerAbv?.current.focus()
                      }}
                    />
                    {/* <Input
                        ref={refBeerStyle}
                        placeholder="Beer Style"
                        containerStyle={tw`w-full`}
                        value={formik.values.beer_style}
                        onChangeText={formik.handleChange("beer_style")}
                        error={"beer_style" in formik.errors ? formik.errors.beer_style : ""}
                        label="Beer Style"
                        returnKeyType="done"
                        onSubmitEditing={() => {
                          formik.handleSubmit()
                        }}
                      /> */}

                    <View style={tw.style("w-11/12", tw`w-full`)}>
                      <Text style={tw`mb-1 ml-1 text-gray-500`}>Beer Style</Text>
                      <View
                        style={tw.style(
                          "flex-row rounded-lg border border-gray-300",
                          // isFocused ? "border-brewtopia-500" : "",
                          // error && "border-red-600",
                        )}
                      >
                        <RNPickerSelect
                          style={pickerSelectStyles}
                          value={styleBeer}
                          onValueChange={(value) => setStyleBeer(value)}
                          items={stylesList}
                        />
                      </View>
                      {/* <Text style={tw`text-red-600 mb-2 ml-2`}>
                          {typeof error === "string" && `${error}`}
                        </Text> */}
                    </View>

                    <CustomButton
                      onPress={formik.handleSubmit}
                      loading={formik.isSubmitting}
                      title="Done"
                      variant="primary"
                      styleContainer="my-10"
                    />
                  </View>
                )}
              </Formik>
            </View>
          </>
        )}
      </Screen>
    )
  },
)

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    width: 340,
    height: 60,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    width: 340,
    height: 60,
  },
})
