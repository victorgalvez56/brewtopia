/* eslint-disable camelcase */
import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetApiResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"
import { EMAIL_API_CONFIG } from "./api-config"
const { KEY, SUPPORT } = require("../../config/env")

export interface emailData {
  from: string
  message: string
}

export class EmailApi {
  private api: Api
  private authHeader: string
  constructor() {
    this.api = new Api(EMAIL_API_CONFIG)
    this.api.setup()

    const apiKey = ["api", KEY].join(":")
    const encoded = this.encodeBase64(apiKey)
    this.authHeader = "Basic " + encoded
  }
  encodeBase64 = (input) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    let str = input
    let output = ""
    for (
      let block = 0, charCode, i = 0, map = chars;
      str.charAt(i | 0) || ((map = "="), i % 1);
      output += map.charAt(63 & (block >> (8 - (i % 1) * 8)))
    ) {
      charCode = str.charCodeAt((i += 3 / 4))
      if (charCode > 0xff) {
        console.log(
          "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.",
        )
      }
      block = (block << 8) | charCode
    }
    return output
  }

  async sendContactEmail(data: emailData): Promise<GetApiResult> {
    try {
      let body = {
        from: data.from,
        to: SUPPORT,
        subject: "Contact Form",
        text: "New Contact",
        html: `<h2>Contact form from </h2><h3>email: ${data.from}</h3><p>Message: ${data.message}</h3>`,
      }
      const response: ApiResponse<any> = await this.api.apisauce.post(
        this.api.config.url,
        `to=${body.to}&from=${body.from}&subject=${body.subject}&html=${body.html}</h3>`,
        {
          headers: {
            Authorization: this.authHeader,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      )

      if (!response.ok || !response.data) {
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
  async sendFeedBackEmail(data: emailData): Promise<GetApiResult> {
    try {
      let body = {
        from: data.from,
        to: SUPPORT,
        subject: "New Feedback",
        text: "New Feedback from app",
        html: `<h2>New feedback from </h2><h3>email: ${data.from}</h3><p>Feedback: ${data.message}</h3>`,
      }
      const response: ApiResponse<any> = await this.api.apisauce.post(
        this.api.config.url,
        `to=${body.to}&from=${body.from}&subject=${body.subject}&html=${body.html}</h3>`,
        {
          headers: {
            Authorization: this.authHeader,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      )

      if (!response.ok || !response.data) {
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
