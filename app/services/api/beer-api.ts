import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetApiResult, GetBeerResult, GetBeersResult, UploadBeerResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"
import { AUTH_TOKEN, loadString } from "../../utils/storage"

export class BeerApi {
  private api: Api

  constructor() {
    this.api = new Api()
    this.api.setup()
  }

  async getBeer(id: number): Promise<GetBeerResult> {
    try {
      const token = await loadString(AUTH_TOKEN)

      const response: ApiResponse<any> = await this.api.apisauce.get(
        this.api.config.url + "/api/beer/" + id,
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
      const beer = response.data.data

      return { kind: "ok", beer }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getBeersService(): Promise<GetBeersResult> {
    try {
      let token = await loadString(AUTH_TOKEN)

      const response: ApiResponse<any> = await this.api.apisauce.get(
        this.api.config.url + "/api/beers",
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

  async getBeersTrendingService(top = 5): Promise<GetBeersResult> {
    try {
      let token = await loadString(AUTH_TOKEN)

      const response: ApiResponse<any> = await this.api.apisauce.get(
        this.api.config.url + "/api/beers/trending/" + top,
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

  async getBeersTopRatedService(top = 5): Promise<GetBeersResult> {
    try {
      let token = await loadString(AUTH_TOKEN)

      const response: ApiResponse<any> = await this.api.apisauce.get(
        this.api.config.url + "/api/beers/top_rated/" + top,
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
  async getBeersSearchService(search: string, types: number[]): Promise<GetBeersResult> {
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

  async getBeersByStyleSearchService(beer_style_id: number): Promise<GetBeersResult> {
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

  async getRatedBeersService(): Promise<GetBeersResult> {
    try {
      let token = await loadString(AUTH_TOKEN)

      const response: ApiResponse<any> = await this.api.apisauce.get(
        this.api.config.url + "/api/user/rated_beers",
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

  async addBeerRatingService(beer_id: number, beer_rating: number): Promise<GetApiResult> {
    try {
      let token = await loadString(AUTH_TOKEN)

      const response: ApiResponse<any> = await this.api.apisauce.post(
        this.api.config.url + "/api/user/add_beer_rating",
        JSON.stringify({ beer_id: beer_id, rating: beer_rating }),
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

  async removeBeerRatingService(beer: number): Promise<GetApiResult> {
    try {
      let token = await loadString(AUTH_TOKEN)

      const response: ApiResponse<any> = await this.api.apisauce.post(
        this.api.config.url + "/api/user/remove_beer_rating",
        JSON.stringify({ beer_id: beer }),
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

  async getBeerFavouritesService(): Promise<GetBeersResult> {
    try {
      let token = await loadString(AUTH_TOKEN)

      const response: ApiResponse<any> = await this.api.apisauce.get(
        this.api.config.url + "/api/user/favourite_beers",
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

  async addBeerFavouriteService(beer: number): Promise<GetApiResult> {
    try {
      let token = await loadString(AUTH_TOKEN)

      const response: ApiResponse<any> = await this.api.apisauce.post(
        this.api.config.url + "/api/user/add_favourite_beer",
        JSON.stringify({ beer_id: beer }),
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

  async removeBeerFavouriteService(beer: number): Promise<GetApiResult> {
    try {
      let token = await loadString(AUTH_TOKEN)

      const response: ApiResponse<any> = await this.api.apisauce.post(
        this.api.config.url + "/api/user/remove_favourite_beer",
        JSON.stringify({ beer_id: beer }),
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

  async getPredictions(image: any): Promise<GetApiResult> {
    try {
      let token = await loadString(AUTH_TOKEN)
      const response: ApiResponse<any> = await this.api.apisauce.post(
        this.api.config.url + "/api/custom-vision/prediction",
        JSON.stringify({
          image: image,
        }),
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

  async getBeerUpload(
    name: string,
    brewery_name: string,
    image: any,
    abv: string,
    beer_style_id: string,
  ): Promise<UploadBeerResult> {
    try {
      let token = await loadString(AUTH_TOKEN)
      const response: ApiResponse<any> = await this.api.apisauce.post(
        this.api.config.url + "/api/upload-beer/add",
        JSON.stringify({
          name: name,
          brewery_name: brewery_name,
          image: image,
          abv: abv,
          beer_style_id: beer_style_id,
        }),
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

  async addBeerRating(beer_id: string, beer_rating: number): Promise<GetApiResult> {
    try {
      let token = await loadString(AUTH_TOKEN)

      const response: ApiResponse<any> = await this.api.apisauce.post(
        this.api.config.url + "/api/user/add_beer_rating",
        JSON.stringify({ beer_id: beer_id, rating: beer_rating }),
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

  async getBeersSimilar(beer_id: number): Promise<GetBeersResult> {
    try {
      let token = await loadString(AUTH_TOKEN)

      const response: ApiResponse<any> = await this.api.apisauce.get(
        this.api.config.url + "/api/beers/similar/" + beer_id,
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

  async getBeersByBrewery(breweryId: number): Promise<GetBeersResult> {
    try {
      const token = await loadString(AUTH_TOKEN)

      const response: ApiResponse<any> = await this.api.apisauce.get(
        this.api.config.url + "/api/beers/by_brewery/" + breweryId,
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
