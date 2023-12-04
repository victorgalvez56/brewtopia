import { View, FlatList } from "react-native"
import Data from "./data.json"
import tw from "../../../utils/tailwind"
import { Skeleton } from "../../../components"

const ITEM_WITH = 25

const ListSkeleton = () => {
  return (
    <FlatList
      data={Data}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={tw`p-5`}
      ItemSeparatorComponent={() => <View style={tw`h-0.2 w-full bg-gray-50 my-3`} />}
      renderItem={({ item }) => (
        <View style={tw`flex-row items-start justify-between`}>
          <Skeleton width={105} style={`rounded-xl h-${ITEM_WITH}`} />

          <View style={tw`flex-1 ml-3`}>
            <View style={tw`flex-row items-center justify-between`}>
              <Skeleton width={190} style="rounded-xl h-3" />
              <Skeleton width={24} style="h-6 rounded-full" />
            </View>
            <Skeleton width={100} style="rounded-xl h-3 mt-2" />
            <View style={tw`flex-row items-center justify-between`}>
              <Skeleton width={130} style="rounded-xl h-3 mt-2" />
              <View style={tw`flex-row items-center mt-1`}>
                <Skeleton width={50} style="rounded-xl h-3" />
              </View>
            </View>
          </View>
        </View>
      )}
      scrollEventThrottle={1}
      maxToRenderPerBatch={5}
      showsVerticalScrollIndicator={false}
    />
  )
}

export default ListSkeleton
