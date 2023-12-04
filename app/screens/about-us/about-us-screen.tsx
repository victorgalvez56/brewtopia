import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen, Text } from "../../components"
import { color } from "../../theme"
import HeaderCustom from "../../components/header-custom/header-custom"
import tw from "../../utils/tailwind"
import { ScrollView, View } from "react-native"
export const AboutUsScreen: FC<StackScreenProps<NavigatorParamList, "aboutUs">> = observer(
  ({ navigation }) => {
    return (
      <Screen backgroundColor={color.palette.white}>
        <HeaderCustom variant="secondary" headerText="About us" back={true} headerStyle="text-center" />
        <ScrollView style={tw`px-5 mt-10`}>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            We are Brewtopia, and we believe people deserve to drink better beer.
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            Brewtopia is a mobile app designed to help drinkers navigate the complicated beer
            universe, whilst providing breweries, venues and event organisers with a platform to
            reach and connect with their audience. Our founder is a publican himself, who realised
            that a lot of brilliant local and craft beer wasn't getting the attention it deserved.
            He decided to do something about it, and at the same time wanted to create a platform to
            encourage punters try something new (not that he has anything against a classic pint).
            Brewtopia was born. Created for drinkers of any kind, and fuelled by the users that feed
            the platform with new and exciting beers. If you're new here, welcome. If you're
            returning, thank you. We're thrilled to have you on this journey with us.
          </Text>
        </ScrollView>
      </Screen>
    )
  },
)
