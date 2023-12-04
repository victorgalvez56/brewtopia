import { PubModel } from "./pub"

test("can be created", () => {
  const instance = PubModel.create({})

  expect(instance).toBeTruthy()
})
