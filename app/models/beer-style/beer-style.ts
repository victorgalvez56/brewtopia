import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { number } from "yup"

/**
 * Model description here for TypeScript hints.
 */
export const BeerStyleModel = types
  .model("BeerStyle")
  .props({
    id: types.maybe(types.number),
    name: types.maybeNull(types.string),
    name_limit: types.maybeNull(types.string),
    description: types.maybeNull(types.string),
    image_path: types.maybeNull(types.string),
    short_name: types.maybeNull(types.string),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface BeerStyle extends Instance<typeof BeerStyleModel> {}
export interface BeerStyleSnapshotOut extends SnapshotOut<typeof BeerStyleModel> {}
export interface BeerStyleSnapshotIn extends SnapshotIn<typeof BeerStyleModel> {}
export const createBeerStyleDefaultModel = () => types.optional(BeerStyleModel, {})
