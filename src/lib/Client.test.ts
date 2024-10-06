import { TEST_KEY } from "../__test__/TEST_KEY"
import { DatarockClient } from "./Client"

describe("DatarockClient", () => {
  const email = "foo@bar.com"
  const privateKey = TEST_KEY

  it("validates privateKey presence", () => {
    // @ts-expect-error at runtime may not have private key
    expect(() => new DatarockClient({ email })).toThrow(
      "privateKey is required",
    )
  })

  it("validates email presence", () => {
    // @ts-expect-error at runtime may not have email
    expect(() => new DatarockClient({ privateKey })).toThrow(
      "email is required",
    )
  })
})
