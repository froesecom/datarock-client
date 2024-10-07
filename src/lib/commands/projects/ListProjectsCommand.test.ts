import { ListProjectsCommand } from "./ListProjectsCommand"
import { generateRequestHeaders } from "../../auth"
import { TEST_KEY } from "../../../__test__/TEST_KEY"
import { config } from "../../../config"

global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
  }),
) as jest.Mock

describe("ListProjectsCommand", () => {
  const expectedEndpoint = `${config.domain()}/projects`

  it("returns the endpoint", () => {
    const command = new ListProjectsCommand()
    expect(command.endpoint()).toEqual(expectedEndpoint)
  })

  it("requests projects", async () => {
    const email = "foo@test.com"
    const command = new ListProjectsCommand()
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
