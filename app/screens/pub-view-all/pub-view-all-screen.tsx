import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen, SearchInput } from "../../components"
import { View } from "react-native"
import { useStores } from "../../models"
import { color } from "../../theme"
import tw from "../../utils/tailwind"
import HeaderCustom from "../../components/header-custom/header-custom"
import ListSkeleton from "./Category/ListSkeleton"
import List from "./Category/List"

export const PubViewAllScreen: FC<StackScreenProps<NavigatorParamList, "pubViewAll">> = observer(
  ({ navigation }) => {
    // Pull in one of our MST stores
    const { pubStore } = useStores()
    const { getSearchPubsViewAll } = pubStore
    const [loading, setLoading] = useState(false)
    const onSearch = async (text: string) => {
      setLoading(true)
      await getSearchPubsViewAll(text)
      setLoading(false)
    }
    return (
      <Screen backgroundColor={color.palette.white}>
        <HeaderCustom variant="secondary" headerText="Pubs" headerStyle="text-center" />
        <View style={tw`items-center justify-between flex-1 `}>
          <View style={tw`w-full px-4 py-4`}>
            <SearchInput navigation={navigation} onSearch={onSearch} filter={false} />
          </View>
          <View style={tw`flex-1 w-full`}>
            {loading ? <ListSkeleton /> : <List navigation={navigation} />}
          </View>
        </View>
      </Screen>
    )
  },
)
