import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen } from "../../components"
import { useStores } from "../../models"
import { Text, TouchableOpacity, View } from "react-native"
import { color } from "../../theme"
import tw from "../../utils/tailwind"
import AppIntroSlider from "react-native-app-intro-slider"
import Father from "@expo/vector-icons/Feather"
import Toast from "react-native-toast-message"
import { useFocusEffect } from "@react-navigation/native"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import Animation1 from "./Animation/Animation1"
import Animation2 from "./Animation/Animation2"
import Animation3 from "./Animation/Animation3"
import Animation4 from "./Animation/Animation4"
import Animation5 from "./Animation/Animation5"

const slides = [
  {
    key: 1,
    title: "Step inside Brewtopia",
    text: "For the beer-drinker and the beer-\nthinkers. The intrepid, the savvy and the\nthirsty (ladies and gents, we mean you).",
    image: () => <Animation5 />,
    backgroundColor: "#59b2ab",
  },
  {
    key: 2,
    title: "Peruse - and choose-\nyour brews",
    text: "Using advanced image recognition, our\ntech tells you more about your tipple. Snap\nlabels and taps in the app for instant info.",
    image: () => <Animation1 />,
    backgroundColor: "#febe29",
  },
  {
    key: 3,
    title: "Rate your brews\nand get rewards",
    text: "Rate and review what you're drinking in\nexchange for rewards, and support the\nlocal breweries you love in the process.",
    image: () => <Animation2 />,
    backgroundColor: "#22bcb5",
  },
  {
    key: 4,
    title: "Adventures brews\npicked for you",
    text: "Like what you're drinking? Good news.\nBrewtopia will track of your tastes,and\nshare personalised recommendations on\nwhat to try next",
    image: () => <Animation3 />,
    backgroundColor: "#22bcb5",
  },
  {
    key: 5,
    title: "Mid if we see some ID",
    text: "Just your age will do",
    image: () => <Animation4 />,
    backgroundColor: "#22bcb5",
  },
]
export const IntroScreen: FC<StackScreenProps<NavigatorParamList, "intro">> = observer(
  ({ navigation }) => {
    //const [openModal, setOpenModal] = useState(false)
    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false)
    // Pull in one of our MST stores
    const { userStore } = useStores()
    const { showIntro, introCompleted } = userStore

    // useEffect(() => {
    //   if (!showIntro) {
    //     navigation.navigate("become")
    //   }
    // }, [])

    useFocusEffect(
      React.useCallback(() => {
        if (!showIntro) {
          navigation.navigate("become")
        }
      }, [showIntro]),
    )

    const renderItem = ({ item, index }) => {
      if (index === slides.length - 1) {
        return (
          <View style={tw`items-center justify-center flex-1 `}>
            <Text style={tw`mb-10 text-3xl font-bold text-center text-brewtopia-500`}>
              {item.title}
            </Text>
            <View style={tw`my-10`}>{item.image()}</View>
            <Text style={tw`mt-10 text-lg text-center text-gray-900`}>{item.text}</Text>
            <View style={tw`w-full`}>
              <TouchableOpacity onPress={() => setShow(true)}>
                <View
                  style={tw`items-center self-center w-1/2 py-2 mt-5 border rounded-full border-brewtopia-500`}
                >
                  <Text style={tw`text-lg font-bold text-brewtopia-500`}>
                    {date.toLocaleDateString()}
                  </Text>
                </View>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={show}
                mode="date"
                onConfirm={(date) => {
                  setShow(false)
                  setDate(date)
                }}
                onCancel={() => {
                  setShow(false)
                }}
              />
            </View>
          </View>
        )
      }
      return (
        <View style={tw`items-center justify-center flex-1`}>
          {item.image()}
          <Text style={tw`mt-10 text-2xl font-bold text-center text-brewtopia-500`}>
            {item.title}
          </Text>
          <Text style={tw`mt-10 text-lg text-center text-gray-900`}>{item.text}</Text>
        </View>
      )
    }

    const renderNextButton = () => {
      return (
        <View style={tw`flex-row items-center`}>
          <Text style={tw`mr-2 text-base font-semibold text-brewtopia-500`}>Next</Text>
          <Father name="arrow-right" size={20} color={color.primary} />
        </View>
      )
    }

    const renderDoneButton = () => {
      return (
        <View>
          <Text style={tw`text-base font-bold text-left text-brewtopia-500`}>Done</Text>
        </View>
      )
    }

    const onDone = () => {
      if (introCompleted(date)) {
        navigation.navigate("become")
      } else {
        Toast.show({
          type: "error",
          text1: "Only for adults",
        })
      }
    }

    return (
      <Screen style={tw`flex-1`} preset="scroll" backgroundColor={color.palette.white}>
        <AppIntroSlider
          showSkipButton
          showDoneButton
          renderItem={renderItem}
          data={slides}
          renderDoneButton={renderDoneButton}
          renderNextButton={renderNextButton}
          onSkip={() => {}}
          onDone={() => onDone()}
          activeDotStyle={tw`bg-brewtopia-500`}
          onSlideChange={(index) => {
            if (index === slides.length - 1) {
            }
          }}
        />
      </Screen>
    )
  },
)
