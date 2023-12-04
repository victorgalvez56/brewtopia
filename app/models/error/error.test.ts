import { ErrorModel } from "./error"

test("can be created", () => {
  const instance = ErrorModel.create({})

  expect(instance).toBeTruthy()
})
