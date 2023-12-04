import { BreweryStoreModel } from "./brewery-store"

test("can be created", () => {
  const instance = BreweryStoreModel.create({})

  expect(instance).toBeTruthy()
})
