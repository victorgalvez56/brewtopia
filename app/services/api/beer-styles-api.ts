import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetBeerStylesResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"
import { AUTH_TOKEN, loadString } from "../../utils/storage"

export class BeerStylesApi {
  private api: Api

  constructor() {
    this.api = new Api()
    this.api.setup()
  }

  async getBeerStyles(): Promise<GetBeerStylesResult> {
    try {
      let token = await loadString(AUTH_TOKEN)

      const response: ApiResponse<any> = await this.api.apisauce.get(
        this.api.config.url + "/api/beer_styles",
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

      const beer_styles = response.data.data

      return { kind: "ok", beer_styles }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
