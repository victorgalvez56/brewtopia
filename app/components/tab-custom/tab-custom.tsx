import * as React from "react"
import { Pressable, Text, View } from "react-native"
import BeersIcon from "../../icons/BeersIcon"
import BrewbeersIcon from "../../icons/BrewbeersIcon"
import StoreIcon from "../../icons/StoreIcon"
import tw from "../../utils/tailwind"

export interface TabCustomProps {
  tab: number
  setTab: (v: number) => void
  styleContainer?: string
  map?: boolean
}

const TabCustom: React.FC<TabCustomProps> = ({ tab, setTab, styleContainer, map }) => {
  return (
    <View style={tw`flex-row items-center justify-around ${styleContainer}`}>
      {map ? (
        <>
          <Pressable
            onPress={() =>
              requestAnimationFrame(() => {
                setTab(1)
              })
            }
          >
            <View
              style={tw`items-center justify-center ${
                tab === 1 ? "border-b border-b-brewtopia-500" : ""
              }`}
            >
              <StoreIcon fill={tab !== 1 ? "#DFDFDF" : "#FF7558"} />
              <Text style={tw`mt-1 text-base text-brewtopiagray-700`}>Pub</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() =>
              requestAnimationFrame(() => {
                setTab(2)
              })
            }
          >
            <View
              style={tw`items-center justify-center ${
                tab === 2 ? "border-b border-b-brewtopia-500" : ""
              }`}
            >
              <BrewbeersIcon fill={tab !== 2 ? "#DFDFDF" : "#FF7558"} />
              <Text style={tw`mt-1 text-base text-brewtopiagray-700`}>Breweries</Text>
            </View>
          </Pressable>
        </>
      ) : (
        <>
          <Pressable
            onPress={() =>
              requestAnimationFrame(() => {
                setTab(1)
              })
            }
          >
            <View
              style={tw`items-center justify-center ${
                tab === 1 ? "border-b border-b-brewtopia-500" : ""
              }`}
            >
              <BeersIcon fill={tab !== 1 ? "#DFDFDF" : "#FF7558"} />
              <Text style={tw`mt-1 text-base text-brewtopiagray-700`}>Beers</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() =>
              requestAnimationFrame(() => {
                setTab(2)
              })
            }
          >
            <View
              style={tw`items-center justify-center ${
                tab === 2 ? "border-b border-b-brewtopia-500" : ""
              }`}
            >
              <BrewbeersIcon fill={tab !== 2 ? "#DFDFDF" : "#FF7558"} />
              <Text style={tw`mt-1 text-base text-brewtopiagray-700`}>Breweries</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() =>
              requestAnimationFrame(() => {
                setTab(3)
              })
            }
          >
            <View
              style={tw`items-center justify-center ${
                tab === 3 ? "border-b border-b-brewtopia-500" : ""
              }`}
            >
              <StoreIcon fill={tab !== 3 ? "#DFDFDF" : "#FF7558"} />
              <Text style={tw`mt-1 text-base text-brewtopiagray-700`}>Pub</Text>
            </View>
          </Pressable>
        </>
      )}
    </View>
  )
}

TabCustom.defaultProps = {
  tab: 1,
  styleContainer: "",
  map: false,
}

export default TabCustom
