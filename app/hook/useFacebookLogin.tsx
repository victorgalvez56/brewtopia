import { useEffect, useState } from "react"
import * as Facebook from "expo-auth-session/providers/facebook"
import * as AuthSession from "expo-auth-session"

const { FACEBOOK_APP_ID } = require("../config/env")
const useFacebookLogin = () => {
  const [accessToken, setAccessToken] = useState(null)
  const [loading, setLoading] = useState(false)

  // const [requestFacebookAuth, responseFacebookAuth, promptFacebookAuthAsync] =
  //   Facebook.useAuthRequest({
  //     clientId: FACEBOOK_APP_ID,
  //     redirectUri: `fb${FACEBOOK_APP_ID}://authorize`,
  //     responseType: "token",
  //   })

  const [, responseFacebookAuth, prompt] = Facebook.useAuthRequest(
    {
      clientId: FACEBOOK_APP_ID, // Must be defined in JavaScript, won't use app.json values.
      redirectUri: AuthSession.makeRedirectUri({ useProxy: true }), // useProxy here…
    },
    { useProxy: true }, // …and also here
  )

  useEffect(() => {
    if (responseFacebookAuth?.type === "success") {
      setAccessToken(responseFacebookAuth.authentication.accessToken)
      getUserData(responseFacebookAuth.authentication.accessToken)
    }
  }, [responseFacebookAuth])

  const getUserData = async (token: string) => {
    try {
      setLoading(true)
      const responseId = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&locale=en_US&fields=name,email,first_name,last_name`,
      )
      const res = await responseId.json()
      return res
    } catch (error) {
      __DEV__ && console.log(error.message())
    } finally {
      setLoading(false)
    }
  }
  return {
    prompt,
    getUserData,
    accessToken,
    loading,
  }
}

export default useFacebookLogin
