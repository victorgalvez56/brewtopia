import { EmailModel } from "./email-store"

test("can be created", () => {
  const instance = EmailModel.create({})

  expect(instance).toBeTruthy()
})
