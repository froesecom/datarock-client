import { ListHolesCommand } from "./ListHolesCommand"
import { generateRequestHeaders } from "../../auth"
import { TEST_KEY } from "../../../__test__/TEST_KEY"
import { config } from "../../../config"
import { v4 as uuidv4 } from "uuid"

global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
  }),
) as jest.Mock
const projectUuid = uuidv4()

describe("ListHolesCommand", () => {
  const expectedEndpoint = `${config.domain()}/projects/${projectUuid}/holes`

  it("returns the endpoint", () => {
    const command = new ListHolesCommand({ projectUuid })
    expect(command.endpoint()).toEqual(expectedEndpoint)
  })

  it("validates the input", () => {
    // @ts-expect-error testing the runtime case
    expect(() => new ListHolesCommand({})).toThrow("projectUuid is required")
  })

  it("requests holes", async () => {
    const email = "foo@test.com"
    const command = new ListHolesCommand({ projectUuid })
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
