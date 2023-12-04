import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetAchievementsResult, GetApiResult, GetUserResult,UploadAchievementsResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"
import { AUTH_TOKEN, loadString } from "../../utils/storage"
import * as FileSystem from "expo-file-system"

export interface updateUser {
  dob: string
  lastname: string
  location: string | null
  name: string
  new_avatar: string | null
}

export interface updateLoginDetails {
  email: string
  actual_password: string
  new_password: string
  confirm_new_password: string
}

export class UserApi {
  private api: Api

  constructor() {
    this.api = new Api()
    this.api.setup()
  }

  async getUserService(): Promise<GetUserResult> {
    try {
      let token = await loadString(AUTH_TOKEN)

      const response: ApiResponse<any> = await this.api.apisauce.get(
        this.api.config.url + "/api/auth/logged_user",
        null,
        {
          headers: {
            Authorization: token,
          },
        },
      )

      if (!response.ok || !response.data) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const user_data = response.data.data

      return { kind: "ok", user: user_data }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async updateProfile(data): Promise<GetApiResult> {
    try {
      let token = await loadString(AUTH_TOKEN)
      const response: ApiResponse<any> = await this.api.apisauce.post(
        this.api.config.url + "/api/user/update_profile",
        JSON.stringify({
          name: data.name,
          lastname: data.lastname,
          location: data.location,
          dob: data.dob,
          new_avatar: data.new_avatar,
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

  async updateLoginDetails(data): Promise<GetApiResult> {
    try {
      let token = await loadString(AUTH_TOKEN)

      const response: ApiResponse<any> = await this.api.apisauce.post(
        this.api.config.url + "/api/user/update_login_details",
        JSON.stringify({
          email: data.email,
          actual_password: data.actual_password,
          new_password: data.new_password,
          confirm_new_password: data.confirm_new_password,
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

  async uploadAvatar(new_avatar: string): Promise<GetApiResult> {
    try {
      let token = await loadString(AUTH_TOKEN)

      const request = FileSystem.uploadAsync(
        this.api.config.url + "/api/user/upload_avatar",
        new_avatar,
        {
          httpMethod: "POST",
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: "new_avatar",
          headers: {
            Authorization: token,
          },
        },
      )
      const response = await request

      // const response: ApiResponse<any> = await this.api.apisauce.post(
      //   this.api.config.url + "/api/user/upload_avatar",
      //   new_avatar,
      //   {
      //     headers: {
      //       Authorization: token,
      //       ContentType: "multipart/form-data",
      //     },
      //   },
      // )

      const { code, message } = JSON.parse(response.body)

      if (response.status !== 200 || code !== 200) {
        console.log(message)
        return { kind: "bad-data" }
      }

      // if (!response.ok) {
      //   const problem = getGeneralApiProblem(response)
      //   if (problem) return problem
      // }
      const result = {
        code: response.status.toString(),
        message: message,
        data: [],
      }

      return { kind: "ok", result }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async updateBeerProfileService(pick: string): Promise<GetApiResult> {
    try {
      let token = await loadString(AUTH_TOKEN)
      const response: ApiResponse<any> = await this.api.apisauce.post(
        this.api.config.url + "/api/user/update_beer_profile",
        JSON.stringify({
          pick: pick,
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

  async resetBeerProfileService(): Promise<GetApiResult> {
    try {
      let token = await loadString(AUTH_TOKEN)
      const response: ApiResponse<any> = await this.api.apisauce.get(
        this.api.config.url + "/api/user/reset_beer_profile",
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

      const result = response.data

      return { kind: "ok", result }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async skipBeerProfileService(): Promise<GetApiResult> {
    try {
      let token = await loadString(AUTH_TOKEN)
      const response: ApiResponse<any> = await this.api.apisauce.get(
        this.api.config.url + "/api/user/skip_beer_profile",
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

      const result = response.data

      return { kind: "ok", result }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getAchievements(isNew: boolean): Promise<GetAchievementsResult> {
    try {
      const token = await loadString(AUTH_TOKEN)

      const newParam = isNew ? 1 : 0
      const response: ApiResponse<any> = await this.api.apisauce.get(
        this.api.config.url + "/api/achievements/by_user/" + newParam,
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

      const achievements = response.data.data

      return { kind: "ok", achievements }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async updateAchievementsService(id: string): Promise<UploadAchievementsResult> {
    try {
      let token = await loadString(AUTH_TOKEN)
      const response: ApiResponse<any> = await this.api.apisauce.post(
        this.api.config.url + "/api/achievements/update_new/",
        JSON.stringify({
          achievement_id: id,
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
}
