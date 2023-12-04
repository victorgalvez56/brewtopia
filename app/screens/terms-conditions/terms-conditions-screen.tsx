import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen, Text } from "../../components"
import { color } from "../../theme"
import HeaderCustom from "../../components/header-custom/header-custom"
import tw from "../../utils/tailwind"
import { ScrollView, View } from "react-native"
export const TermsConditions: FC<StackScreenProps<NavigatorParamList, "termsConditions">> =
  observer(({ navigation }) => {
    return (
      <Screen backgroundColor={color.palette.white}>
        <HeaderCustom variant="secondary" headerText="Terms and Conditions" back={true} headerStyle="text-center" />
        <ScrollView style={tw`px-5 mt-10`}>
          <Text style={tw`mb-5 text-2xl text-gray-300 text-brewtopiagray-900`}>
            Terms & Conditions
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            By downloading or using the app, these terms will automatically apply to you – you
            should make sure therefore that you read them carefully before using the app. You’re not
            allowed to copy, or modify the app, any part of the app, or our trademarks in any way.
            You’re not allowed to attempt to extract the source code of the app, and you also
            shouldn’t try to translate the app into other languages, or make derivative versions.
            The app itself, and all the trade marks, copyright, database rights and other
            intellectual property rights related to it, still belong to BQDevelopment.
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            BQDevelopment is committed to ensuring that the app is as useful and efficient as
            possible. For that reason, we reserve the right to make changes to the app or to charge
            for its services, at any time and for any reason. We will never charge you for the app
            or its services without making it very clear to you exactly what you’re paying for.
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            The Brewtopia app stores and processes personal data that you have provided to us, in
            order to provide our Service. It’s your responsibility to keep your phone and access to
            the app secure. We therefore recommend that you do not jailbreak or root your phone,
            which is the process of removing software restrictions and limitations imposed by the
            official operating system of your device. It could make your phone vulnerable to
            malware/viruses/malicious programs, compromise your phone’s security features and it
            could mean that the Brewtopia app won’t work properly or at all.
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            The app does use third party services that declare their own Terms and Conditions.
          </Text>
          <Text style={tw`mb-5 text-2xl text-gray-300 text-brewtopiagray-900`}>
            Link to Terms and Conditions of third party service providers used by the app
          </Text>
          <View style={tw`mb-3.5`}>
            <View style={tw`flex-row`}>
              <Text style={tw`mt-1 mr-2.5 text-brewtopiagray-900 text-xss`}>{"\u2B24"}</Text>
              <Text style={tw`mb-0 text-sm text-brewtopiagray-900`}>
                [Google Play Services](https://www.google.com/policies/privacy/)
              </Text>
            </View>
            <View style={tw`flex-row`}>
              <Text style={tw`mt-1 mr-2.5 text-brewtopiagray-900 text-xss`}>{"\u2B24"}</Text>
              <Text style={tw`mb-0 text-sm text-brewtopiagray-900`}>
                [Google Analytics for Firebase](https://firebase.google.com/policies/analytics)
              </Text>
            </View>
            <View style={tw`flex-row`}>
              <Text style={tw`mt-1 mr-2.5 text-brewtopiagray-900 text-xss`}>{"\u2B24"}</Text>
              <Text style={tw`mb-0 text-sm text-brewtopiagray-900`}>
                [Unity](https://unity3d.com/legal/privacy-policy)
              </Text>
            </View>
          </View>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            You should be aware that there are certain things that BQDevelopment will not take
            responsibility for. Certain functions of the app will require the app to have an active
            internet connection. The connection can be Wi-Fi, or provided by your mobile network
            provider, but BQDevelopment cannot take responsibility for the app not working at full
            functionality if you don’t have access to Wi-Fi, and you don’t have any of your data
            allowance left.
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            If you’re using the app outside of an area with Wi-Fi, you should remember that your
            terms of the agreement with your mobile network provider will still apply. As a result,
            you may be charged by your mobile provider for the cost of data for the duration of the
            connection while accessing the app, or other third party charges. In using the app,
            you’re accepting responsibility for any such charges, including roaming data charges if
            you use the app outside of your home territory (i.e. region or country) without turning
            off data roaming. If you are not the bill payer for the device on which you’re using the
            app, please be aware that we assume that you have received permission from the bill
            payer for using the app.
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            Along the same lines, BQDevelopment cannot always take responsibility for the way you
            use the app i.e. You need to make sure that your device stays charged – if it runs out
            of battery and you can’t turn it on to avail the Service, BQDevelopment cannot accept
            responsibility.
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            With respect to BQDevelopment’s responsibility for your use of the app, when you’re
            using the app, it’s important to bear in mind that although we endeavour to ensure that
            it is updated and correct at all times, we do rely on third parties to provide
            information to us so that we can make it available to you. BQDevelopment accepts no
            liability for any loss, direct or indirect, you experience as a result of relying wholly
            on this functionality of the app.
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            At some point, we may wish to update the app. The app is currently available on Android
            & iOS – the requirements for both systems(and for any additional systems we decide to
            extend the availability of the app to) may change, and you’ll need to download the
            updates if you want to keep using the app. BQDevelopment does not promise that it will
            always update the app so that it is relevant to you and/or works with the Android & iOS
            version that you have installed on your device. However, you promise to always accept
            updates to the application when offered to you, We may also wish to stop providing the
            app, and may terminate use of it at any time without giving notice of termination to
            you. Unless we tell you otherwise, upon any termination, (a) the rights and licenses
            granted to you in these terms will end; (b) you must stop using the app, and (if needed)
            delete it from your device.
          </Text>

          <Text style={tw`mb-5 text-2xl text-gray-300 text-brewtopiagray-900`}>
            Changes to This Terms and Conditions
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            We may update our Terms and Conditions from time to time. Thus, you are advised to
            review this page periodically for any changes. We will notify you of any changes by
            posting the new Terms and Conditions on this page.
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            These terms and conditions are effective as of 2020-12-12
          </Text>

          <Text style={tw`mb-5 text-2xl text-gray-300 text-brewtopiagray-900`}>Contact Us</Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            If you have any questions or suggestions about our Terms and Conditions, do not hesitate
            to contact us at jack@brewtopia.app.
          </Text>
        </ScrollView>
      </Screen>
    )
  })
