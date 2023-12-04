import React, { FC, useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen } from "../../components"
import { Pressable, Text, View, FlatList } from "react-native"
import { useStores } from "../../models"
import { color } from "../../theme"
import tw from "../../utils/tailwind"
import HeaderCustom from "../../components/header-custom/header-custom"
import CustomButton from "../../components/custom-button/custom-button"

export const FilterScreen: FC<StackScreenProps<NavigatorParamList, "filter">> = observer(
  ({ route, navigation }) => {
    // Pull in one of our MST stores
    const { beerStylesStore } = useStores()
    const { beerStylesList, getBeerStyles, onSelectedStyle, beerStylesSelectedList } =
      beerStylesStore
    const [actives, setActives] = useState(beerStylesSelectedList)
    const addActives = (id: number) => {
      setActives([...actives, id])
    }

    const removeActives = (id: number) => {
      setActives(actives.filter((item) => item !== id))
    }

    const onClick = (id: number) => {
      const index = actives.findIndex((item) => item === id)
      if (index !== -1) {
        removeActives(id)
      } else {
        addActives(id)
      }
    }

    const onDone = () => {
      onSelectedStyle(actives, route.params)
      navigation.goBack()
    }

    const onClear = () => {
      setActives([])
      onSelectedStyle([], route.params)
    }
    useEffect(() => {
      getList().then()
    }, [])

    const getList = async () => {
      await getBeerStyles()
    }

    return (
      <Screen backgroundColor={color.palette.white}>
        <HeaderCustom
          variant="secondary"
          headerText="Filters"
          back={true}
          headerStyle="text-center"
        />
        <View style={tw`justify-between flex-1 px-4 pb-8`}>
          <Text style={tw`mb-2 text-lg font-bold text-brewtopiagray-700`}>Style</Text>
          <FlatList
            data={beerStylesList}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`pb-5`}
            renderItem={({ item }) => (
              <Pressable onPress={() => onClick(item.id)}>
                <View style={tw`flex-row items-center my-3`}>
                  {actives.findIndex((i) => i === item.id) !== -1 ? (
                    <View
                      style={tw`items-center justify-center w-5 h-5 mr-2 border-2 rounded-full border-brewtopia-500 bg-brewtopia-500 `}
                    >
                      <View style={tw`w-2 h-2 bg-white rounded-full`} />
                    </View>
                  ) : (
                    <View style={tw`w-5 h-5 mr-2 border-2 rounded-full border-brewtopia-500 `} />
                  )}

                  <Text style={tw`text-base text-brewtopiagray-700`}>{item.name}</Text>
                </View>
              </Pressable>
            )}
          />
          <View style={tw`flex-row items-center`}>
            <CustomButton
              styleContainer="w-1/2"
              variant="primary"
              title="Clear all"
              disabled={actives.length === 0}
              onPress={() => onClear()}
            />
            <CustomButton
              variant="primary"
              title="Done"
              onPress={() => onDone()}
              styleContainer="w-1/2 ml-1"
            />
          </View>
        </View>
      </Screen>
    )
  },
)
