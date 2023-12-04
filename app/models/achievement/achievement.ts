import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const AchievementModel = types
  .model("Achievement")
  .props({
    id: types.maybe(types.number),
    uid: types.maybe(types.string),
    user_id: types.maybeNull(types.number),
    badge_id: types.maybeNull(types.number),
    achievement_config_id: types.maybeNull(types.number),
    is_new: types.maybeNull(types.number),
    viewed_at: types.maybeNull(types.string),
    image_path: types.maybeNull(types.string),
    icon_path: types.maybeNull(types.string),
    badge_name: types.maybeNull(types.string),
    badge_description: types.maybeNull(types.string),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Achievement extends Instance<typeof AchievementModel> {}
export interface AchievementSnapshotOut extends SnapshotOut<typeof AchievementModel> {}
export interface AchievementSnapshotIn extends SnapshotIn<typeof AchievementModel> {}
export const createAchievementDefaultModel = () => types.optional(AchievementModel, {})
