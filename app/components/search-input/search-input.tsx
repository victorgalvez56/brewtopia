import * as React from "react"
import { View, Pressable, TextInput } from "react-native"
import { observer } from "mobx-react-lite"
import tw from "../../utils/tailwind"
import Fontisto from "@expo/vector-icons/Fontisto"
import FilterIcon from "../../icons/FilterIcon"
import { useState } from "react"

export interface SearchInputProps {
  navigation: any
  onSearch?: (v: string) => void
  filter?: boolean
}

export const SearchInput: React.FC<SearchInputProps> = observer(function SearchInput({
  navigation,
  onSearch,
  filter = true,
}) {

  const [search, setSearch] = useState('')

  return (
    <View
      style={tw`flex-row items-center justify-between p-2 bg-white border rounded-md shadow-md border-gray-50`}
    >
      <Fontisto name="search" color="#858487" size={18} />
      <TextInput
        style={tw`flex-1 h-8 ml-3 text-base`}
        placeholder="Search"
        keyboardType="web-search"
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
        onSubmitEditing={(event) => {
          if (onSearch) {
            setSearch(event.nativeEvent.text)
            onSearch(event.nativeEvent.text)
          }
        }}
        placeholderTextColor={"#858487"}
      />
      {filter && (
        <View style={tw`flex-row items-center`}>
          <View style={tw`h-5 w-0.4 bg-[#858487] mx-2`} />
          <Pressable
            onPress={() => {
              navigation.navigate("filter", search)
            }}
          >
            <FilterIcon />
          </Pressable>
        </View>
      )}
    </View>
  )
})
