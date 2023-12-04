import { View, FlatList, Text } from "react-native"
import React from "react"
import tw from "../../../utils/tailwind"
import DATA_LIST from "../Banners/data.json"
import { Skeleton } from "../../../components"

const ITEM_WITH = 30
const SPACING = 10

interface BannersListSkeletonProps {
  title?: string
}
const BannersListSkeleton: React.FC<BannersListSkeletonProps> = ({ title }) => {
  return (
    <View style={tw`mt-3`}>
      <View style={tw`flex-row items-center justify-between mb-2`}>
        <Text style={tw`text-lg font-bold text-brewtopiagray-700`}>{title}</Text>
      </View>
      <FlatList
        data={DATA_LIST}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        contentContainerStyle={tw`pr-5 my-2`}
        decelerationRate={"fast"}
        snapToInterval={ITEM_WITH + SPACING * 2}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={tw`mr-2`}>
              <Skeleton width={120} style="rounded-xl h-29" />
              <Skeleton width={60} style="rounded-lg h-1.5 mt-1 ml-1" />
              <Skeleton width={40} style="rounded-lg h-1.5  mt-1 ml-1" />
              <Skeleton width={110} style="rounded-lg h-1.5 mt-1 ml-1" />
            </View>
          )
        }}
      />
      <View style={tw`w-full h-0.3 bg-gray-200`} />
    </View>
  )
}

export default BannersListSkeleton
