/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { Text, useColorScheme, View } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {
  IntroScreen,
  BecomeScreen,
  RegisterScreen,
  LoginScreen,
  ExploreScreen,
  SearchScreen,
  MapScreen,
  ProfileScreen,
  CameraScreen,
  ForgotPasswordScreen,
  CategoryListSearchScreen,
  FilterScreen,
  SettingsScreen,
  FeedbackScreen,
  ContactUsScreen,
  ProfileEditScreen,
  LoginDetailsScreen,
  FavoritesScreen,
  BeerDetailsScreen,
  PubDetailsScreen,
  BrewerieDetailsScreen,
  BeerSearchListScreen,
  PreviewScanScreen,
  MakeMostScreen,
  BeerProfileScreen,
  WelcomeScreen,
  BeerViewAllScreen,
  PubViewAllScreen,
  BreweryViewAllScreen,
} from "../screens"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"
import Toast from "react-native-toast-message"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import tw from "../utils/tailwind"
import ExploreIcon from "../icons/ExploreIcon"
import Ionicons from "@expo/vector-icons/Ionicons"
import UserIcon from "../icons/UserIcon"
import CameraIcon from "../icons/CameraIcon"
import SearchIcon from "../icons/SearchIcon"
import { AvatarEditScreen } from "../screens/profile-edit/avatar-edit-screen"
import { PrivacyScreen } from "../screens/privacy/privacy-screen"
import { FaqScreen } from "../screens/faq/faq-screen"
import { TermsConditions } from "../screens/terms-conditions/terms-conditions-screen"
import { AboutUsScreen } from "../screens/about-us/about-us-screen"
import { BeerProfileRevealScreen } from "../screens/beer-profile-reveal/beer-profile-reveal-screen"
import { FailScanScreen } from "../screens/fail-scan/fail-scan-screen"
import { BeerCreateScreen } from "../screens/beer-create/beer-create-screen"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type NavigatorParamList = {
  welcome: undefined
  intro: undefined
  become: undefined
  register: undefined
  login: undefined
  forgotPassword: undefined
  explore: undefined
  categoryListSearch: undefined
  filter: undefined
  profileEdit: undefined
  avatarEdit: undefined
  loginDetails: undefined
  settings: undefined
  favorites: undefined
  feedback: undefined
  beerDetails: undefined
  brewerieDetails: undefined
  breweryViewAll: undefined
  pubDetails: undefined
  pubViewAll: undefined
  beerSearchList: undefined
  contactUs: undefined
  dashboard: undefined
  demo: undefined
  demoList: undefined
  camera: undefined
  previewScan: undefined
  failScan: undefined
  makeMost: undefined
  map: undefined
  profile: undefined
  beerProfile: undefined
  beerProfileReveal: undefined
  beerViewAll: undefined
  privacy: undefined
  faq: undefined
  termsConditions: undefined
  aboutUs: undefined
  search: undefined
  beerCreate: undefined

  // 🔥 Your screens go here
}

export type TabScreenParamList = {
  explore_home: undefined
  search: undefined
  map: undefined
  profile: undefined
  camera_home: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()

const Tab = createBottomTabNavigator<TabScreenParamList>()

const ExploreStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="explore"
    >
      <Stack.Screen name="explore" component={ExploreScreen} />
    </Stack.Navigator>
  )
}

const DashboardStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="explore_home"
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: false,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          borderTopColor: "#fff",
          backgroundColor: "#ffff",
          elevation: 0,
          height: 80,
        },
      })}
    >
      <Tab.Screen
        name="explore_home"
        component={ExploreStack}
        options={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <View style={tw`items-center justify-center rounded-full w-18 h-18`}>
              <ExploreIcon focused={focused} />
              <Text
                style={tw`mt-1 text-xs ${
                  focused ? "text-brewtopia-500" : "text-brewtopiagray-700"
                }`}
              >
                Explore
              </Text>
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={tw`items-center justify-center rounded-full w-18 h-18`}>
              <SearchIcon focused={focused} />
              <Text
                style={tw`mt-1 text-xs   ${
                  focused ? "text-brewtopia-500" : "text-brewtopiagray-700"
                }`}
              >
                Search
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="camera_home"
        component={CameraScreen}
        options={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <View style={tw`items-center justify-center w-20 h-20`}>
              <CameraIcon />
            </View>
          ),
          tabBarStyle: ((route) => {
            if (route.name === "camera_home") {
              return { display: "none" }
            }
            return {
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              borderTopColor: "#fff",
              backgroundColor: "#ffff",
              elevation: 0,
              height: 80,
            }
          })(route),
        })}
      />
      <Tab.Screen
        name="map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={tw`items-center justify-center rounded-full w-18 h-18`}>
              <Ionicons name="ios-map" size={25} color={focused ? "#FF7558" : "#49484D"} />
              <Text
                style={tw`mt-1 text-xs   ${
                  focused ? "text-brewtopia-500" : "text-brewtopiagray-700"
                }`}
              >
                Map
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={tw`items-center justify-center rounded-full w-18 h-18`}>
              <UserIcon focused={focused} />
              <Text
                style={tw`mt-1 text-xs ${
                  focused ? "text-brewtopia-500" : "text-brewtopiagray-700"
                }`}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="welcome"
    >
      <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen name="intro" component={IntroScreen} />
      <Stack.Screen name="become" component={BecomeScreen} />
      <Stack.Screen name="makeMost" component={MakeMostScreen} />
      <Stack.Screen name="register" component={RegisterScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="forgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="filter" component={FilterScreen} />
      <Stack.Screen name="settings" component={SettingsScreen} />
      <Stack.Screen name="favorites" component={FavoritesScreen} />
      <Stack.Screen name="profileEdit" component={ProfileEditScreen} />
      <Stack.Screen name="avatarEdit" component={AvatarEditScreen} />
      <Stack.Screen name="loginDetails" component={LoginDetailsScreen} />
      <Stack.Screen name="feedback" component={FeedbackScreen} />
      <Stack.Screen name="contactUs" component={ContactUsScreen} />
      <Stack.Screen name="privacy" component={PrivacyScreen} />
      <Stack.Screen name="faq" component={FaqScreen} />
      <Stack.Screen name="termsConditions" component={TermsConditions} />
      <Stack.Screen name="aboutUs" component={AboutUsScreen} />
      <Stack.Screen name="beerDetails" component={BeerDetailsScreen} />
      <Stack.Screen name="pubDetails" component={PubDetailsScreen} />
      <Stack.Screen name="brewerieDetails" component={BrewerieDetailsScreen} />
      <Stack.Screen name="beerSearchList" component={BeerSearchListScreen} />
      <Stack.Screen name="beerCreate" component={BeerCreateScreen} />
      <Stack.Screen name="previewScan" component={PreviewScanScreen} />
      <Stack.Screen name="failScan" component={FailScanScreen} />
      <Stack.Screen name="categoryListSearch" component={CategoryListSearchScreen} />
      <Stack.Screen name="beerProfile" component={BeerProfileScreen} />
      <Stack.Screen name="beerProfileReveal" component={BeerProfileRevealScreen} />
      <Stack.Screen name="beerViewAll" component={BeerViewAllScreen} />
      <Stack.Screen name="pubViewAll" component={PubViewAllScreen} />
      <Stack.Screen name="breweryViewAll" component={BreweryViewAllScreen} />
      <Stack.Screen name="dashboard" component={DashboardStack} />
      {/** 🔥 Your screens go here */}
    </Stack.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()
  useBackButtonHandler(canExit)

  return (
    <>
      <NavigationContainer
        ref={navigationRef}
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        {...props}
      >
        <AppStack />
      </NavigationContainer>
      <Toast position="bottom" bottomOffset={50} visibilityTime={3000} />
    </>
  )
}

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["intro", "become", "explore"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
