import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import {
  Image,
  ImageBackground,
  Pressable,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native"
// import { useStores } from "../../models"
import tw from "../../utils/tailwind"
import * as ImagePicker from "expo-image-picker"
import { Camera } from "expo-camera"
import AntDesign from "@expo/vector-icons/AntDesign"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { color } from "../../theme"
import { useFocusEffect } from "@react-navigation/native"
import { useStores } from "../../models"
import { SafeAreaView } from "react-native-safe-area-context"
import Spinner from "react-native-loading-spinner-overlay/lib"
import SendIcon from "../../icons/SendIcon"
import CancelIcon from "../../icons/CancelIcon"
import { Screen } from "../../components"
import * as ImageManipulator from "expo-image-manipulator"

export const AvatarEditScreen: FC<StackScreenProps<NavigatorParamList, "avatarEdit">> = observer(
  ({ navigation }) => {
    const [hasCameraPermission, requestPermission] = Camera.useCameraPermissions()
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off)
    const [typeMode, setTypeMode] = useState(Camera.Constants.Type.back)
    const [showCam, setShowCam] = useState(true)
    const [base64Pick, setBase64Pick] = useState("")
    const [uriPick, setUriPick] = useState("")
    const [loading, setLoading] = useState(false)
    const [loaded, setLoaded] = useState(true)
    const refCamera = useRef<Camera | null>(null)
    const { userStore } = useStores()
    const { uploadUserPicture, getUser } = userStore

    useEffect(() => {
      requestPermission()
    }, [])

    useFocusEffect(
      React.useCallback(() => {
        navigation.addListener("focus", () => {
          console.log("hey man you are looking to me")
          setLoaded(true)
        })
        const blurListener = navigation.addListener("blur", () => {
          console.log("hey man where are you going?")
          setLoaded(false)
        })

        return () => {
          blurListener()
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
    const onCameraReady = () => {
      console.log("camera ready")
    }

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
            console.warn(data.base64)
            setBase64Pick(data.base64)
            setUriPick(data.uri)
            setShowCam(false)
          })
        }
      }
    }
    const handlePicture = async () => {
      setLoading(true)
      const update = await uploadUserPicture(uriPick)
      setLoading(false)
      if (update) {
        getUser()
        navigation.goBack()
      }
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
                    <View style={tw`flex-row items-center justify-between`}>
                      <Pressable onPress={() => navigation.goBack()}>
                        <AntDesign name="close" size={30} color="#FFF" />
                      </Pressable>
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
          <Screen
            backgroundColor="black"
            style={tw`flex-1`}
            statusBar="light-content"
            preset="scroll"
          >
            <SafeAreaView style={tw`flex-1 bg-black`}>
              <ImageBackground
                source={{ uri: `data:image/png;base64,${base64Pick}` }}
                resizeMode="cover"
                style={tw`w-full h-full overflow-hidden  absolute`}
              >
                <View style={tw`items-end justify-between flex-row flex-1 px-6 py-1`}>
                  <TouchableOpacity
                    onPress={() => {
                      setShowCam(true)
                      setBase64Pick("")
                      setUriPick("")
                    }}
                  >
                    <View style={tw`items-center justify-center bg-white rounded-full w-15 h-15`}>
                      <CancelIcon />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handlePicture()}>
                    <View style={tw`items-center justify-center bg-white rounded-full w-15 h-15`}>
                      <SendIcon />
                    </View>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </SafeAreaView>
          </Screen>
        )}
      </>
    )
  },
)
