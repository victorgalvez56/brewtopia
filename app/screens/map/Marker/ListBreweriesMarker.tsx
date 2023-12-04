import React, { useCallback, useEffect, useState } from "react"
import { View } from "react-native"
import { useStores } from "../../../models"
import { Marker } from "react-native-maps"
import { observer } from "mobx-react-lite"
import PinBrewieIcon from "../../../icons/PinBrewieIcon"
import PinBrewieSelectedIcon from "../../../icons/PinBrewieSelectedIcon"

interface Props {
  setBrewerySelected: (e: any) => void
}

const ListBreweriesMarker: React.FC<Props> = observer(({ setBrewerySelected }) => {
  const { breweryStore } = useStores()
  const { breweriesMapList } = breweryStore
  const [selected, setSelected] = useState(null)

  return (
    <>
      {breweriesMapList.map((item) => {
        if (item.longitude && item.latitude) {
          return (
            <IconMarker
              key={item.id}
              item={item}
              setSelectedID={setSelected}
              selectedID={selected}
              setBrewerySelected={setBrewerySelected}
            />
          )
        }
        return null
      })}
    </>
  )
})

interface IconMarkerProps {
  item: any
  setSelectedID: (v: number) => void
  selectedID: number
  setBrewerySelected: (e: any) => void
}

const IconMarker: React.FC<IconMarkerProps> = ({
  item,
  setSelectedID,
  selectedID,
  setBrewerySelected,
}) => {
  const { breweryStore } = useStores()
  const { showModalBrewery } = breweryStore

  const markerAction = useCallback((item: any) => {
    setSelectedID(item.id)
    setBrewerySelected(item)
    showModalBrewery()
  }, [])

  return (
    <Marker
      pinColor="#c4c4c4"
      coordinate={{ latitude: item.latitude, longitude: item.longitude }}
      flat={false}
      onSelect={() => console.log("example")}
      onPress={async () => {
        markerAction(item)
      }}
      tracksViewChanges={false}
    >
      <View>
        {selectedID !== null && selectedID === item.id ? (
          <PinBrewieSelectedIcon width={32} height={40} />
        ) : (
          <PinBrewieIcon width={22.4} height={28} />
        )}
      </View>
    </Marker>
  )
}

export default ListBreweriesMarker
