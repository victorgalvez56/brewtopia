import { cast, getRoot, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { BeerStylesApi } from "../../services/api/beer-styles-api"
import { BeerStyleModel, BeerStyleSnapshotOut, BeerStyle } from "../beer-style/beer-style"
import { RootStore } from "../root-store/root-store"

/**
 * Model description here for TypeScript hints.
 */
export const BeerStyleStoreModel = types
  .model("BeerStyleStore")
  .props({
    beerStyles: types.optional(types.array(BeerStyleModel), []),
    beerStylesSelected: types.optional(types.array(types.number), []),
  })
  .views((self) => ({
    get beerStylesList() {
      return self.beerStyles.map((beerstyle: BeerStyle) => {
        return {
          id: beerstyle.id,
          name: beerstyle.name,
        }
      })
    },
    get beerStylesSelectedList() {
      return self.beerStylesSelected.slice()
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    save: (beerStyles: BeerStyleSnapshotOut[]) => {
      self.beerStyles = cast(beerStyles)
    },
  }))
  .actions((self) => ({
    getBeerStyles: async () => {
      try {
        const api = new BeerStylesApi()
        const result = await api.getBeerStyles()
        if (result.kind === "ok") {
          self.save(result.beer_styles)
          return true
        }
      } catch (error) {
        __DEV__ && console.log(error)
      } finally {
        return false
      }
    },
    onSelectedStyle: async (ids: number[], search: string) => {
      self.beerStylesSelected = cast(ids)
      const root: RootStore = getRoot(self)
      await root.beerStore.getSearchBeers(search)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface BeerStyleStore extends Instance<typeof BeerStyleStoreModel> {}
export interface BeerStyleStoreSnapshotOut extends SnapshotOut<typeof BeerStyleStoreModel> {}
export interface BeerStyleStoreSnapshotIn extends SnapshotIn<typeof BeerStyleStoreModel> {}
export const createBeerStyleStoreDefaultModel = () => types.optional(BeerStyleStoreModel, {})
