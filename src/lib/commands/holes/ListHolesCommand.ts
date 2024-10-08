import { Command, CommandInput, CommandOutput } from "../Command"
import { config } from "../../../config"

export interface ListHolesCommandInput {
  projectUuid: string
}

function holesCommandInputValidate({
  projectUuid,
}: ListHolesCommandInput): void {
  if (!projectUuid || projectUuid === "") {
    throw new Error("projectUuid is required")
  }
}

export class ListHolesCommand extends Command {
  private projectUuid: string

  constructor({ projectUuid }: ListHolesCommandInput) {
    super()
    holesCommandInputValidate({ projectUuid })
    this.projectUuid = projectUuid
  }

  public async resolve({ auth }: CommandInput): CommandOutput {
    return await fetch(this.endpoint(), { method: "GET", headers: auth })
  }

  public endpoint(): string {
    return `${config.domain()}${this.path()}`
  }

  private path(): string {
    return `/projects/${this.projectUuid}/holes`
  }
}
