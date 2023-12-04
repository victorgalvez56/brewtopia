import { getRoot, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { AuthModeFacebook } from "../../utils/app-values"
import {
  AuthApi,
  forgotPasswordData,
  GetRegisterResult,
  loginData,
  registerData,
} from "../../services/api"
import { AUTH_TOKEN, remove, saveString } from "../../utils/storage"
import { RootStore } from "../root-store/root-store"

/**
 * Model description here for TypeScript hints.
 */
export const AuthModel = types
  .model("Auth")
  .props({
    access_token: types.optional(types.string, ""),
    expires_at: types.optional(types.string, ""),
    token_type: types.optional(types.string, ""),
  })
  .actions((self) => ({
    save: (modelSnapshot: AuthSnapshotIn) => {
      self.access_token = modelSnapshot.access_token
      self.expires_at = modelSnapshot.expires_at
      self.token_type = modelSnapshot.token_type
    },
    reset: () => {
      self.access_token = ""
      self.token_type = ""
      self.expires_at = ""
    },
  }))
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    afterCreate: async () => {
      try {
        const root: RootStore = getRoot(self)
        const api = new AuthApi()
        const result = await api.validUserService()
        if (result.kind === "unauthorized") {
          //reseteando el store
          self.reset()
          //Eliminando el Token
          await remove(AUTH_TOKEN)
          // Activando el modo invitado
          root.userStore.setGuest(true)
        }
      } catch ({ message }) {
        __DEV__ && console.log(message)
      }
    },
    signIn: async (data: loginData) => {
      try {
        const root: RootStore = getRoot(self)
        const api = new AuthApi()
        const result = await api.loginService(data)
        if (result.kind === "ok") {
          //Guardando los datos del token
          self.save(result.data)
          // Guardando el token para futuras peticiones
          await saveString(AUTH_TOKEN, result.data.token_type + " " + result.data.access_token)
          // Desactivando el modo invitado
          root.userStore.setGuest(false)
          root.userStore.setShowIntro(false)
          return true
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
      return false
    },
    signInFacebook: async (id: string, email: string) => {
      try {
        const root: RootStore = getRoot(self)
        const api = new AuthApi()
        const result = await api.loginService({
          email,
          auth_mode: AuthModeFacebook,
          auth_data: id,
        })
        if (result.kind === "ok") {
          //Guardando los datos del token
          self.save(result.data)
          // Guardando el token para futuras peticiones
          await saveString(AUTH_TOKEN, result.data.token_type + " " + result.data.access_token)
          // Desactivando el modo invitado
          root.userStore.setGuest(false)
          return true
        }
      } catch ({ message }) {
        __DEV__ && console.log(message)
      }
      return false
    },
    signUpFacebook: async (id: string, email: string, name: string, lastname: string) => {
      try {
        const root: RootStore = getRoot(self)
        const api = new AuthApi()
        const result = await api.getSocialRegisterService(email, name, lastname, id)
        if (result.kind === "ok") {
          if (result.register?.code == "100") {
            return false
          }
          self.save(result.register)
          root.userStore.setGuest(false)
          return true
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
      return false
    },
    signUp: async (data: registerData): Promise<GetRegisterResult> => {
      try {
        const root: RootStore = getRoot(self)
        const api = new AuthApi()
        const result: GetRegisterResult = await api.registerService(data)
        if (result.kind === "ok") {
          self.save(result.register)
          root.userStore.setGuest(false)
          return result
        } else if (result.kind === "bad-data") {
          return { kind: "bad-data", message: result.message }
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
      return { kind: "rejected" }
    },
    forgotPassword: async (data: forgotPasswordData) => {
      try {
        const root: RootStore = getRoot(self)
        const api = new AuthApi()
        const result = await api.forgotPasswordService(data.email)
        if (result.kind === "ok") {
          root.userStore.getUser()
          return result.forgot
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
      return false
    },
    signOut: async () => {
      try {
        const root: RootStore = getRoot(self)
        //reseteando el store
        self.reset()
        //Eliminando el Token
        await remove(AUTH_TOKEN)
        // Activando el modo invitado
        root.userStore.setGuest(true)
        const api = new AuthApi()
        await api.logoutService()
      } catch ({ message }) {
        __DEV__ && console.log(message)
      } finally {
        return true
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Auth extends Instance<typeof AuthModel> {}
export interface AuthSnapshotOut extends SnapshotOut<typeof AuthModel> {}
export interface AuthSnapshotIn extends SnapshotIn<typeof AuthModel> {}
export const createAuthDefaultModel = () => types.optional(AuthModel, {})
