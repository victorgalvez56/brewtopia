import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const PubTypeModel = types
  .model("PubType")
  .props({
    id: types.maybe(types.number),
    pub_id: types.maybe(types.number),
    pub_type_id: types.maybe(types.number),
    created_at: types.maybeNull(types.string),
    updated_at: types.maybeNull(types.string),
    published: types.maybe(types.boolean),
    deleted: types.maybe(types.boolean),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface PubType extends Instance<typeof PubTypeModel> {}
export interface PubTypeSnapshotOut extends SnapshotOut<typeof PubTypeModel> {}
export interface PubTypeSnapshotIn extends SnapshotIn<typeof PubTypeModel> {}
export const createPubTypeDefaultModel = () => types.optional(PubTypeModel, {})
