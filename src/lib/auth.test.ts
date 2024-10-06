import { generateRequestHeaders } from "./auth"
import { TEST_KEY } from "../__test__/TEST_KEY"

describe("generateRequestHeaders()", () => {
  const email = "foo@test.com"
  const requestUrl = "https://someurl.com"

  it("generates request headers", () => {
    const headers = generateRequestHeaders({
      email,
      privateKey: TEST_KEY,
      requestUrl,
    })
    const expected = {
      signature: expect.any(String),
      "x-api-user": email,
    }
    expect(headers).toEqual(expected)
  })

  test.each`
    privateKey   | requestUrl    | email        | issuedTime
    ${undefined} | ${requestUrl} | ${email}     | ${new Date()}
    ${TEST_KEY}  | ${undefined}  | ${email}     | ${new Date()}
    ${TEST_KEY}  | ${requestUrl} | ${undefined} | ${new Date()}
  `("throws an error if headers are missing", (headers) => {
    expect(() => {
      generateRequestHeaders(headers)
    }).toThrow("is required when generating request headers!")
  })
})
