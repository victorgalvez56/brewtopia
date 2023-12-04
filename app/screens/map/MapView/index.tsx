import { View, Text, useWindowDimensions, Platform } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import MapView, { AnimatedRegion, MarkerAnimated, PROVIDER_GOOGLE } from "react-native-maps"
import tw from "../../../utils/tailwind"
import { SearchInput } from "../../../components"
import TabCustom from "../../../components/tab-custom/tab-custom"
import ListPubsMarker from "../Marker/ListPubsMarker"
import CustomButton from "../../../components/custom-button/custom-button"
import FilterIcon from "../../../icons/FilterIcon"
import { color } from "../../../theme"
import Fontisto from "@expo/vector-icons/Fontisto"
import ModalPub from "../Modal/ModalPub"
import ModalBrewerie from "../Modal/ModalBrewerie"
import useCurrentLocation from "../Hooks/useCurrentLocation"
import { observer } from "mobx-react-lite"
import { useStores } from "../../../models"
import { useFocusEffect } from "@react-navigation/native"
import ListBreweriesMarker from "../Marker/ListBreweriesMarker"
import Toast from "react-native-toast-message"
import Spinner from "react-native-loading-spinner-overlay/lib"

interface Props {
  navigation: any
  route: any
}

const MapViewLayout: React.FC<Props> = ({ navigation, route }) => {
  const [tab, setTab] = useState(1)
  const { width } = useWindowDimensions()
  const middle = width / 2 - 65
  const [pubSelected, setPubSelected] = useState(null)
  const [brewerySelected, setBrewerySelected] = useState(null)
  const { onMapLoaded, setMap, INITIAL_REGION, map, mapLoaded, currentLocation } = useCurrentLocation()
  const [showLocation, setShowLocation] = useState(false)
  const [loading, setLoading] = useState(false)
  const { pubStore, breweryStore } = useStores()
  const { modalShowPub, closeModalPub, getSearchPubsByLocation, pubsNearData } = pubStore
  const { modalShowBrewery, closeModalBrewery, getSearchBreweriesMap } = breweryStore

  /* const coordinate = useRef(
    new AnimatedRegion({
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    }),
  ).current */

  /* function animateMarkerAndCamera(latitude: number, longitude: number) {
    const newCoordinate = {
      latitude,
      longitude,
    }

    const newCamera = {
      center: {
        latitude: latitude,
        longitude: longitude,
      },
      pitch: 0,
      heading: 0,
      zoom: 14,
    }
    coordinate.timing({ ...newCoordinate, useNativeDriver: false }).start()
    if (map) {
      map.animateCamera(newCamera, { duration: 2000 })
    }
  } */

  useFocusEffect(
    React.useCallback(() => {
      navigation.addListener("focus", () => {
        __DEV__ && console.log("tracking")
        setShowLocation(true)
      })
      const blurListener = navigation.addListener("blur", () => {
        __DEV__ && console.log("stop tracking")
        setShowLocation(false)
      })

      return () => {
        blurListener()
      }
    }, []),
  )

  useEffect(() => {
    if (currentLocation && currentLocation.coords) {
      map.animateCamera(
        {
          center: { latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude },
          pitch: 4,
          zoom: 10,
        },
        { duration: 750 },
      )

      onSearchPubs().then();
    }
    /* if (currentLocation) {
      if (currentLocation.latitude !== null && currentLocation.longitude !== null) {
        setTimeout(() => {
          const lat = parseFloat(currentLocation.latitude)
          const lng = parseFloat(currentLocation.longitude)
          animateMarkerAndCamera(lat, lng)
        }, 2000)
      }
    } */
  }, [mapLoaded])

  const onInComming = () => {
    Toast.show({
      type: "info",
      text1: "Coming soon",
    })
  }

  const onSearchPubs = async () => {
    try {
      setLoading(true)
      await getSearchPubsByLocation(currentLocation.coords.latitude, currentLocation.coords.longitude)
      if (pubsNearData) {
        /* const {latitude, longitude} = res
        map.animateCamera(
            {
                center: {latitude, longitude},
                pitch: 4,
            },
            {duration: 750},
        ) */
      } else {
        Toast.show({
          type: "error",
          text1: "Without results",
        })
      }
    } catch (error) {
      __DEV__ && console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const onSearchBreweries = async (search: string) => {
    try {
      setLoading(true)
      const res = await getSearchBreweriesMap(search)
      if (res) {
        const { latitude, longitude } = res
        map.animateCamera(
          {
            center: { latitude, longitude },
            pitch: 4,
          },
          { duration: 750 },
        )
      } else {
        Toast.show({
          type: "error",
          text1: "Without results",
        })
      }
    } catch (error) {
      __DEV__ && console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Spinner visible={loading} />
      <View style={tw`p-5 bg-white shadow-xl`}>
        <SearchInput
          navigation={navigation}
          filter={false}
          onSearch={tab === 1 ? onSearchPubs : onSearchBreweries}
        />
        <TabCustom tab={tab} setTab={setTab} styleContainer="mt-5" map={true} />
      </View>
      <View style={tw`flex-1 pb-20`}>
        <MapView
          ref={(ref) => setMap(ref)}
          zoomControlEnabled={true}
          userLocationCalloutEnabled={true}
          showsCompass={true}
          showsScale={true}
          compassOffset={{ x: 600, y: 300 }}
          onMapLoaded={() => {
            if (Platform.OS === "android") {
              onMapLoaded().then()
            }
            return null
          }}
          onLayout={() => {
            if (Platform.OS === "ios") {
              onMapLoaded().then()
            }
            return null
          }}
          style={tw`flex-1`}
          showsTraffic={false}
          showsIndoors={false}
          showsPointsOfInterest={false}
          showsMyLocationButton={true}
          showsUserLocation={showLocation}
          provider={PROVIDER_GOOGLE}
          initialRegion={INITIAL_REGION}
          mapType="standard"
        >
          {tab === 1 && <ListPubsMarker setPubSelected={setPubSelected} />}
          {tab === 2 && <ListBreweriesMarker setBrewerySelected={setBrewerySelected} />}
          {/* {route.params && route.params?.location ?
            <MarkerAnimated coordinate={coordinate} />
            : null
          } */}
        </MapView>
        <View
          style={tw`absolute ${modalShowPub ? "android:bottom-40 ios:bottom-50" : "bottom-25"} ${
            modalShowBrewery ? "android:bottom-50 ios:bottom-60" : ""
          } left-[${middle}px]`}
        >
          <CustomButton
            title="Log in"
            onPress={() => onInComming()}
            variant="secondary"
            styleContainer="rounded-full border border-brewtopia-500 py-2"
            backgroundColorRiple="#f3f3f3"
          >
            <View style={tw`flex-row items-center`}>
              <FilterIcon fill={color.primary} />
              <Text style={tw`ml-3 text-base font-semibold text-brewtopia-500`}>Filters</Text>
            </View>
          </CustomButton>
        </View>
        <View
          style={tw`absolute ${
            modalShowPub ? "android:bottom-52 ios:bottom-52" : "android:bottom-50 ios:bottom-40"
          } ${modalShowBrewery ? "android:bottom-50 ios:bottom-65" : ""} right-2`}
        >
          <CustomButton
            title="Log in"
            onPress={() => onInComming()}
            variant="secondary"
            styleContainer="rounded-full p-5 border border-brewtopia-500"
            backgroundColorRiple="#f3f3f3"
          >
            <View style={tw`flex-row items-center`}>
              <Fontisto name="nav-icon-list" color={color.primary} size={25} />
            </View>
          </CustomButton>
        </View>
      </View>
      <ModalPub
        navigation={navigation}
        open={modalShowPub}
        onClose={closeModalPub}
        item={pubSelected}
      />
      <ModalBrewerie
        navigation={navigation}
        open={modalShowBrewery}
        onClose={closeModalBrewery}
        item={brewerySelected}
      />
    </>
  )
}

export default observer(MapViewLayout)
