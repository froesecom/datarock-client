import { CreateExportCommandInput } from "./"

export function createExportInputValidate({
  projectUuid,
  holeIds,
  artefactType,
}: CreateExportCommandInput): void {
  if (!projectUuid || projectUuid === "") {
    throw new Error("projectUuid is required")
  }
  if (!holeIds || !holeIds.length) {
    throw new Error("holeIds is required")
  }
  if (!artefactType || artefactType === "") {
    throw new Error("artefactType is required")
  }
}
