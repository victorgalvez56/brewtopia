import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen, Text } from "../../components"
import { color } from "../../theme"
import HeaderCustom from "../../components/header-custom/header-custom"
import tw from "../../utils/tailwind"
import { ScrollView, View } from "react-native"
export const PrivacyScreen: FC<StackScreenProps<NavigatorParamList, "privacy">> = observer(
  ({ navigation }) => {
    return (
      <Screen backgroundColor={color.palette.white}>
        <HeaderCustom
          variant="secondary"
          headerText="Privacy policy"
          back={true}
          headerStyle="text-center"
        />
        <ScrollView style={tw`px-5 mt-10`}>
          <Text style={tw`mb-5 text-2xl text-gray-300 text-brewtopiagray-900`}>Privacy Policy</Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            BQDevelopment built the Brewtopia app as a Free app. This SERVICE is provided by
            BQDevelopment at no cost and is intended for use as is.
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            This page is used to inform visitors regarding our policies with the collection, use,
            and disclosure of Personal Information if anyone decided to use our Service.
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            If you choose to use our Service, then you agree to the collection and use of
            information in relation to this policy. The Personal Information that we collect is used
            for providing and improving the Service. We will not use or share your information with
            anyone except as described in this Privacy Policy.
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            The terms used in this Privacy Policy have the same meanings as in our Terms and
            Conditions, which is accessible at Brewtopia unless otherwise defined in this Privacy
            Policy.
          </Text>

          <Text style={tw`text-2xl mb-6 mt-2.5 font-bold text-brewtopiagray-900`}>
            Information Collection and Use
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            For a better experience, while using our Service, we may require you to provide us with
            certain personally identifiable information, including but not limited to
            Surname,forename,email address,Date of Birth,Location. The information that we request
            will be retained by us and used as described in this privacy policy.
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            The app does use third party services that may collect information used to identify you.
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            Link to privacy policy of third party service providers used by the app
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

          <Text style={tw`text-2xl mb-6 mt-2.5 font-bold text-brewtopiagray-900`}>Log Data</Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            We want to inform you that whenever you use our Service, in a case of an error in the
            app we collect data and information (through third party products) on your phone called
            Log Data. This Log Data may include information such as your device Internet Protocol
            (“IP”) address, device name, operating system version, the configuration of the app when
            utilizing our Service, the time and date of your use of the Service, and other
            statistics.
          </Text>

          <Text style={tw`text-2xl mb-6 mt-2.5 font-bold text-brewtopiagray-900`}>Cookies</Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            Cookies are files with a small amount of data that are commonly used as anonymous unique
            identifiers. These are sent to your browser from the websites that you visit and are
            stored on your device's internal memory.
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            This Service does not use these “cookies” explicitly. However, the app may use third
            party code and libraries that use “cookies” to collect information and improve their
            services. You have the option to either accept or refuse these cookies and know when a
            cookie is being sent to your device. If you choose to refuse our cookies, you may not be
            able to use some portions of this Service.
          </Text>

          <Text style={tw`text-2xl mb-6 mt-2.5 font-bold text-brewtopiagray-900`}>
            Service Providers
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            We may employ third-party companies and individuals due to the following reasons:
          </Text>
          <View style={tw`mb-3.5`}>
            <View style={tw`flex-row`}>
              <Text style={tw`mt-1 mr-2.5 text-brewtopiagray-900 text-xss`}>{"\u2B24"}</Text>
              <Text style={tw`mb-0 text-sm text-brewtopiagray-900`}>
                To facilitate our Service;
              </Text>
            </View>
            <View style={tw`flex-row`}>
              <Text style={tw`mt-1 mr-2.5 text-brewtopiagray-900 text-xss`}>{"\u2B24"}</Text>
              <Text style={tw`mb-0 text-sm text-brewtopiagray-900`}>
                To provide the Service on our behalf;
              </Text>
            </View>
            <View style={tw`flex-row`}>
              <Text style={tw`mt-1 mr-2.5 text-brewtopiagray-900 text-xss`}>{"\u2B24"}</Text>
              <Text style={tw`mb-0 text-sm text-brewtopiagray-900`}>
                To perform Service-related services; or
              </Text>
            </View>
            <View style={tw`flex-row`}>
              <Text style={tw`mt-1 mr-2.5 text-brewtopiagray-900 text-xss`}>{"\u2B24"}</Text>
              <Text style={tw`mb-0 text-sm text-brewtopiagray-900`}>
                To assist us in analyzing how our Service is used.
              </Text>
            </View>
          </View>

          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            {" "}
            We want to inform users of this Service that these third parties have access to your
            Personal Information. The reason is to perform the tasks assigned to them on our behalf.
            However, they are obligated not to disclose or use the information for any other
            purpose.
          </Text>

          <Text style={tw`text-2xl mb-6 mt-2.5 font-bold text-brewtopiagray-900`}>Security</Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            {" "}
            We value your trust in providing us your Personal Information, thus we are striving to
            use commercially acceptable means of protecting it. But remember that no method of
            transmission over the internet, or method of electronic storage is 100% secure and
            reliable, and we cannot guarantee its absolute security.
          </Text>

          <Text style={tw`text-2xl mb-6 mt-2.5 font-bold text-brewtopiagray-900`}>
            Links to Other Sites
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            {" "}
            This Service may contain links to other sites. If you click on a third-party link, you
            will be directed to that site. Note that these external sites are not operated by us.
            Therefore, we strongly advise you to review the Privacy Policy of these websites. We
            have no control over and assume no responsibility for the content, privacy policies, or
            practices of any third-party sites or services.
          </Text>

          <Text style={tw`text-2xl mb-6 mt-2.5 font-bold text-brewtopiagray-900`}>
            Children’s Privacy
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            {" "}
            These Services do not address anyone under the age of 13. We do not knowingly collect
            personally identifiable information from children under 13\. In the case we discover
            that a child under 13 has provided us with personal information, we immediately delete
            this from our servers. If you are a parent or guardian and you are aware that your child
            has provided us with personal information, please contact us so that we will be able to
            do necessary actions.
          </Text>

          <Text style={tw`text-2xl mb-6 mt-2.5 font-bold text-brewtopiagray-900`}>
            Changes to This Privacy Policy
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            {" "}
            We may update our Privacy Policy from time to time. Thus, you are advised to review this
            page periodically for any changes. We will notify you of any changes by posting the new
            Privacy Policy on this page.
          </Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            This policy is effective as of 2020-12-12
          </Text>

          <Text style={tw`text-2xl mb-6 mt-2.5 font-bold text-brewtopiagray-900`}>Contact Us</Text>
          <Text style={tw`text-sm mb-6 text-brewtopiagray-900`}>
            If you have any questions or suggestions about our Privacy Policy, do not hesitate to
            contact us at jack@brewtopia.app.
          </Text>
        </ScrollView>
      </Screen>
    )
  },
)
