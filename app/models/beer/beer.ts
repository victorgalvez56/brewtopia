import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { BreweryModel } from "../brewery/brewery"

/**
 * Model description here for TypeScript hints.
 */
export const BeerModel = types
  .model("Beer")
  .props({
    id: types.maybe(types.number),
    uid: types.maybeNull(types.string),
    name: types.maybeNull(types.string),
    name_display: types.maybeNull(types.string),
    description: types.maybeNull(types.string),
    image_path: types.maybeNull(types.string),
    content_aware_path: types.maybeNull(types.string),
    abv: types.maybeNull(types.string),
    ibu: types.maybeNull(types.string),
    serving_temperature: types.maybeNull(types.number),
    serving_temperature_display: types.maybeNull(types.number),
    is_organic: types.maybeNull(types.boolean),
    is_retired: types.maybeNull(types.boolean),
    hops: types.maybeNull(types.string),
    initial_rating: types.maybeNull(types.number),
    lng: types.maybeNull(types.string),
    lat: types.maybeNull(types.string),
    strength: types.maybeNull(types.number),
    tags: types.maybeNull(types.string),
    website: types.maybeNull(types.string),
    match1: types.maybeNull(types.string),
    match2: types.maybeNull(types.string),
    recently_added: types.maybeNull(types.boolean),
    beer_style_id: types.maybeNull(types.number),
    brewery_id: types.maybeNull(types.number),
    country_id: types.maybeNull(types.number),
    prev_id: types.maybeNull(types.string),
    created_at: types.maybeNull(types.string),
    updated_at: types.maybeNull(types.string),
    deleted_at: types.maybeNull(types.string),
    published: types.maybe(types.number),
    brewery: types.maybeNull(BreweryModel),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Beer extends Instance<typeof BeerModel> {}
export interface BeerSnapshotOut extends SnapshotOut<typeof BeerModel> {}
export interface BeerSnapshotIn extends SnapshotIn<typeof BeerModel> {}
export const createBeerDefaultModel = () => types.optional(BeerModel, {})
