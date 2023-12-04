import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const BeerRatingModel = types
  .model("BeerRating")
  .props({
    beer_id: types.maybeNull(types.number),
    rating: types.maybeNull(types.number),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface BeerRating extends Instance<typeof BeerRatingModel> {}
export interface BeerRatingSnapshotOut extends SnapshotOut<typeof BeerRatingModel> {}
export interface BeerRatingSnapshotIn extends SnapshotIn<typeof BeerRatingModel> {}
export const createBeerRatingDefaultModel = () => types.optional(BeerRatingModel, {})
