import { AuthModel } from "./auth"

test("can be created", () => {
  const instance = AuthModel.create({})

  expect(instance).toBeTruthy()
})
