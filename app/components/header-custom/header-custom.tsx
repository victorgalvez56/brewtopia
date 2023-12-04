import * as React from "react"
import {View, Text, TouchableNativeFeedback} from "react-native"
import tw from "../../utils/tailwind"
import Feather from "@expo/vector-icons/Feather"
import Entypo from "@expo/vector-icons/Entypo"
import Ionicons from "@expo/vector-icons/Ionicons"
import {useNavigation} from "@react-navigation/native"
import SearchIconHeader from "../../icons/SearchIconHeader"
import LogoHeader from "../../icons/LogoHeader"
import Toast from "react-native-toast-message";
import {useStores} from "../../models";

export interface HeaderCustomProps {
    back?: boolean
    variant?: "primary" | "secondary"
    headerText?: string
    headerStyle?: string
    searchable?: boolean
    onSearch?: () => void
    iconLike?: boolean
    like?: boolean
    onLike?: () => void
    iconShared?: boolean
    onShared?: () => void
    iconSetting?: boolean
    onSetting?: () => void
    onBack?: () => void
    type?: string,
    objectId?: number
}

/**
 * Describe your component here
 */
const HeaderCustom: React.FC<HeaderCustomProps> = ({
                                                       back,
                                                       variant,
                                                       headerText,
                                                       headerStyle,
                                                       searchable,
                                                       onSearch,
                                                       iconLike,
                                                       like,
                                                       onLike,
                                                       iconShared,
                                                       iconSetting,
                                                       onSetting,
                                                       onBack,
                                                       type,
                                                       objectId
                                                   }) => {
    const navigation = useNavigation()
    const [likeOn, setLikeOn] = React.useState(like)
    const pressLike = () => {
        if (onLike) onLike()
        if (likeOn) {
            setLikeOn(false)
        } else {
            setLikeOn(true)
        }

        if (type === 'brewery')
            onPressFavorite(objectId).then();
    }

    const { breweryStore } = useStores()
    const { setRemoveFavouriteBrewery, setAddFavouriteBrewery, breweriesFavouritesList } = breweryStore

    const onPressFavorite = async (id: number) => {
        const index = breweriesFavouritesList.findIndex((i) => i.id === id)
        if (index !== -1 && likeOn) {
            const res = await setRemoveFavouriteBrewery(id)
            if (res) {
                Toast.show({
                    type: "success",
                    text1: "Removed from favorites",
                })
            }
        } else {
            const res = await setAddFavouriteBrewery(id)
            if (res) {
                Toast.show({
                    type: "success",
                    text1: "added to favorites",
                })
            }
        }
    }

    return (
        <View
            style={tw`h-15 items-center justify-between ${
                variant === "primary" ? "bg-brewtopia-500" : "bg-white"
            } px-4 flex-row`}
        >
            {back && (
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple("#fff", true)}
                    onPress={() =>
                        requestAnimationFrame(() => {
                            if (onBack) {
                                onBack()
                            } else {
                                navigation.goBack()
                            }
                        })
                    }
                >
                    <View style={tw`items-center justify-center w-8 h-8`}>
                        <Feather
                            name="arrow-left"
                            size={25}
                            color={variant === "primary" ? "#fff" : "#49484D"}
                        />
                    </View>
                </TouchableNativeFeedback>
            )}
            {headerText ? (
                <View style={tw`flex-1`}>
                    <Text
                        style={tw`${
                            variant === "primary"
                                ? "font-bold text-2xl text-white"
                                : "text-lg text-brewtopiagray-700 font-semibold"
                        } ${headerStyle}`}
                    >
                        {headerText}
                    </Text>
                </View>
            ) : (
                <View style={tw`flex-1 ${headerStyle}`}>
                    <LogoHeader/>
                </View>
            )}
            {searchable && (
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple("#fff", true)}
                    onPress={() =>
                        requestAnimationFrame(() => {
                            onSearch()
                        })
                    }
                >
                    <View style={tw`items-center justify-center w-8 h-8`}>
                        <SearchIconHeader/>
                    </View>
                </TouchableNativeFeedback>
            )}
            {iconShared && (
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple("#c4c4c4", true)}
                    onPress={() => requestAnimationFrame(() => {

                    })}
                >
                    <View style={tw`items-center justify-center w-8 h-8 mr-2`}>
                        <Feather name="share" size={25} color="#000"/>
                    </View>
                </TouchableNativeFeedback>
            )}
            {iconLike && (
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple("#c4c4c4", true)}
                    onPress={() =>
                        requestAnimationFrame(() => {
                            pressLike()
                        })
                    }
                >
                    <View style={tw`items-center justify-center w-8 h-8`}>
                        <Entypo
                            name={likeOn ? "heart" : "heart-outlined"}
                            size={30}
                            color={likeOn ? "red" : "#000"}
                        />
                    </View>
                </TouchableNativeFeedback>
            )}
            {iconSetting && (
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple("#c4c4c4", true)}
                    onPress={() => requestAnimationFrame(onSetting)}
                >
                    <View style={tw`items-center justify-center w-8 h-8`}>
                        <Ionicons name="ios-settings-sharp" size={25} color="#fff"/>
                    </View>
                </TouchableNativeFeedback>
            )}
        </View>
    )
}

HeaderCustom.defaultProps = {
    back: true,
    variant: "primary",
    headerStyle: "",
    searchable: false,
    like: false,
    iconLike: false,
    iconShared: false,
    onSearch: () => console.log("hello word"),
    iconSetting: false,
    type: 'brewery'
}

export default HeaderCustom
