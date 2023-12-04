import { cast, getRoot, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { updateLoginDetails, updateUser, UserApi } from "../../services/api/user-api"
import { AchievementModel, AchievementSnapshotOut, Achievement } from "../achievement/achievement"
import { withEnvironment } from "../extensions/with-environment"
import { RootStore } from "../root-store/root-store"

/**
 * Model description here for TypeScript hints.
 */
export const UserModel = types
  .model("User")
  .props({
    ageUser: types.optional(types.Date, new Date()),
    showIntro: types.optional(types.boolean, true),
    isGuest: types.optional(types.boolean, false),
    id: types.maybe(types.number),
    name: types.maybe(types.string),
    lastname: types.maybe(types.string),
    email: types.maybe(types.string),
    avatar: types.maybe(types.string),
    mobile_number: types.maybeNull(types.string),
    location: types.maybe(types.string),
    email_verified_at: types.maybe(types.string),
    role_id: types.maybeNull(types.number),
    image_path: types.maybe(types.string),
    bid: types.maybeNull(types.string),
    beer_profile_id: types.maybeNull(types.number),
    beer_profile_name: types.maybeNull(types.string),
    beer_profile_detail: types.maybeNull(types.string),
    beer_profile_pick: types.maybeNull(types.number),
    archievements: types.optional(types.array(AchievementModel), []),
  })
  .extend(withEnvironment)
  .views((self) => ({
    get archievementsList() {
      return self.archievements.map((archivement: Achievement) => {
        return {
          id: archivement.id,
          icon_path: archivement.icon_path,
        }
      })
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    save: (modelSnapshot: UserSnapshotIn) => {
      self.id = modelSnapshot.id
      self.name = modelSnapshot.name
      self.lastname = modelSnapshot.lastname
      self.email = modelSnapshot.email
      self.avatar = modelSnapshot.avatar
      self.mobile_number = modelSnapshot.mobile_number === null ? "" : modelSnapshot.mobile_number
      self.location = modelSnapshot.location === null ? "" : modelSnapshot.location
      self.email_verified_at = modelSnapshot.email_verified_at
      self.role_id = modelSnapshot.role_id
      self.image_path = modelSnapshot.image_path
      self.bid = modelSnapshot.bid
      self.beer_profile_id = modelSnapshot.beer_profile_id
      self.beer_profile_name = modelSnapshot.beer_profile_name
      self.beer_profile_detail = modelSnapshot.beer_profile_detail
      self.beer_profile_pick = modelSnapshot.beer_profile_pick
    },
    saveAchievements: (Achievements: AchievementSnapshotOut[]) => {
      self.archievements = cast(Achievements)
    },
  }))
  .actions((self) => ({
    afterCreate: async () => {
      try {
        const api = new UserApi()
        const result = await api.getAchievements(false)
        if (result.kind === "ok") {
          self.saveAchievements(result.achievements)
          return true
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
      return false
    },
    getAchievemest: async (v: boolean) => {
      try {
        const api = new UserApi()
        const result = await api.getAchievements(v)
        if (result.kind === "ok") {
          self.saveAchievements(result.achievements)
          return true
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
      return false
    },
    introCompleted: (date: Date) => {
      const now = new Date()
      const birthdate = new Date(date)
      const age = now.getFullYear() - birthdate.getFullYear()

      if (age > 18) {
        self.showIntro = cast(false)
        self.ageUser = date
        return true
      }
      return false
    },
    setShowIntro: (v: boolean) => {
      self.showIntro = v
    },
    setGuest: (v: boolean) => {
      self.isGuest = v
    },
    getUser: async () => {
      try {
        const api = new UserApi()
        const result = await api.getUserService()

        if (result.kind === "ok") {
          self.save(result.user)
          return true
        }
      } catch (error) {
        __DEV__ && console.log(error)
      } finally {
        return false
      }
    },
    updateProfile: async (data: updateUser) => {
      try {
        const root: RootStore = getRoot(self)
        const api = new UserApi()
        const result = await api.updateProfile(data)
        if (result.kind === "ok") {
          root.userStore.getUser()
          return result.result
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
      return false
    },
    updateLoginDetails: async (data: updateLoginDetails) => {
      try {
        const root: RootStore = getRoot(self)
        const api = new UserApi()
        const result = await api.updateLoginDetails(data)
        if (result.kind === "ok") {
          root.userStore.getUser()
          return result.result
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
      return false
    },
    uploadUserPicture: async (new_avatar: string) => {
      try {
        const root: RootStore = getRoot(self)
        const api = new UserApi()
        const result = await api.uploadAvatar(new_avatar)
        if (result.kind === "ok") {
          root.userStore.getUser()
          return true
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
      return false
    },
    updateProfileBeer: async (pick: string) => {
      try {
        const root: RootStore = getRoot(self)
        const api = new UserApi()
        const result = await api.updateBeerProfileService(pick)
        if (result.kind === "ok") {
          root.userStore.getUser()
          return true
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }

      return false
    },
    updateAchievements: async (id: string) => {
      try {
        const api = new UserApi()
        const result = await api.updateAchievementsService(id)
        if (result.kind === "ok") {
          return true
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }

      return false
    },
    resetProfileBeer: async () => {
      try {
        const root: RootStore = getRoot(self)
        const api = new UserApi()
        const result = await api.resetBeerProfileService()
        if (result.kind === "ok") {
          root.userStore.getUser()
          return true
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
      return false
    },
    skipeProfileBeer: async () => {
      try {
        const root: RootStore = getRoot(self)
        const api = new UserApi()
        const result = await api.skipBeerProfileService()
        if (result.kind === "ok") {
          root.userStore.getUser()
          return true
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
      return false
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface User extends Instance<typeof UserModel> {}
export interface UserSnapshotOut extends SnapshotOut<typeof UserModel> {}
export interface UserSnapshotIn extends SnapshotIn<typeof UserModel> {}
export const createUserDefaultModel = () => types.optional(UserModel, {})
