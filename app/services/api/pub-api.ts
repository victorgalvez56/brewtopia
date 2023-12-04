import { ApiResponse } from "apisauce"
import { Api } from "./api"
import {
  GetPubsResult,
  GetPubsSearchResult,
  GetPubsTopResult,
  GetSearchPubsByLocationResult,
} from "./api.types"
import { getGeneralApiProblem } from "./api-problem"
import { AUTH_TOKEN, loadString } from "../../utils/storage"

export class PubApi {
  private api: Api

  constructor() {
    this.api = new Api()
    this.api.setup()
  }

  async getPubsService(): Promise<GetPubsTopResult> {
    try {
      const token = await loadString(AUTH_TOKEN)
      const url = `${this.api.config.url}/api/pubs`
      const response: ApiResponse<any> = await this.api.apisauce.get(url, null, {
        headers: {
          Authorization: token,
        },
      })
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const pubs_top = response.data.data

      return { kind: "ok", pubs_top }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }
  async getPubsTrendingService(top = 5): Promise<GetPubsTopResult> {
    try {
      const token = await loadString(AUTH_TOKEN)
      const url = `${this.api.config.url}/api/pubs/trending/${top}`
      const response: ApiResponse<any> = await this.api.apisauce.get(url, null, {
        headers: {
          Authorization: token,
        },
      })
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const pubs_top = response.data.data

      return { kind: "ok", pubs_top }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getPubsNearYouService(top = 5): Promise<GetPubsTopResult> {
    try {
      const token = await loadString(AUTH_TOKEN)
      const url = `${this.api.config.url}/api/pubs/top/${top}`
      const response: ApiResponse<any> = await this.api.apisauce.get(url, null, {
        headers: {
          Authorization: token,
        },
      })
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const pubs_top = response.data.data

      return { kind: "ok", pubs_top }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getPubsSearchService(search: string): Promise<GetPubsSearchResult> {
    try {
      let token = await loadString(AUTH_TOKEN)

      const response: ApiResponse<any> = await this.api.apisauce.post(
        this.api.config.url + "/api/search/search_pubs",
        {
          search: search,
        },
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

      const pubs_search = response.data.data

      return { kind: "ok", pubs_search }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getSearchPubsByLocation(
    top = 75,
    lat: number = null,
    long: number = null,
  ): Promise<GetSearchPubsByLocationResult> {
    try {
      const token = await loadString(AUTH_TOKEN)

      console.log(lat + " " + long)

      const response: ApiResponse<any> = await this.api.apisauce.post(
        this.api.config.url + "/api/search/search_pubs_by_location",
        {
          top,
          lat,
          long,
        },
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

      const near = response.data.data

      return { kind: "ok", near }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
