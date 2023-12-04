import { PubStoreModel } from "./pub-store"

test("can be created", () => {
  const instance = PubStoreModel.create({})

  expect(instance).toBeTruthy()
})
