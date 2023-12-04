import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen, Text } from "../../components"
import { color } from "../../theme"
import HeaderCustom from "../../components/header-custom/header-custom"
import tw from "../../utils/tailwind"
import { ScrollView, View } from "react-native"
export const FaqScreen: FC<StackScreenProps<NavigatorParamList, "faq">> = observer(
  ({ navigation }) => {
    return (
      <Screen backgroundColor={color.palette.white}>
        <HeaderCustom variant="secondary" headerText="FAQ" back={true} headerStyle="text-center" />
        <ScrollView style={tw`px-5 mt-10`}>
          <Text style={tw`mb-5 text-2xl text-gray-300 text-brewtopiagray-900`}>
            Does Brewtopia personalise recommendations?
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            Yes, Brewtopia uses your own scanning and rating behaviour alongside the ratings
            provided by the Brewtopia community to recommend beers we are confident you will like.
            The more you use Brewtopia to discover new beers and let us know what you like the
            better your recommendations.
          </Text>
          <Text style={tw`mb-5 text-2xl text-gray-300 text-brewtopiagray-900`}>
            Why can’t I find my favourite beer?
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            Brewtopia is still in the early stages of development and needs your help to enhance and
            increase our database. You can upload a beer with our scanning screen or click here.
          </Text>
          <Text style={tw`mb-5 text-2xl text-gray-300 text-brewtopiagray-900`}>
            What devices can I download the app on?
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            Brewtopia is currently available on ios devices however we are in the process of
            building the Android version to be released very soon.
          </Text>

          <Text style={tw`mb-5 text-2xl text-gray-300 text-brewtopiagray-900`}>
            How do I change my user name?
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            You can change your username and profile picture in the settings tab on your profile
            screen.
          </Text>

          <Text style={tw`mb-5 text-2xl text-gray-300 text-brewtopiagray-900`}>
            How do I search for a particular brewer, or by beer style?
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            You can search through any of the breweries in Brewtopia on the search tab. By using the
            filters tab on the right of the search bar you can choose your favourite beer style.
          </Text>

          <Text style={tw`mb-5 text-2xl text-gray-300 text-brewtopiagray-900`}>
            How do I remove a beer from any of my lists?
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            To remove a beer from any of your lists in the brewtopia you can highlight the beer and
            deselect it from appearing on any list.
          </Text>

          <Text style={tw`mb-5 text-2xl text-gray-300 text-brewtopiagray-900`}>
            How can I make a beer suggestion?
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            If you can’t find your brew of choice in the Brewtopia database by scanning the badge,
            label or tap, Brewtopia will ask you to upload a picture and beer details. If you don’t
            have any of these to hand you can use the submit feedback in the setting tab on the
            profile screen.
          </Text>

          <Text style={tw`mb-5 text-2xl text-gray-300 text-brewtopiagray-900`}>
            App can't find my location when searching
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            Brewtopia needs access to your location to be able to find you when you're searching.
            Check your permissions within your phone settings and enable location services while
            you're using the app to get the best experience.
          </Text>

          <Text style={tw`mb-5 text-2xl text-gray-300 text-brewtopiagray-900`}>
            I Work for or own a brewery, how can we get our beers on Brewtopia?
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            You can submit your beers via the “submit feedback” in the settings tab or feel free to
            head to our website and register your business.
          </Text>

          <Text style={tw`mb-5 text-2xl text-gray-300 text-brewtopiagray-900`}>
            The App keeps crashing… help?
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            Try updating the app through the app store. If you still run into problems please
            contact us via the “submit feedback” in the settings tab.
          </Text>

          <Text style={tw`mb-5 text-2xl text-gray-300 text-brewtopiagray-900`}>
            I have forgotten my password
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            If you have forgotten your password, simply click on “forgot my password” when you first
            launch the app. You will be asked to fill in your email address, which will generate a
            reset code to be sent to your email address. Check your emails and enter it into the
            next screen along with a new password.
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            If the problem persists, contact us via the “submit feedback” who can provide a reset
            code which will be valid for 24 hours.
          </Text>
        </ScrollView>
      </Screen>
    )
  },
)
