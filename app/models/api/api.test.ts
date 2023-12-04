import { ApiModel } from "./api"

test("can be created", () => {
  const instance = ApiModel.create({})

  expect(instance).toBeTruthy()
})
