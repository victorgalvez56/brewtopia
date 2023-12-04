import { View, ImageBackground, TouchableOpacity } from "react-native"
import React from "react"
import { Screen } from "../../components"
import tw from "../../utils/tailwind"
import { SafeAreaView } from "react-native-safe-area-context"
import SendIcon from "../../icons/SendIcon"
import CancelIcon from "../../icons/CancelIcon"

interface Props {
  handlePicture: () => void
  setShowCam: (e: boolean) => void
  setBase64Pick: (e: string) => void
  setUriPick: (e: string) => void
  base64Pick: string
}

const PreviewScreen: React.FC<Props> = ({
  handlePicture,
  setShowCam,
  setBase64Pick,
  setUriPick,
  base64Pick,
}) => {
  return (
    <Screen backgroundColor="black" style={tw`flex-1`} statusBar="light-content" preset="scroll">
      <SafeAreaView style={tw`flex-1 bg-black`}>
        <ImageBackground
          source={{ uri: `data:image/png;base64,${base64Pick}` }}
          resizeMode="cover"
          style={tw`absolute w-full h-full overflow-hidden`}
        >
          <View style={tw`flex-row items-end justify-between flex-1 px-6 py-1`}>
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
  )
}

export default PreviewScreen
