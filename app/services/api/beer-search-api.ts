import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetBeersResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"
import { AUTH_TOKEN, loadString } from "../../utils/storage"

export class BeerSearchApi {
  private api: Api

  constructor() {
    this.api = new Api()
    this.api.setup()
  }

  async getBeers(search: string, types: number[]): Promise<GetBeersResult> {
    try {
      let token = await loadString(AUTH_TOKEN)

      const response: ApiResponse<any> = await this.api.apisauce.post(
        this.api.config.url + "/api/search/search_beers",
        {
          search: search,
          types: types,
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

      const beers = response.data.data

      return { kind: "ok", beers }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getBeersByStyle(beer_style_id: number): Promise<GetBeersResult> {
    try {
      let token = await loadString(AUTH_TOKEN)

      const response: ApiResponse<any> = await this.api.apisauce.get(
        this.api.config.url + "/api/search/beers_by_style/" + beer_style_id,
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

      const beers = response.data.data

      return { kind: "ok", beers }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
