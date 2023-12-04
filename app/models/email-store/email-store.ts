import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { EmailApi, emailData } from "../../services/api/email-api"

/**
 * Model description here for TypeScript hints.
 */
export const EmailModel = types
  .model("Email")
  .props({
    from: types.maybeNull(types.string),
    subject: types.maybeNull(types.string),
    message: types.maybeNull(types.string),
  })
  .actions((self) => ({
    save: (modelSnapshot: EmailSnapshotIn) => {
      self.from = modelSnapshot.from
      self.subject = modelSnapshot.subject
      self.message = modelSnapshot.message
    },
    reset: () => {
      self.from = ""
      self.subject = ""
      self.message = ""
    },
  }))
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    sendContactEmail: async (data: emailData) => {
      try {
        const api = new EmailApi()
        const result = await api.sendContactEmail(data)
        if (result.kind === "ok") {
          return true
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
      return false
    },
    sendFeedBackEmail: async (data: emailData) => {
      try {
        const api = new EmailApi()
        const result = await api.sendFeedBackEmail(data)
        if (result.kind === "ok") {
          return true
        }
      } catch (error) {
        __DEV__ && console.log(error)
      }
      return false
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Email extends Instance<typeof EmailModel> {}
export interface EmailSnapshotOut extends SnapshotOut<typeof EmailModel> {}
export interface EmailSnapshotIn extends SnapshotIn<typeof EmailModel> {}
export const createEmailDefaultModel = () => types.optional(EmailModel, {})
