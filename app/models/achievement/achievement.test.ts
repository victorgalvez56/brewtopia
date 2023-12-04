import { AchievementModel } from "./achievement"

test("can be created", () => {
  const instance = AchievementModel.create({})

  expect(instance).toBeTruthy()
})
