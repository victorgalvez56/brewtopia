import { BeerRatingModel } from "./beer-rating"

test("can be created", () => {
  const instance = BeerRatingModel.create({})

  expect(instance).toBeTruthy()
})
