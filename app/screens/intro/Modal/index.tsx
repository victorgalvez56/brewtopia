import { Text, Modal, Pressable, View } from "react-native"
import React from "react"
import tw from "../../../utils/tailwind"

interface Props {
  children: React.ReactNode | string
  open: boolean
  setOpen?: (open: boolean) => void
}
const ModalSelect: React.FC<Props> = ({ children, open, setOpen }) => {
  const onClose = () => {
    if (setOpen) setOpen(false)
  }
  return (
    <Modal animationType="fade" transparent={true} visible={open} onRequestClose={() => onClose()}>
      <Pressable style={tw`absolute inset-0`} onPress={() => onClose()} />
      <View style={tw`items-center justify-center flex-1`}>{children}</View>
    </Modal>
  )
}

export default ModalSelect
