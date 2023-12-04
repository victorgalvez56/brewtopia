import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { PubTypeModel } from "../pub-type/pub-type"

/**
 * Model description here for TypeScript hints.
 */
export const PubModel = types
  .model("Pub")
  .props({
    id: types.maybe(types.number),
    name: types.maybeNull(types.string),
    detail: types.maybeNull(types.string),
    website: types.maybeNull(types.string),
    phone: types.maybeNull(types.string),
    address: types.maybeNull(types.string),
    postal_code: types.maybeNull(types.string),
    founded_at: types.maybeNull(types.string),
    image_path: types.maybeNull(types.string),
    location_lat: types.maybeNull(types.number),
    location_lng: types.maybeNull(types.number),
    pub_uuid: types.maybeNull(types.string),
    display_order: types.maybe(types.number),
    is_highlight: types.maybe(types.number),
    created_at: types.maybeNull(types.string),
    updated_at: types.maybeNull(types.string),
    deleted_at: types.maybeNull(types.string),
    show: types.maybe(types.number),
    published: types.maybe(types.boolean) || types.maybe(types.number),
    deleted: types.maybe(types.boolean) || types.maybe(types.number),
    pub_types: types.optional(types.array(PubTypeModel), []),
    initial_rating: types.maybe(types.number),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Pub extends Instance<typeof PubModel> {}
export interface PubSnapshotOut extends SnapshotOut<typeof PubModel> {}
export interface PubSnapshotIn extends SnapshotIn<typeof PubModel> {}
export const createPubDefaultModel = () => types.optional(PubModel, {})
