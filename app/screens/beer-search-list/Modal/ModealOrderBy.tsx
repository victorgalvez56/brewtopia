import { View, Text, Modal, Pressable } from "react-native"
import React from "react"
import tw from "../../../utils/tailwind"

interface Props {
  open: boolean
  setOpen?: (open: boolean) => void
}

const ModealOrderBy: React.FC<Props> = ({ open, setOpen }) => {
  const onClose = () => {
    if (setOpen) setOpen(false)
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
        style={tw`absolute bottom-0 left-0 right-0 h-10 bg-white h-45 rounded-t-[20px] shadow-xl z-10`}
      >
        <View style={tw`items-center justify-center py-2`}>
          <View style={tw`w-5 h-1 bg-gray-300`} />
        </View>
        <Pressable style={tw`p-4`} onPress={() => onClose()}>
          <Text style={tw`text-base text-center text-brewtopiagray-700`}>Alphabetical</Text>
        </Pressable>
        <View style={tw`h-0.3 w-full bg-gray-300`} />
        <Pressable style={tw`p-4`} onPress={() => onClose()}>
          <Text style={tw`text-base text-center text-brewtopiagray-700`}>Rating</Text>
        </Pressable>
        <View style={tw`h-0.3 w-full bg-gray-300`} />
        <Pressable style={tw`p-4`} onPress={() => onClose()}>
          <Text style={tw`text-base text-center text-brewtopiagray-700`}>ABV</Text>
        </Pressable>
      </View>
    </Modal>
  )
}

export default ModealOrderBy
