import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen } from "../../components"
import { color } from "../../theme"
import MapViewLayout from "./MapView"

export const MapScreen: FC<StackScreenProps<NavigatorParamList, "map">> = observer(
  ({ navigation, route }) => {
    // Pull in one of our MST stores
    return (
      <Screen backgroundColor={color.palette.white}>
        <MapViewLayout navigation={navigation} route={route} />
      </Screen>
    )
  },
)
