import { ApiResponse } from "apisauce"
import { Api } from "./api"
import {
  GetApiResult,
  GetBreweriesResult,
  GetBreweryRatingsResult,
  GetBreweryResult,
} from "./api.types"
import { getGeneralApiProblem } from "./api-problem"
import { AUTH_TOKEN, loadString } from "../../utils/storage"

export class BreweryApi {
  private api: Api

  constructor() {
    this.api = new Api()
    this.api.setup()
  }

  async getBreweriesService(): Promise<GetBreweriesResult> {
    try {
      let token = await loadString(AUTH_TOKEN)

      const response: ApiResponse<any> = await this.api.apisauce.get(
        this.api.config.url + "/api/breweries",
        null,
        {
          headers: {
            Authorization: token,
          },
        },
      )

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const breweries = response.data.data

      return { kind: "ok", breweries }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getBreweriesTopRatedService(top = 5): Promise<GetBreweriesResult> {
    try {
      let token = await loadString(AUTH_TOKEN)

      const response: ApiResponse<any> = await this.api.apisauce.get(
        this.api.config.url + "/api/breweries/top_rated/" + top,
        null,
        {
          headers: {
            Authorization: token,
          },
        },
      )

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const breweries = response.data.data

      return { kind: "ok", breweries }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getBreweryService(breweryId: number): Promise<GetBreweryResult> {
    try {
      let token = await loadString(AUTH_TOKEN)

      const response: ApiResponse<any> = await this.api.apisauce.get(
        this.api.config.url + "/api/breweries/" + breweryId,
        null,
        {
          headers: {
            Authorization: token,
          },
        },
      )

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const brewery = response.data.data

      return { kind: "ok", brewery }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getBreweriesSearchService(search: string): Promise<GetBreweriesResult> {
    try {
      let token = await loadString(AUTH_TOKEN)

      const response: ApiResponse<any> = await this.api.apisauce.get(
        this.api.config.url + "/api/search/search_breweries/" + search,
        null,
        {
          headers: {
            Authorization: token,
          },
        },
      )

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const breweries = response.data.data

      return { kind: "ok", breweries }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getBreweriesFavouritesService(): Promise<GetBreweriesResult> {
    try {
      let token = await loadString(AUTH_TOKEN)

      const response: ApiResponse<any> = await this.api.apisauce.get(
        this.api.config.url + "/api/user/favourite_breweries",
        null,
        {
          headers: {
            Authorization: token,
          },
        },
      )

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const breweries = response.data.data

      return { kind: "ok", breweries }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async addBreweriesFavouriteService(brewery: number): Promise<GetApiResult> {
    try {
      let token = await loadString(AUTH_TOKEN)

      const response: ApiResponse<any> = await this.api.apisauce.post(
        this.api.config.url + "/api/user/add_favourite_brewery",
        JSON.stringify({ brewery_id: brewery }),
        {
          headers: {
            Authorization: token,
          },
        },
      )

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const result = response.data

      return { kind: "ok", result }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async removeBreweriesFavouriteService(brewery: number): Promise<GetApiResult> {
    try {
      let token = await loadString(AUTH_TOKEN)

      const response: ApiResponse<any> = await this.api.apisauce.post(
        this.api.config.url + "/api/user/remove_favourite_brewery",
        JSON.stringify({ brewery_id: brewery }),
        {
          headers: {
            Authorization: token,
          },
        },
      )

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const result = response.data

      return { kind: "ok", result }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getRatingsByBrewery(brewery_id: number): Promise<GetBreweryRatingsResult> {
    try {
      let token = await loadString(AUTH_TOKEN)

      const response: ApiResponse<any> = await this.api.apisauce.get(
        this.api.config.url + "/api/breweries/ratings_by_brewery/" + brewery_id,
        null,
        {
          headers: {
            Authorization: token,
          },
        },
      )

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const ratings = response.data.data

      return { kind: "ok", ratings }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async addBreweryRating(brewery_id: number, rating: number): Promise<GetApiResult> {
    try {
      let token = await loadString(AUTH_TOKEN)

      const response: ApiResponse<any> = await this.api.apisauce.post(
        this.api.config.url + "/api/user/add_brewery_rating",
        JSON.stringify({ rating: rating, brewery_id: brewery_id }),
        {
          headers: {
            Authorization: token,
          },
        },
      )

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const result = response.data

      return { kind: "ok", result }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
