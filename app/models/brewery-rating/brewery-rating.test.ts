import { BreweryRatingModel } from "./brewery-rating"

test("can be created", () => {
  const instance = BreweryRatingModel.create({})

  expect(instance).toBeTruthy()
})
