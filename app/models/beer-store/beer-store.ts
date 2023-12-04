import { cast, getRoot, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import reactotron from "reactotron-react-native"
import { BeerApi } from "../../services/api/beer-api"
import { BeerRatingModel, BeerRatingSnapshotOut } from "../beer-rating/beer-rating"
import { Beer, BeerModel, BeerSnapshotOut } from "../beer/beer"
import { RootStore } from "../root-store/root-store"

/**
 * Model description here for TypeScript hints.
 */
export const BeerStoreModel = types
  .model("BeerStore")
  .props({
    beers: types.optional(types.array(BeerModel), []),
    beersSearch: types.optional(types.array(BeerModel), []),
    beersFavourites: types.optional(types.array(BeerModel), []),
    beersSearchViewAll: types.optional(types.array(BeerModel), []),
    beersRating: types.optional(types.array(BeerRatingModel), []),
    beersTrending: types.optional(types.array(BeerModel), []),
    beersTopRated: types.optional(types.array(BeerModel), []),
  })
  .views((self) => ({
    get beersLike() {
      /* const recentlyAdd = self.beers.filter((beer: Beer) => {
        return beer.recently_added
      }) */
      return self.beers.map((beer: Beer) => {
        const like = self.beersFavourites.findIndex((item) => item.id === beer.id)

        return {
          id: beer.id,
          image: beer.image_path,
          title: beer.name,
          local: beer.brewery ? beer.brewery.name : "",
          brewery: beer.brewery ? beer.brewery : null,
          like: like !== -1,
          initial_rating: beer.initial_rating,
          strength: beer.strength,
          description: beer.description,
          location: {
            latitude: beer.brewery ? beer.brewery.lat : 0,
            longitude: beer.brewery ? beer.brewery.lng : 0,
          },
          abv: beer.abv,
          ibu: beer.ibu,
          tags: beer.tags !== null ? beer.tags.split(",") : [],
        }
      })
    },
    get beersSearchList() {
      return self.beersSearch.map((beer: Beer) => {
        const like = self.beersFavourites.findIndex((item) => item.id === beer.id)

        return {
          id: beer.id,
          image: beer.image_path,
          title: beer.name,
          local: beer.brewery ? beer.brewery.name : "",
          brewery: beer.brewery ? beer.brewery : null,
          like: like !== -1,
          initial_rating: beer.initial_rating,
          strength: beer.strength,
          description: beer.description,
          location: {
            latitude: beer.brewery ? beer.brewery.lat : 0,
            longitude: beer.brewery ? beer.brewery.lng : 0,
          },
          abv: beer.abv,
          ibu: beer.ibu,
          tags: beer.tags !== null ? beer.tags.split(",") : [],
        }
      })
    },
    get beersFavouritesList() {
      return self.beersFavourites.map((beer: Beer) => {
        return {
          id: beer.id,
          image: beer.image_path,
          title: beer.name,
          local: beer.brewery ? beer.brewery.name : "",
          brewery: beer.brewery ? beer.brewery : null,
          like: true,
          initial_rating: beer.initial_rating,
          strength: beer.strength,
          description: beer.description,
          location: {
            latitude: beer.brewery ? beer.brewery.lat : 0,
            longitude: beer.brewery ? beer.brewery.lng : 0,
          },
          abv: beer.abv,
          ibu: beer.ibu,
          tags: beer.tags !== null ? beer.tags.split(",") : [],
        }
      })
    },
    get beersSearchViewAllList() {
      /* const recentlyAdd = self.beersSearchViewAll.filter((beer: Beer) => {
        return beer.recently_added
      }) */
      return self.beersSearchViewAll.map((beer: Beer) => {
        const like = self.beersFavourites.findIndex((item) => item.id === beer.id)

        return {
          id: beer.id,
          image: beer.image_path,
          title: beer.name,
          local: beer.brewery ? beer.brewery.name : "",
          brewery: beer.brewery ? beer.brewery : null,
          like: like !== -1,
          initial_rating: beer.initial_rating,
          strength: beer.strength,
          description: beer.description,
          location: {
            latitude: beer.brewery ? beer.brewery.lat : 0,
            longitude: beer.brewery ? beer.brewery.lng : 0,
          },
          abv: beer.abv,
          ibu: beer.ibu,
          tags: beer.tags !== null ? beer.tags.split(",") : [],
        }
      })
    },
    get beersTredingList() {
      return self.beersTrending.map((beer: Beer) => {
        const like = self.beersFavourites.findIndex((item) => item.id === beer.id)

        return {
          id: beer.id,
          image: beer.image_path,
          title: beer.name,
          local: beer.brewery ? beer.brewery.name : "",
          brewery: beer.brewery ? beer.brewery : null,
          like: like !== -1,
          initial_rating: beer.initial_rating,
          strength: beer.strength,
          description: beer.description,
          location: {
            latitude: beer.brewery ? beer.brewery.lat : 0,
            longitude: beer.brewery ? beer.brewery.lng : 0,
          },
          abv: beer.abv,
          ibu: beer.ibu,
          tags: beer.tags !== null ? beer.tags.split(",") : [],
        }
      })
    },
    get beersTopRateList() {
      return self.beersTopRated.map((beer: Beer) => {
        const like = self.beersFavourites.findIndex((item) => item.id === beer.id)

        return {
          id: beer.id,
          image: beer.image_path,
          title: beer.name,
          local: beer.brewery ? beer.brewery.name : "",
          brewery: beer.brewery ? beer.brewery : null,
          like: like !== -1,
          initial_rating: beer.initial_rating,
          strength: beer.strength,
          description: beer.description,
          location: {
            latitude: beer.brewery ? beer.brewery.lat : 0,
            longitude: beer.brewery ? beer.brewery.lng : 0,
          },
          abv: beer.abv,
          ibu: beer.ibu,
          tags: beer.tags !== null ? beer.tags.split(",") : [],
        }
      })
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    save: (beers: BeerSnapshotOut[]) => {
      self.beers = cast(beers)
    },
    saveSearch: (beers: BeerSnapshotOut[]) => {
      self.beersSearch = cast(beers)
    },
    saveBeersFavourites: (beers: BeerSnapshotOut[]) => {
      self.beersFavourites = cast(beers)
    },
    saveBeersTrending: (beers: BeerSnapshotOut[]) => {
      self.beersTrending = cast(beers)
    },
    saveBeersTopRated: (beers: BeerSnapshotOut[]) => {
      self.beersTopRated = cast(beers)
    },
    saveBeersSearchViewAll: (beers: BeerSnapshotOut[]) => {
      self.beersSearchViewAll = cast(beers)
    },
    saveBeerRating: (beerRating: BeerRatingSnapshotOut) => {
      const index = self.beersRating.findIndex((i) => i.beer_id === beerRating.beer_id)
      if (index !== -1) {
        self.beersRating.splice(index, 1)
      }
      self.beersRating.push(cast(beerRating))
    },
  }))
  .actions((self) => ({
    getBeers: async () => {
      try {
        const api = new BeerApi()
        const root: RootStore = getRoot(self)
        const result = await api.getBeersService()
        if (result.kind === "ok") {
          self.save(result.beers)
          self.saveBeersSearchViewAll(result.beers)
          await root.beerStore.getFavouritesBeers()
          return true
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
      return false
    },
    getBeersTrendingTop: async () => {
      try {
        const api = new BeerApi()
        const result = await api.getBeersTrendingService()
        if (result.kind === "ok") {
          self.saveBeersTrending(result.beers)
          return true
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
      return false
    },
    getBeersTopRated: async () => {
      try {
        const api = new BeerApi()
        const result = await api.getBeersTopRatedService()
        if (result.kind === "ok") {
          self.saveBeersTopRated(result.beers)
          return true
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
      return false
    },
    getSearchBeers: async (search: string) => {
      try {
        const api = new BeerApi()
        const root: RootStore = getRoot(self)
        const result = await api.getBeersSearchService(
          search,
          root.beerStylesStore.beerStylesSelectedList,
        )
        if (result.kind === "ok") {
          self.saveSearch(result.beers)
          return true
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
      return false
    },
    getSearchBeersViewAll: async (search: string, isTrending = false, isTopRated = false) => {
      try {
        const api = new BeerApi()
        const root: RootStore = getRoot(self)
        const result = await api.getBeersSearchService(
          search,
          root.beerStylesStore.beerStylesSelectedList,
        )
        if (result.kind === "ok") {
          if (isTopRated) {
            self.saveBeersTopRated(result.beers)
          } else if (isTrending) {
            self.saveBeersTrending(result.beers)
          } else {
            self.saveBeersSearchViewAll(result.beers)
          }
          return true
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
      return false
    },
    getFavouritesBeers: async () => {
      try {
        const api = new BeerApi()
        const result = await api.getBeerFavouritesService()
        if (result.kind === "ok") {
          self.saveBeersFavourites(result.beers)
          return true
        }
      } catch (error) {
        __DEV__ && console.log(error)
      } finally {
        return false
      }
    },
    setAddFavouriteBeer: async (beer: number) => {
      try {
        const api = new BeerApi()
        const root: RootStore = getRoot(self)
        const result = await api.addBeerFavouriteService(beer)
        if (result.kind === "ok") {
          await root.beerStore.getFavouritesBeers()
        } else {
          return false
        }
      } catch (error) {
        __DEV__ && console.log(error)
        return false
      } finally {
        return true
      }
    },
    setRemoveFavouriteBeer: async (beer: number) => {
      try {
        const api = new BeerApi()
        const root: RootStore = getRoot(self)
        const result = await api.removeBeerFavouriteService(beer)
        if (result.kind === "ok") {
          await root.beerStore.getFavouritesBeers()
        } else {
          return false
        }
      } catch (error) {
        __DEV__ && console.log(error)
        return false
      } finally {
        return true
      }
    },
    getPredictions: async (image: string) => {
      try {
        // applySnapshot(self.beerPrediction, {}) //limpiando la prediction
        const api = new BeerApi()
        const res = await api.getPredictions(`data:image/png;base64,${image}`)

        if (res.kind === "ok") {
          if (res.result?.data?.beer) {
            const beerPrediction = res.result?.data?.beer
            const like = self.beersFavourites.findIndex((item) => item.id === beerPrediction?.id)
            return {
              id: beerPrediction.id,
              image: beerPrediction.image_path,
              title: beerPrediction.name,
              local: beerPrediction.brewery ? beerPrediction.brewery.name : "",
              brewery: beerPrediction.brewery ? beerPrediction.brewery : null,
              like: like !== -1,
              initial_rating: beerPrediction.initial_rating,
              strength: beerPrediction.strength,
              description: beerPrediction.description,
              location: {
                latitude: beerPrediction.brewery ? beerPrediction.brewery.lat : 0,
                longitude: beerPrediction.brewery ? beerPrediction.brewery.lng : 0,
              },
              abv: beerPrediction.abv,
              ibu: beerPrediction.ibu,
              tags: beerPrediction.tags !== null ? beerPrediction.tags.split(",") : [],
            }
          } else {
            return null
          }
        } else {
          return null
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
      return null // retornando null si no lo encuentra
    },
    getUploadBeer: async (
      name: string,
      brewery_name: string,
      image: string,
      abv: string,
      beer_style_id: string,
    ) => {
      try {
        const api = new BeerApi()
        const res = await api.getBeerUpload(
          name,
          brewery_name,
          `data:image/png;base64,${image}`,
          abv,
          beer_style_id,
        )
        if (res.kind === "ok") {
          return true
        } else {
          return false
        }
      } catch (error) {
        __DEV__ && console.log(error)
        return false
      }
    },
    setAddBeerRating: async (beer: string, rating: number) => {
      try {
        const api = new BeerApi()
        const result = await api.addBeerRating(beer, rating)
        if (result.kind === "ok") {
          const data = {
            rating,
            beer_id: parseInt(beer, 10),
          }
          self.saveBeerRating(data)
          return true
        } else {
          return false
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }

      return false
    },
    getBeerSimilar: async (beer_id: number) => {
      try {
        const api = new BeerApi()
        const result = await api.getBeersSimilar(beer_id)
        if (result.kind === "ok") {
          return result.beers.map((beer: Beer) => {
            const like = self.beersFavourites.findIndex((item) => item.id === beer.id)

            return {
              id: beer.id,
              image: beer.image_path,
              title: beer.name,
              local: beer.brewery ? beer.brewery.name : "",
              brewery: beer.brewery ? beer.brewery : null,
              like: like !== -1,
              initial_rating: beer.initial_rating,
              strength: beer.strength,
              description: beer.description,
              location: {
                latitude: beer.brewery ? beer.brewery.lat : 0,
                longitude: beer.brewery ? beer.brewery.lng : 0,
              },
              abv: beer.abv,
              ibu: beer.ibu,
              tags: beer.tags !== null ? beer.tags.split(",") : [],
            }
          })
        } else {
          return null
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }

      return null
    },
    getBeerDetail: async (beer_id: number) => {
      try {
        const api = new BeerApi()
        const result = await api.getBeer(beer_id)
        if (result.kind === "ok") {
          return result.beer
        } else {
          return null
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }

      return null
    },

    getBeersByBrewery: async (breweryId: number) => {
      try {
        const api = new BeerApi()
        const result = await api.getBeersByBrewery(breweryId)
        if (result.kind === "ok") {
          return result.beers.map((beer: Beer) => {
            const like = self.beersFavourites.findIndex((item) => item.id === beer.id)

            return {
              id: beer.id,
              image: beer.image_path,
              title: beer.name,
              local: beer.brewery ? beer.brewery.name : "",
              brewery: beer.brewery ? beer.brewery : null,
              like: like !== -1,
              initial_rating: beer.initial_rating,
              description: beer.description,
              location: {
                latitude: beer.brewery ? beer.brewery.lat : 0,
                longitude: beer.brewery ? beer.brewery.lng : 0,
              },
              abv: beer.abv ?? 0,
              ibu: beer.ibu ?? 0,
              tags: beer.tags !== null ? beer.tags.split(",") : [],
            }
          })
        } else {
          return null
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }

      return null
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface BeerStore extends Instance<typeof BeerStoreModel> {}

export interface BeerStoreSnapshotOut extends SnapshotOut<typeof BeerStoreModel> {}

export interface BeerStoreSnapshotIn extends SnapshotIn<typeof BeerStoreModel> {}

export const createBeerStoreDefaultModel = () => types.optional(BeerStoreModel, {})
