import { ListExportsCommand, ListExportsCommandInput } from "./"
import { generateRequestHeaders } from "../../../auth"
import { TEST_KEY } from "../../../../__test__/TEST_KEY"
import { config } from "../../../../config"

global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
  }),
) as jest.Mock

describe("ListExportsCommand", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const expectedEndpoint = `${config.domain()}/export/artefacts`

  it("returns the endpoint", () => {
    const command = new ListExportsCommand()
    expect(command.endpoint()).toEqual(expectedEndpoint)
  })

  it("appends the limit", () => {
    const limit = 100
    const command = new ListExportsCommand({ limit })
    expect(command.endpoint()).toEqual(`${expectedEndpoint}?limit=${limit}`)
  })

  it("appends the offset", () => {
    const offset = 10
    const command = new ListExportsCommand({ offset })
    expect(command.endpoint()).toEqual(`${expectedEndpoint}?offset=${offset}`)
  })

  it("appends the offset and limit", () => {
    const offset = 10
    const limit = 120
    const command = new ListExportsCommand({ offset, limit })
    expect(command.endpoint()).toEqual(
      `${expectedEndpoint}?limit=${limit}&offset=${offset}`,
    )
  })

  it("requests a list of exports", async () => {
    const email = "foo@test.com"
    const command = new ListExportsCommand()
    const headers = generateRequestHeaders({
      email,
      privateKey: TEST_KEY,
      requestUrl: command.endpoint(),
    })
    await command.resolve({ auth: headers })
    const expectedOptions = {
      headers: {
        signature: expect.any(String),
        "x-api-user": email,
      },
      method: "GET",
    }
    expect(fetch).toHaveBeenCalledWith(expectedEndpoint, expectedOptions)
  })
})
