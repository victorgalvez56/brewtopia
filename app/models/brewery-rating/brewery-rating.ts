import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const BreweryRatingModel = types
  .model("BreweryRating")
  .props({
    rating: types.maybeNull(types.number),
    brewery_id: types.maybeNull(types.number),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface BreweryRating extends Instance<typeof BreweryRatingModel> {}
export interface BreweryRatingSnapshotOut extends SnapshotOut<typeof BreweryRatingModel> {}
export interface BreweryRatingSnapshotIn extends SnapshotIn<typeof BreweryRatingModel> {}
export const createBreweryRatingDefaultModel = () => types.optional(BreweryRatingModel, {})
