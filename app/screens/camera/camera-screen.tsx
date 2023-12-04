import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import {
  Image,
  Pressable,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native"
// import { useStores } from "../../models"
import tw from "../../utils/tailwind"
import * as ImagePicker from "expo-image-picker"
import { Camera, CameraType } from "expo-camera"
import AntDesign from "@expo/vector-icons/AntDesign"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Screen } from "../../components"
import { color } from "../../theme"
import CornerTopLeft from "../../icons/CornerTopLeft"
import CornerTopRigth from "../../icons/CornerTopRigth"
import CornerBottomLeft from "../../icons/CornerBottomLeft"
import CornerBottomRigth from "../../icons/CornerBottomRigth"
import { useFocusEffect } from "@react-navigation/native"
import * as ImageManipulator from "expo-image-manipulator"

import Spinner from "react-native-loading-spinner-overlay/lib"
import { useStores } from "../../models"
import PreviewScreen from "./PreviewScreen"

export const CameraScreen: FC<StackScreenProps<NavigatorParamList, "camera">> = observer(
  ({ navigation }) => {
    const [hasCameraPermission, requestPermission] = Camera.useCameraPermissions()
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off)
    const [typeMode, setTypeMode] = useState(CameraType.back)
    const [loaded, setLoaded] = useState(true)
    const refCamera = useRef<Camera | null>(null)
    const [showCam, setShowCam] = useState(true)
    const [loading, setLoading] = useState(false)
    const [base64Pick, setBase64Pick] = useState("")
    const [uriPick, setUriPick] = useState("")
    const { beerStore } = useStores()
    const { getPredictions } = beerStore
    useEffect(() => {
      requestPermission()
    }, [])

    useFocusEffect(
      React.useCallback(() => {
        navigation.addListener("focus", () => {
          setLoaded(true)
        })
        const blurListener = navigation.addListener("blur", () => {
          setLoaded(false)
        })

        return () => {
          blurListener()
          setShowCam(true)
        }
      }, [hasCameraPermission]),
    )

    const onToggleFlash = () => {
      setFlashMode(
        flashMode === Camera.Constants.FlashMode.torch
          ? Camera.Constants.FlashMode.off
          : Camera.Constants.FlashMode.torch,
      )
    }
    const onToggleChangeType = () => {
      setTypeMode(
        typeMode === Camera.Constants.Type.front
          ? Camera.Constants.Type.back
          : Camera.Constants.Type.front,
      )
    }
    const onCameraReady = () => {}

    if (hasCameraPermission === null) {
      return (
        <View>
          <Text>Camera Null</Text>
        </View>
      )
    } else if (hasCameraPermission.status !== "granted") {
      return <Text>No access to camera</Text>
    }

    const pickImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        base64: true,
        quality: 0.35,
      })
      if (!result.cancelled) {
        const { base64, uri } = result
        setBase64Pick(base64)
        setUriPick(uri)
        setShowCam(false)
      }
    }

    const capture = async () => {
      if (refCamera) {
        let data = null
        const picture = await refCamera.current.takePictureAsync({
          exif: true,
          base64: true,
        })
        if (picture.width === picture?.exif?.ImageWidth) {
          data = picture
        } else {
          const manipResult = await ImageManipulator.manipulateAsync(picture.uri, [{ rotate: 0 }], {
            compress: 1,
            base64: true,
          })
          data = manipResult
        }
        if (data) {
          Image.getSize(data.uri, async (width, height) => {
            setBase64Pick(data.base64)
            setUriPick(data.uri)
            setShowCam(false)
          })
        }
      }
    }

    const onDetails = (item: any) => {
      navigation.navigate("beerDetails", item)
    }

    const handlePicture = async () => {
      setLoading(true)
      const prediction = await getPredictions(base64Pick)
      if (prediction !== null) {
        // reconocio la imagen
        onDetails(prediction)
      } else {
        navigation.navigate("failScan")
      }
      setLoading(false)
    }

    return (
      <>
        <Spinner visible={loading} />
        {showCam ? (
          <Screen
            backgroundColor="black"
            style={tw`flex-1`}
            statusBar="light-content"
            preset="scroll"
          >
            <View style={tw`flex-1`}>
              {loaded && (
                <Camera
                  style={tw`flex-1`}
                  type={typeMode}
                  ref={refCamera}
                  onCameraReady={onCameraReady}
                  flashMode={flashMode}
                >
                  <View style={tw`flex-1 p-6 border-white`}>
                    <View style={tw`flex-row items-center justify-between px-4`}>
                      <TouchableOpacity onPress={() => navigation.goBack()} style={tw`py-2 pl-4`}>
                        <View>
                          <AntDesign name="close" size={30} color="#FFF" />
                        </View>
                      </TouchableOpacity>
                      <Pressable onPress={() => onToggleChangeType()}>
                        <AntDesign name="swap" size={30} color="#FFF" />
                      </Pressable>
                      <Pressable onPress={() => onToggleFlash()}>
                        {flashMode === Camera.Constants.FlashMode.torch ? (
                          <MaterialCommunityIcons name="flash" size={30} color="#FFF" />
                        ) : (
                          <MaterialCommunityIcons name="flash-off" size={30} color="#FFF" />
                        )}
                      </Pressable>
                    </View>
                    <View style={tw`justify-between px-4 mt-10 h-3/4`}>
                      <View style={tw`flex-row items-center justify-between`}>
                        <CornerTopLeft />
                        <CornerTopRigth />
                      </View>
                      <View style={tw`flex-row items-center justify-between`}>
                        <CornerBottomLeft />
                        <CornerBottomRigth />
                      </View>
                    </View>
                  </View>
                </Camera>
              )}
              <View style={tw`justify-center bg-white h-60`}>
                <View style={tw`flex-row items-center justify-between ml-10 w-50`}>
                  <TouchableOpacity onPress={() => pickImage()}>
                    <FontAwesome name="photo" color={color.primary} size={30} />
                  </TouchableOpacity>
                  <View style={tw`overflow-hidden rounded-full h-23 w-23`}>
                    <TouchableNativeFeedback
                      background={TouchableNativeFeedback.Ripple("#c4c4c4", true)}
                      onPress={() =>
                        requestAnimationFrame(() => {
                          capture()
                        })
                      }
                    >
                      <View
                        style={tw`items-center justify-center rounded-full w-23 h-23 bg-brewtopia-500`}
                      >
                        <View style={tw`w-20 h-20 border-2 border-white rounded-full`} />
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                </View>
              </View>
            </View>
          </Screen>
        ) : (
          <PreviewScreen
            handlePicture={handlePicture}
            setBase64Pick={setBase64Pick}
            setShowCam={setShowCam}
            setUriPick={setUriPick}
            base64Pick={base64Pick}
          />
        )}
      </>
    )
  },
)
