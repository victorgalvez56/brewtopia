/* eslint-disable camelcase */
import { ApiResponse } from "apisauce"
import { Api } from "./api"
import {
  GetApiResult,
  GetForgotPasswordResult,
  GetLoginResult,
  GetLogoutResult,
  GetRegisterResult,
} from "./api.types"
import { getGeneralApiProblem } from "./api-problem"
import { AUTH_TOKEN, loadString } from "../../utils/storage"
import { AuthRoleId } from "../../utils/app-values"

export interface loginData {
  email: string
  auth_mode: string
  password?: string
  auth_data?: string
}
export interface forgotPasswordData {
  email: string
}
export interface registerData {
  email: string
  auth_mode: string
  name: string
  password?: string
  role_id?: number
  lastname?: string
}
export class AuthApi {
  private api: Api

  constructor() {
    this.api = new Api()
    this.api.setup()
  }

  async loginService(data: loginData): Promise<GetLoginResult> {
    try {
      const { email, password, auth_mode, auth_data } = data
      let datos: loginData

      if (auth_mode !== "1") {
        datos = {
          email,
          auth_mode,
          auth_data,
        }
      } else {
        datos = {
          email,
          password,
          auth_mode,
        }
      }
      const response: ApiResponse<any> = await this.api.apisauce.post(
        this.api.config.url + "/api/auth/sign_in",
        JSON.stringify(datos),
      )

      if (!response.ok || !response.data) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const login = response.data.data

      return { kind: "ok", data: login }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getSocialLogin(email, password, auth_data): Promise<GetLoginResult> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        this.api.config.url + "/api/auth/social_sign_in",
        JSON.stringify({
          email: email,
          password: password,
          remember_me: true,
          auth_data: auth_data,
        }),
      )

      if (!response.ok || !response.data) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const login = response.data.data

      return { kind: "ok", login }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async registerService(data: registerData): Promise<GetRegisterResult> {
    try {
      const { email, password, auth_mode, role_id, name, lastname } = data
      let datos: registerData
      if (auth_mode !== "1") {
        datos = {
          email,
          auth_mode,
          role_id,
          name,
          lastname,
        }
      } else {
        datos = {
          email,
          password,
          auth_mode,
          name,
          lastname,
        }
      }

      const response: ApiResponse<any> = await this.api.apisauce.post(
        this.api.config.url + "/api/user/sign_up",
        JSON.stringify(datos),
      )

      if (response.status === 422) {
        return {
          kind: "bad-data",
          message: JSON.stringify(response.originalError.response.data.errors),
        }
      }

      if (!response.ok || !response.data) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const register = response.data

      return { kind: "ok", register }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getSocialRegisterService(
    email: string,
    name: string,
    lastname: string,
    auth_data: string,
  ): Promise<GetRegisterResult> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        this.api.config.url + "/api/user/social_sign_up",
        JSON.stringify({
          email: email,
          name: name,
          lastname: lastname,
          role_id: AuthRoleId,
          auth_data: auth_data,
        }),
      )

      if (!response.ok || !response.data) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const register = response.data

      return { kind: "ok", register }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async logoutService(): Promise<GetLogoutResult> {
    try {
      let token = await loadString(AUTH_TOKEN)

      const response: ApiResponse<any> = await this.api.apisauce.get(
        this.api.config.url + "/api/auth/log_out",
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

      const logout = response.data

      return { kind: "ok", logout }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async forgotPasswordService(email: string): Promise<GetForgotPasswordResult> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        this.api.config.url + "/api/user/forgot_password",
        JSON.stringify({
          email: email,
        }),
      )

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const forgot = response.data

      return { kind: "ok", forgot }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async validUserService(): Promise<GetApiResult> {
    try {
      let token = await loadString(AUTH_TOKEN)

      const response: ApiResponse<any> = await this.api.apisauce.get(
        this.api.config.url + "/api/auth/valid_user",
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

      const result = response.data.data

      return { kind: "ok", result }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
