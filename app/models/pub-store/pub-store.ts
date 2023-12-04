import { Instance, SnapshotIn, SnapshotOut, types, cast } from "mobx-state-tree"
import { PubApi } from "../../services/api/pub-api"
import { Pub, PubModel, PubSnapshotOut } from "../pub/pub"
import reactotron from "reactotron-react-native"

/**
 * Model description here for TypeScript hints.
 */
export const PubStoreModel = types
  .model("PubStore")
  .props({
    pubs: types.optional(types.array(PubModel), []),
    pubsSearch: types.optional(types.array(PubModel), []),
    modalShowPub: types.optional(types.boolean, false),
    pubsMap: types.optional(types.array(PubModel), []),
    pubsSearchViewAll: types.optional(types.array(PubModel), []),
    pubsTrending: types.optional(types.array(PubModel), []),
    pubsNear: types.optional(types.array(PubModel), []),
  })
  .views((self) => ({
    get pubsTrendingList() {
      return self.pubsTrending.map((pub: Pub) => {
        return {
          id: pub.id,
          image: pub.image_path,
          title: pub.name,
          like: false,
          initial_rating: pub.initial_rating,
          local: pub.address,
          description: pub.detail,
          website: pub.website,
          phone: pub.phone,
          founded: pub.founded_at,
          latitude: pub.location_lat,
          longitude: pub.location_lng,
        }
      })
    },
    get pubsNearList() {

      return self.pubsNear.map((pub: Pub) => {
        return {
          id: pub.id,
          image: pub.image_path,
          title: pub.name,
          like: false,
          initial_rating: pub.initial_rating,
          local: pub.address,
          description: pub.detail,
          website: pub.website,
          phone: pub.phone,
          founded: pub.founded_at,
          latitude: pub.location_lat,
          longitude: pub.location_lng,
        }
      })
    },
    get pubsSearchList() {
      return self.pubsSearch.map((pub: Pub) => {
        return {
          id: pub.id,
          image: pub.image_path,
          title: pub.name,
          like: false,
          initial_rating: pub.initial_rating,
          local: pub.address,
          description: pub.detail,
          website: pub.website,
          phone: pub.phone,
          founded: pub.founded_at,
        }
      })
    },
    get pubsMapList() {
      return self.pubsMap.map((pub: Pub) => {
        return {
          id: pub.id,
          image: pub.image_path,
          title: pub.name,
          like: false,
          initial_rating: pub.initial_rating,
          local: pub.address,
          description: pub.detail,
          website: pub.website,
          phone: pub.phone,
          founded: pub.founded_at,
          latitude: pub.location_lat,
          longitude: pub.location_lng,
        }
      })
    },
    get pubsSearchViewAllList() {
      return self.pubsSearchViewAll.map((pub: Pub) => {
        return {
          id: pub.id,
          image: pub.image_path,
          title: pub.name,
          like: false,
          initial_rating: pub.initial_rating,
          local: pub.address,
          description: pub.detail,
          website: pub.website,
          phone: pub.phone,
          founded: pub.founded_at,
          latitude: pub.location_lat,
          longitude: pub.location_lng,
        }
      })
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    save: (pubs: PubSnapshotOut[]) => {
      self.pubs = cast(pubs)
    },
    saveSearch: (pubs: PubSnapshotOut[]) => {
      self.pubsSearch = cast(pubs)
    },
    saveMap: (pubs: PubSnapshotOut[]) => {
      self.pubsMap = cast(pubs)
    },
    savePubsSearchViewAll: (pubs: PubSnapshotOut[]) => {
      self.pubsSearchViewAll = cast(pubs)
    },
    savePubsNear: (pubs: PubSnapshotOut[]) => {
      self.pubsNear = cast(pubs)
    },
    saveTrending: (pubs: PubSnapshotOut[]) => {
      self.pubsTrending = cast(pubs)
    },
  }))
  .actions((self) => ({
    getPubs: async () => {
      try {
        const api = new PubApi()
        const result = await api.getPubsService()
        if (result.kind === "ok") {
          self.save(result.pubs_top)
          self.savePubsSearchViewAll(result.pubs_top)
          return true
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
      return false
    },
    getPubsTrendingTop: async () => {
      try {
        const api = new PubApi()
        const result = await api.getPubsTrendingService()
        if (result.kind === "ok") {
          result.pubs_top.map((pub) => {
            if (pub.published === 1) {
              pub.published = true
            } else {
              pub.published = false
            }
            if (pub.deleted === 1) {
              pub.deleted = true
            } else {
              pub.deleted = false
            }
            return pub
          })

          self.saveTrending(result.pubs_top)
          return true
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
      return false
    },

    getPubsNearYou: async () => {
      try {
        const api = new PubApi()
        const result = await api.getPubsNearYouService()
        if (result.kind === "ok") {
          result.pubs_top.map((pub) => {
            if (pub.published === 1) {
              pub.published = true
            } else {
              pub.published = false
            }
            if (pub.deleted === 1) {
              pub.deleted = true
            } else {
              pub.deleted = false
            }
            return pub
          })

          self.savePubsNear(result.pubs_top)
          return true
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
      return false
    },
    getSearchPubs: async (search: string) => {
      try {
        const api = new PubApi()
        const result = await api.getPubsSearchService(search)
        if (result.kind === "ok") {
          self.saveSearch(result.pubs_search)
          return true
        }
      } catch (error) {
        __DEV__ && console.log(error)
      } finally {
        return false
      }
    },
    getSearchPubsMap: async (search: string) => {
      try {
        const api = new PubApi()
        const result = await api.getPubsSearchService(search)
        if (result.kind === "ok") {
          self.saveMap(result.pubs_search)
          let location = null
          if (result.pubs_search.length > 0) {
            location = {
              latitude: result.pubs_search[0].location_lat,
              longitude: result.pubs_search[0].location_lng,
            }
          }
          return location
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
      return null
    },
    getSearchPubsViewAll: async (search: string, isTopRated = false) => {
      try {
        const api = new PubApi()
        const result = await api.getPubsSearchService(search)
        if (result.kind === "ok") {
          isTopRated
            ? self.saveTrending(result.pubs_search)
            : self.savePubsSearchViewAll(result.pubs_search)

          return true
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
      return false
    },
    getSearchPubsByLocation: async (lat: number = null, long: number = null) => {
      try {
        const api = new PubApi()
        const result = await api.getSearchPubsByLocation(75, lat, long)
        if (result.kind === "ok") {
          self.savePubsNear(result.near)
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
      return null
    },

    showModalPub: () => {
      self.modalShowPub = true
    },
    closeModalPub: () => {
      self.modalShowPub = false
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface PubStore extends Instance<typeof PubStoreModel> {}

export interface PubStoreSnapshotOut extends SnapshotOut<typeof PubStoreModel> {}

export interface PubStoreSnapshotIn extends SnapshotIn<typeof PubStoreModel> {}

export const createPubStoreDefaultModel = () => types.optional(PubStoreModel, {})
