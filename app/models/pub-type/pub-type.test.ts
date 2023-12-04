import { PubTypeModel } from "./pub-type"

test("can be created", () => {
  const instance = PubTypeModel.create({})

  expect(instance).toBeTruthy()
})
