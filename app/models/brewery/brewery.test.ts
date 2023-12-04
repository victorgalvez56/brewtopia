import { BreweryModel } from "./brewery"

test("can be created", () => {
  const instance = BreweryModel.create({})

  expect(instance).toBeTruthy()
})
