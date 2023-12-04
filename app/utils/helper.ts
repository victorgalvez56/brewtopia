import { Linking, Platform } from "react-native"
import { AUTH_TOKEN, loadString } from "./storage"

export const limitBox = (text: string, limit: number) => {
  if (text !== undefined && text !== null) {
    if (text.length > limit) {
      return text.substring(0, limit - 3) + "..."
    } else {
      return text
    }
  } else {
    return text
  }
}

export const headers = async () => {
  const token = await loadString(AUTH_TOKEN)
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

export const openLinkMaps = (lat: number, lng: number, label_info: string) => {
  const scheme = Platform.select({ ios: "maps:0,0?q=", android: "geo:0,0?q=" })
  const latLng = `${lat},${lng}`
  const label = `${label_info}`
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  })
  Linking.openURL(url)
}
