import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const ErrorModel = types
  .model("Error")
  .props({
    show: types.optional(types.boolean, true),
    message: types.optional(types.string, ""),
    type: types.optional(types.string, "info"),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setError: (message: string, type: string) => {
      self.show = true
      self.message = message
      self.type = type
    },
    closeError: () => {
      self.show = false
      self.message = ""
      self.type = "info"
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Error extends Instance<typeof ErrorModel> {}
export interface ErrorSnapshotOut extends SnapshotOut<typeof ErrorModel> {}
export interface ErrorSnapshotIn extends SnapshotIn<typeof ErrorModel> {}
export const createErrorDefaultModel = () => types.optional(ErrorModel, {})
