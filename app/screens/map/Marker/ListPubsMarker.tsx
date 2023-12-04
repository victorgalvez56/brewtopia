import React, { useCallback, useState } from "react"
import { View } from "react-native"
import { useStores } from "../../../models"
import PinIcon from "../../../icons/PinIcon"
import PinSelectedIcon from "../../../icons/PinSelectedIcon"
import { Marker } from "react-native-maps"
import { observer } from "mobx-react-lite"

interface Props {
  setPubSelected: (e: any) => void
}

const ListPubsMarker: React.FC<Props> = observer(({ setPubSelected }) => {
  const { pubStore } = useStores()
  const { pubsNearList } = pubStore
  const [selected, setSelected] = useState(null)

  return (
    <>
      {pubsNearList.map((item) => {
        return (
          <IconMarker
            key={item.id}
            item={item}
            setSelectedID={setSelected}
            selectedID={selected}
            setPubSelected={setPubSelected}
          />
        )
      })}
    </>
  )
})

interface IconMarkerProps {
  item: any
  setSelectedID: (v: number) => void
  selectedID: number
  setPubSelected: (e: any) => void
}

const IconMarker: React.FC<IconMarkerProps> = ({
  item,
  setSelectedID,
  selectedID,
  setPubSelected,
}) => {
  const { pubStore } = useStores()
  const { showModalPub } = pubStore

  const markerAction = useCallback((item: any) => {
    setSelectedID(item.id)
    setPubSelected(item)
    showModalPub()
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
          <PinIcon width={32} height={40} />
        ) : (
          <PinSelectedIcon width={22.4} height={28} />
        )}
      </View>
    </Marker>
  )
}

export default ListPubsMarker
