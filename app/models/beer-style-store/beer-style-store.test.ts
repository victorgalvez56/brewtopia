import { BeerStyleStoreModel } from "./beer-style-store"

test("can be created", () => {
  const instance = BeerStyleStoreModel.create({})

  expect(instance).toBeTruthy()
})
