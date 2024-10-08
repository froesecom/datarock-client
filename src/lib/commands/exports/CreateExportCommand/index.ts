import { Command, CommandInput, CommandOutput } from "../../Command"
import { config } from "../../../../config"
import { createExportInputValidate } from "./validator"

export interface CreateExportCommandInput {
  projectUuid: string
  holeIds: string[]
  artefactType: string
  lastUpdatedBefore?: number
  lastUpdatedSince?: number
}

export class CreateExportCommand extends Command {
  private projectUuid: string
  private holeIds: string[]
  private artefactType: string
  private lastUpdatedBefore?: number
  private lastUpdatedSince?: number

  constructor(input: CreateExportCommandInput) {
    super()
    createExportInputValidate(input)
    const {
      projectUuid,
      holeIds,
      artefactType,
      lastUpdatedSince,
      lastUpdatedBefore,
    } = input
    this.projectUuid = projectUuid
    this.holeIds = holeIds
    this.artefactType = artefactType
    this.lastUpdatedSince = lastUpdatedSince
    this.lastUpdatedBefore = lastUpdatedBefore
  }

  public async resolve({ auth }: CommandInput): CommandOutput {
    return await fetch(this.endpoint(), {
      method: "POST",
      headers: auth,
      body: this.requestBody(),
    })
  }

  public endpoint(): string {
    return `${config.domain()}${this.path()}`
  }

  private path(): string {
    return `/export/artefacts/${this.artefactType}`
  }

  private requestBody(): string {
    const body: Record<string, number | string | string[]> = {
      projectUuid: this.projectUuid,
      holes: this.holeIds,
    }
    if (this.lastUpdatedSince) {
      body.lastUpdatedSince = this.lastUpdatedSince
    }
    if (this.lastUpdatedBefore) {
      body.lastUpdatedBefore = this.lastUpdatedBefore
    }

    return JSON.stringify(body)
  }
}
