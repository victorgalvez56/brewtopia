import { BeerStyleModel } from "./beer-style"

test("can be created", () => {
  const instance = BeerStyleModel.create({})

  expect(instance).toBeTruthy()
})
