import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ApiModel } from "../api/api"
import { AuthModel } from "../auth/auth"
import { BeerStoreModel } from "../beer-store/beer-store"
import { BeerStyleStoreModel } from "../beer-style-store/beer-style-store"
import { BreweryStoreModel } from "../brewery-store/brewery-store"
import { EmailModel } from "../email-store/email-store"
import { PubStoreModel } from "../pub-store/pub-store"
import { UserModel } from "../user/user"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore")
.props({
  apiStore: types.optional(ApiModel, {} as any),
  userStore:types.optional(UserModel,{} as any),
  authStore:types.optional(AuthModel, {} as any),
  beerStore: types.optional(BeerStoreModel, {} as any),
  breweryStore:types.optional(BreweryStoreModel,{} as any),
  pubStore:types.optional(PubStoreModel,{} as any),
  beerStylesStore:types.optional(BeerStyleStoreModel,{} as any),
  emailStore:types.optional(EmailModel,{} as any)
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
