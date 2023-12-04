import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen, SearchInput } from "../../components"
import { Text, View } from "react-native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import tw from "../../utils/tailwind"
import HeaderCustom from "../../components/header-custom/header-custom"
import TabCustom from "../../components/tab-custom/tab-custom"
import BeerFavourites from "./Tabs/BeerFavourites"
import BreweriesFavourites from "./Tabs/BreweriesFavourites"
import PubFavourites from "./Tabs/PubFavourites"

export const FavoritesScreen: FC<StackScreenProps<NavigatorParamList, "favorites">> = observer(
  ({ navigation }) => {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()
    const [tab, setTab] = useState(1)

    return (
      <Screen backgroundColor={color.palette.white}>
        <HeaderCustom
          variant="secondary"
          headerText="Your favourites"
          back={true}
          headerStyle="text-center"
        />
        <View style={tw`items-center justify-between flex-1`}>
          <View style={tw`w-full px-6 pb-2`}>
            <Text style={tw`mb-5 text-base text-brewtopiagray-700`}>
              Damn you've got goot taste!
            </Text>
            <TabCustom tab={tab} setTab={setTab} styleContainer="mb-5" />
            {/* <SearchInput navigation={navigation} /> */}
          </View>
          <View style={tw`flex-1 w-full mb-5`}>
            {tab === 1 && <BeerFavourites navigation={navigation} />}
            {tab === 2 && <BreweriesFavourites navigation={navigation} />}
            {tab === 3 && <PubFavourites navigation={navigation} />}
          </View>
        </View>
      </Screen>
    )
  },
)
