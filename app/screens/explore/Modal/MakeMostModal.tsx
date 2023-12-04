import { View, Text, Modal, Pressable } from "react-native"
import React from "react"
import tw from "../../../utils/tailwind"
import CustomButton from "../../../components/custom-button/custom-button"

interface Props {
  open: boolean
  setOpen?: (open: boolean) => void
  navigation: any
}

const MakeMostModal: React.FC<Props> = ({ open, setOpen, navigation }) => {
  const onClose = () => {
    if (setOpen) setOpen(false)
  }

  const onBecomePress = () => {
    onClose()
    navigation.navigate("makeMost")
  }
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={open}
      onRequestClose={() => {
        onClose()
      }}
    >
      <Pressable style={tw`absolute inset-0 bg-black opacity-75`} onPress={() => onClose()} />
      <View
        style={tw`absolute z-10 p-5 bg-white shadow-xl bottom-10 left-3 right-3 h-70 rounded-xl`}
      >
        <View style={tw`items-center justify-center`}>
          <Text style={tw`mb-3 text-xl font-bold text-brewtopiagray-700`}>
            Make the most of Brewtopia!
          </Text>
          <Text style={tw`text-base text-center text-brewtopiagray-700`}>
            Find beers near you, earn badges and awards{"\n"}
            and get personalised recommendations!
          </Text>
          <CustomButton
            title="Become a Brewtopian"
            onPress={() => onBecomePress()}
            variant="primary"
            styleContainer="mt-5"
          />
          <Pressable onPress={() => navigation.navigate("login")}>
            <Text style={tw`mt-5 text-base font-bold underline text-brewtopia-500`}>
              I'm already a Brewtopian
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

export default MakeMostModal
