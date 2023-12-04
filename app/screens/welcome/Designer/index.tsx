import { View, Text } from "react-native"
import React, { useState } from "react"
import CustomButton from "../../../components/custom-button/custom-button"
import tw from "../../../utils/tailwind"
import Fontisto from "@expo/vector-icons/Fontisto"
import Father from "@expo/vector-icons/Feather"
import Beers from "../../../icons/Beers"
import Input from "../../../components/input-custom/input-custom"

interface Props {
  navigation: any
}

const Designer: React.FC<Props> = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <View style={tw`flex-1 bg-white `}>
      <View style={tw`px-4`}>
        <CustomButton
          title="Log in"
          onPress={() => navigation.navigate("intro")}
          variant="primary"
          styleContainer="my-4"
        />
        <CustomButton
          title="I'm already a Brewtopian"
          onPress={() => console.log("hola mundo")}
          variant="primary"
          styleContainer="mb-4 border-2 border-white"
        />

        <CustomButton
          title="Become a Brewtopian"
          onPress={() => console.log("hola mundo")}
          variant="secondary"
        />

        <CustomButton
          title="Log in"
          onPress={() => console.log("hola mundo")}
          variant="secondary"
          styleContainer="mt-4 border border-facebook-500"
          backgroundColorRiple="#c4c4c4"
        >
          <View style={tw`flex-row items-center`}>
            <Fontisto name="facebook" size={20} color="#4267b2" />
            <Text style={tw`ml-2 text-base font-bold text-black`}>Continue with Facebook</Text>
          </View>
        </CustomButton>
        <CustomButton
          title="Log in"
          onPress={() => {

          }}
          variant="primary"
          styleContainer="mt-4 rounded-full"
          backgroundColorRiple="#c4c4c4"
        >
          <View style={tw`flex-row items-center`}>
            <Beers />
            <Text style={tw`ml-3 text-base font-semibold text-white`}>Beers</Text>
          </View>
        </CustomButton>
        <View style={tw`mt-4`}>
          <Input
            placeholder="placeholder text"
            containerStyle={tw`w-full`}
            RightIconComponent={<Father name="eye-off" color="#c4c4c4" size={25} />}
          />
          <Input placeholder="Email" label="Email" error containerStyle={tw`w-full`} />
          <Input
            secureTextEntry={!isVisible}
            value="password"
            containerStyle={tw`w-full`}
            RightIconComponent={
              <Father
                name={isVisible ? "eye-off" : "eye"}
                size={24}
                onPress={() => {
                  setIsVisible(!isVisible)
                }}
              />
            }
          />
        </View>
      </View>
    </View>
  )
}

export default Designer
