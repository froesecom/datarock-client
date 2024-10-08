import { CreateExportCommand, CreateExportCommandInput } from "./"
import { generateRequestHeaders } from "../../../auth"
import { TEST_KEY } from "../../../../__test__/TEST_KEY"
import { config } from "../../../../config"
import { v4 as uuidv4 } from "uuid"
import { createExportInputValidate } from "./validator"

jest.mock("./validator")
global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
  }),
) as jest.Mock
const projectUuid = uuidv4()
const holeIds = ["foo", "bar"]
const artefactType = "depth_registration"
const commandOptions = { projectUuid, holeIds, artefactType }

describe("CreateExportCommand", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const expectedEndpoint = `${config.domain()}/export/artefacts/${artefactType}`

  it("returns the endpoint", () => {
    const command = new CreateExportCommand(commandOptions)
    expect(command.endpoint()).toEqual(expectedEndpoint)
  })

  it("runs validations", () => {
    new CreateExportCommand(commandOptions)
    expect(createExportInputValidate).toHaveBeenCalledWith(commandOptions)
  })

  describe("export requests", () => {
    const email = "foo@test.com"
    const subject = async function (options: CreateExportCommandInput) {
      const command = new CreateExportCommand(options)
      const headers = generateRequestHeaders({
        email,
        privateKey: TEST_KEY,
        requestUrl: command.endpoint(),
      })
      await command.resolve({ auth: headers })
    }

    it("requests an export", async () => {
      await subject(commandOptions)
      const expectedOptions = {
        headers: {
          signature: expect.any(String),
          "x-api-user": email,
        },
        method: "POST",
        body: JSON.stringify({ projectUuid, holes: holeIds }),
      }
      expect(fetch).toHaveBeenCalledWith(expectedEndpoint, expectedOptions)
    })

    it("requests an export with timestamps", async () => {
      const lastUpdatedSince = Date.now() - 86400000
      const lastUpdatedBefore = Date.now()
      await subject({ ...commandOptions, lastUpdatedSince, lastUpdatedBefore })
      const expectedOptions = {
        headers: {
          signature: expect.any(String),
          "x-api-user": email,
        },
        method: "POST",
        body: JSON.stringify({
          projectUuid,
          holes: holeIds,
          lastUpdatedSince,
          lastUpdatedBefore,
        }),
      }
      expect(fetch).toHaveBeenCalledWith(expectedEndpoint, expectedOptions)
    })
  })
})
