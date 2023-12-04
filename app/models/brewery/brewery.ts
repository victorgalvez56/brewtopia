import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const BreweryModel = types
  .model("Brewery")
  .props({
    id: types.maybeNull(types.number),
    beers: types.maybeNull(types.string),
    description: types.maybeNull(types.string),
    founded: types.maybeNull(types.string),
    lng: types.maybeNull(types.string),
    lat: types.maybeNull(types.string),
    name: types.maybeNull(types.string),
    website: types.maybeNull(types.string),
    website_url: types.maybeNull(types.string),
    phone: types.maybeNull(types.string),
    created_at: types.maybeNull(types.string),
    updated_at: types.maybeNull(types.string),
    deleted_at: types.maybeNull(types.string),
    address: types.maybeNull(types.string),
    bid: types.maybe(types.string),
    image_path: types.maybeNull(types.string),
    published: types.maybe(types.number),
    deleted: types.maybe(types.number),
    initial_rating: types.maybe(types.number),
    like: types.maybeNull(types.boolean),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Brewery extends Instance<typeof BreweryModel> {
}

export interface BrewerySnapshotOut extends SnapshotOut<typeof BreweryModel> {
}

export interface BrewerySnapshotIn extends SnapshotIn<typeof BreweryModel> {
}

export const createBreweryDefaultModel = () => types.optional(BreweryModel, {})
