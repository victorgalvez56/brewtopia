import { cast, getRoot, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { BreweryApi } from "../../services/api/brewery-api"
import { BreweryRatingModel, BreweryRatingSnapshotOut } from "../brewery-rating/brewery-rating"
import { Brewery, BreweryModel, BrewerySnapshotOut } from "../brewery/brewery"
import { RootStore } from "../root-store/root-store"

/**
 * Model description here for TypeScript hints.
 */
export const BreweryStoreModel = types
  .model("BreweryStore")
  .props({
    brewery: types.optional(BreweryModel, {}),
    breweries: types.optional(types.array(BreweryModel), []),
    breweriesSearch: types.optional(types.array(BreweryModel), []),
    breweriesTopRated: types.optional(types.array(BreweryModel), []),
    breweriesFavourites: types.optional(types.array(BreweryModel), []),
    breweriesMap: types.optional(types.array(BreweryModel), []),
    modalShowBrewery: types.optional(types.boolean, false),
    breweriesSearchViewAll: types.optional(types.array(BreweryModel), []),
    breweriesRating: types.optional(types.array(BreweryRatingModel), []),
  })
  .views((self) => ({
    get breweriesRate() {
      return self.breweries.map((brewery: Brewery) => {
        const like = self.breweriesFavourites.findIndex((item) => item.id === brewery.id)
        const xlat = brewery.lat
        const ylat: number = +xlat

        const xlng = brewery.lng
        const ylng = +xlng

        return {
          id: brewery.id,
          image: brewery.image_path,
          title: brewery.name,
          like: like !== -1,
          initial_rating: brewery.initial_rating,
          local: brewery.address,
          description: brewery.description,
          website: brewery.website,
          phone: brewery.phone,
          founded: brewery.founded,
          latitude: ylat,
          longitude: ylng,
        }
      })
    },
    get breweriesSearchList() {
      return self.breweriesSearch.map((brewery: Brewery) => {
        const like = self.breweriesFavourites.findIndex((item) => item.id === brewery.id)
        return {
          id: brewery.id,
          image: brewery.image_path,
          title: brewery.name,
          like: like !== -1,
          initial_rating: brewery.initial_rating,
          local: brewery.address,
          description: brewery.description,
          website: brewery.website,
          phone: brewery.phone,
          founded: brewery.founded,
        }
      })
    },
    get breweriesTopRatedList() {
      return self.breweriesTopRated.map((brewery: Brewery) => {
        const like = self.breweriesFavourites.findIndex((item) => item.id === brewery.id)
        return {
          id: brewery.id,
          image: brewery.image_path,
          title: brewery.name,
          like: like !== -1,
          initial_rating: brewery.initial_rating,
          local: brewery.address,
          description: brewery.description,
          website: brewery.website,
          phone: brewery.phone,
          founded: brewery.founded,
        }
      })
    },

    get breweriesFavouritesList() {
      return self.breweriesFavourites.map((brewery: Brewery) => {
        return {
          id: brewery.id,
          image: brewery.image_path,
          title: brewery.name,
          like: true,
          abv: 0,
          ibu: 0,
          initial_rating: brewery.initial_rating,
          local: brewery.address,
          description: brewery.description,
          website: brewery.website,
          phone: brewery.phone,
          founded: brewery.founded,
        }
      })
    },
    get breweriesMapList() {
      return self.breweriesMap.map((brewery: Brewery) => {
        const like = self.breweriesFavourites.findIndex((item) => item.id === brewery.id)
        const xlat = brewery.lat
        const ylat: number = +xlat

        const xlng = brewery.lng
        const ylng = +xlng

        return {
          id: brewery.id,
          image: brewery.image_path,
          title: brewery.name,
          like: like !== -1,
          initial_rating: brewery.initial_rating,
          local: brewery.address,
          description: brewery.description,
          website: brewery.website,
          phone: brewery.phone,
          founded: brewery.founded,
          latitude: ylat,
          longitude: ylng,
        }
      })
    },
    get breweriesSearchViewAllList() {
      return self.breweriesSearchViewAll.map((brewery: Brewery) => {
        const like = self.breweriesFavourites.findIndex((item) => item.id === brewery.id)
        const xlat = brewery.lat
        const ylat: number = +xlat

        const xlng = brewery.lng
        const ylng = +xlng
        return {
          id: brewery.id,
          image: brewery.image_path,
          title: brewery.name,
          like: like !== -1,
          initial_rating: brewery.initial_rating,
          local: brewery.address,
          description: brewery.description,
          website: brewery.website,
          phone: brewery.phone,
          founded: brewery.founded,
          latitude: ylat,
          longitude: ylng,
          rate: 0,
        }
      })
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    saveOne: (brewery: BrewerySnapshotOut) => {
      self.brewery = cast(brewery)
    },
    save: (breweries: BrewerySnapshotOut[]) => {
      self.breweries = cast(breweries)
    },
    saveSearch: (breweries: BrewerySnapshotOut[]) => {
      self.breweriesSearch = cast(breweries)
    },
    saveBreweriesTopRated: (breweries: BrewerySnapshotOut[]) => {
      self.breweriesTopRated = cast(breweries)
    },
    saveBreweriesFavourites: (breweries: BrewerySnapshotOut[]) => {
      self.breweriesFavourites = cast(breweries)
    },
    saveMap: (breweries: BrewerySnapshotOut[]) => {
      self.breweriesMap = cast(breweries)
    },
    saveBreweriesSearchViewAll: (breweries: BrewerySnapshotOut[]) => {
      self.breweriesSearchViewAll = cast(breweries)
    },
    saveBreweryRating: (breweryRating: BreweryRatingSnapshotOut) => {
      const index = self.breweriesRating.findIndex((i) => i.brewery_id === breweryRating.brewery_id)
      if (index !== -1) {
        self.breweriesRating.splice(index, 1)
      }
      self.breweriesRating.push(cast(breweryRating))
    },
  }))
  .actions((self) => ({
    getBrewery: async (breweryId: number) => {
      try {
        const api = new BreweryApi()
        const result = await api.getBreweryService(breweryId)
        if (result.kind === "ok") {
          const data = result.brewery
          const like = self.breweriesFavourites.findIndex((item) => item.id === data.id)
          data.like = like !== -1
          self.saveOne(data)
          return true
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
      return false
    },
    getBreweries: async () => {
      try {
        const api = new BreweryApi()
        const root: RootStore = getRoot(self)
        const result = await api.getBreweriesService()
        if (result.kind === "ok") {
          self.save(result.breweries)
          self.saveMap(result.breweries)
          self.saveBreweriesSearchViewAll(result.breweries)
          await root.breweryStore.getFavouritesBreweries()
          return true
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
      return false
    },
    getBreweriesTopRated: async () => {
      try {
        const api = new BreweryApi()
        const result = await api.getBreweriesTopRatedService()
        if (result.kind === "ok") {
          self.saveBreweriesTopRated(result.breweries)
          return true
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
      return false
    },
    getSearchBreweries: async (search: string) => {
      try {
        const api = new BreweryApi()
        const result = await api.getBreweriesSearchService(search)
        if (result.kind === "ok") {
          self.saveSearch(result.breweries)
          return true
        }
      } catch (error) {
        __DEV__ && console.log(error)
      } finally {
        return false
      }
    },
    getSearchBreweriesMap: async (search: string) => {
      try {
        const api = new BreweryApi()
        const result = await api.getBreweriesSearchService(search)
        if (result.kind === "ok") {
          self.saveMap(result.breweries)
          let location = null
          if (result.breweries.length > 0) {
            const xlat = result.breweries[0].lat
            const ylat: number = +xlat
            const xlng = result.breweries[0].lng
            const ylng: number = +xlng

            location = {
              latitude: ylat,
              longitude: ylng,
            }
          }
          return location
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
      return null
    },
    getSearchBreweriesViewAll: async (search: string, isTopRated = false) => {
      try {
        const api = new BreweryApi()
        const result = await api.getBreweriesSearchService(search)
        if (result.kind === "ok") {
          isTopRated
            ? self.saveBreweriesTopRated(result.breweries)
            : self.saveBreweriesSearchViewAll(result.breweries)
          return true
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
      return false
    },
    getFavouritesBreweries: async () => {
      try {
        const api = new BreweryApi()
        const result = await api.getBreweriesFavouritesService()
        if (result.kind === "ok") {
          self.saveBreweriesFavourites(result.breweries)
          return true
        }
      } catch (error) {
        __DEV__ && console.log(error)
      } finally {
        return false
      }
    },
    setAddFavouriteBrewery: async (brewery: number) => {
      try {
        const api = new BreweryApi()
        const root: RootStore = getRoot(self)
        const result = await api.addBreweriesFavouriteService(brewery)
        if (result.kind === "ok") {
          await root.breweryStore.getFavouritesBreweries()
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
    setRemoveFavouriteBrewery: async (brewery: number) => {
      try {
        const api = new BreweryApi()
        const root: RootStore = getRoot(self)
        const result = await api.removeBreweriesFavouriteService(brewery)
        if (result.kind === "ok") {
          await root.breweryStore.getFavouritesBreweries()
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
    setAddBreweryRating: async (brewery: number, rating: number) => {
      try {
        const api = new BreweryApi()
        const result = await api.addBreweryRating(brewery, rating)
        if (result.kind === "ok") {
          const data = {
            rating,
            brewery_id: brewery,
          }
          self.saveBreweryRating(data)
          return true
        } else {
          return false
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }

      return false
    },
    showModalBrewery: () => {
      self.modalShowBrewery = true
    },
    closeModalBrewery: () => {
      self.modalShowBrewery = false
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface BreweryStore extends Instance<typeof BreweryStoreModel> {}
export interface BreweryStoreSnapshotOut extends SnapshotOut<typeof BreweryStoreModel> {}
export interface BreweryStoreSnapshotIn extends SnapshotIn<typeof BreweryStoreModel> {}
export const createBreweryStoreDefaultModel = () => types.optional(BreweryStoreModel, {})
