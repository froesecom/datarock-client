import { createExportInputValidate } from "./validator"
import { v4 as uuidv4 } from "uuid"

const projectUuid = uuidv4()
const holeIds = ["foo", "bar"]
const artefactType = "depth_registration"
const commandOptions = { projectUuid, holeIds, artefactType }

describe("createExportInputValidate()", () => {
  it("validates the projectUuid presence", () => {
    const { projectUuid: _p, ...rest } = commandOptions
    // @ts-expect-error testing the runtime case
    expect(() => createExportInputValidate(rest)).toThrow(
      "projectUuid is required",
    )
  })

  it("validates the holeIds presence", () => {
    const { holeIds: _h, ...rest } = commandOptions
    // @ts-expect-error testing the runtime case
    expect(() => createExportInputValidate(rest)).toThrow("holeIds is required")
  })

  it("validates the holeIds not empty", () => {
    const options = { ...commandOptions, holeIds: [] }
    expect(() => createExportInputValidate(options)).toThrow(
      "holeIds is required",
    )
  })

  it("validates the artefactType presence", () => {
    const { artefactType: _a, ...rest } = commandOptions
    // @ts-expect-error testing the runtime case
    expect(() => createExportInputValidate(rest)).toThrow(
      "artefactType is required",
    )
  })
})
