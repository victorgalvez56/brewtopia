import { View, Text, Modal, Pressable, ImageBackground, TouchableOpacity } from "react-native"
import React from "react"
import tw from "../../../utils/tailwind"
import { limitBox } from "../../../utils/helper"
import Feather from "@expo/vector-icons/Feather"
import Entypo from "@expo/vector-icons/Entypo"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { color } from "../../../theme"
import CustomButton from "../../../components/custom-button/custom-button"
import Beers from "../../../icons/Beers"

interface Props {
  open: boolean
  onClose: () => void
  item: any
  navigation: any
}

const ModalBrewerie: React.FC<Props> = ({ open, onClose, item, navigation }) => {
  const values = item || {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH73Q7OLDppHl_GWKoL-JWJDKDi6TvLKbdJA&usqp=CAU",
    title: "Shinner Beer",
    ratings: 0,
    totalRatings: 0,
    local: "603 State Hwy 95, Shinner,\nTX 77984, USA",
  }

  const onBrewerieDetail = () => {
    onClose()
    navigation.navigate("brewerieDetails", item)
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={() => {
        onClose()
      }}
    >
      <Pressable style={tw`absolute inset-0`} onPress={() => onClose()} />
      <View
        style={tw`absolute z-10 bg-white shadow-xl bottom-0 left-1 right-1 android:h-48 ios:h-58 rounded-t-[25px]`}
      >
        <View style={tw`items-center justify-center py-2`}>
          <View style={tw`w-8 h-1 bg-gray-100`} />
        </View>
        <View style={tw`flex-row items-start p-4`}>
          <Pressable onPress={() => onBrewerieDetail()}>
            <ImageBackground
              source={{
                uri: values.image,
              }}
              resizeMode="cover"
              style={tw`w-24 h-24 overflow-hidden shadow-md rounded-xl`}
            />
          </Pressable>
          <TouchableOpacity onPress={() => onBrewerieDetail()} style={tw`flex-1`}>
            <View style={tw`flex-1 ml-2`}>
              <View style={tw`flex-row items-center justify-between`}>
                <View>
                  <Text style={tw`text-base font-bold text-brewtopiagray-700`}>
                    {limitBox(values.title, 19)}
                  </Text>
                  <View style={tw`flex-row items-center`}>
                    <FontAwesome name="star" size={16} color="#FF7558" />
                    <Text style={tw`ml-1 text-sm text-brewtopiagray-700`}>
                      {values.initial_rating}
                    </Text>
                  </View>
                </View>
                <View style={tw`flex-row items-center`}>
                  <View
                    style={tw`items-center justify-center w-6 h-6 mr-2 border rounded-full border-brewtopia-500`}
                  >
                    <Feather name="share" size={15} color="#FF7558" />
                  </View>
                  <View
                    style={tw`items-center justify-center w-6 h-6 border rounded-full border-brewtopia-500`}
                  >
                    <Entypo name="heart-outlined" size={16} color="#FF7558" />
                  </View>
                </View>
              </View>
              <View style={tw`flex-row mt-1`}>
                <MaterialCommunityIcons name="map-marker-outline" color={color.primary} size={18} />
                <Text style={tw`text-sm text-brewtopiagray-700 shrink`}>{values.local}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={tw`px-15`}>
          <CustomButton
            title="Log in"
            onPress={() => {

            }}
            variant="secondary"
            styleContainer="rounded-full border border-brewtopia-500 py-1 shadow-md"
            backgroundColorRiple="#c4c4c4"
          >
            <View style={tw`flex-row items-center`}>
              <Beers fill={color.primary} />
              <Text style={tw`ml-3 text-base font-semibold text-brewtopia-500`}>Beers</Text>
            </View>
          </CustomButton>
        </View>
      </View>
    </Modal>
  )
}

export default ModalBrewerie
