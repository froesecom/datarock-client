import { Command, CommandInput, CommandOutput } from "../Command"
import { config } from "../../../config"

const PATH = "/projects"

export class ListProjectsCommand extends Command {
  public async resolve({ auth }: CommandInput): CommandOutput {
    return await fetch(this.endpoint(), { method: "GET", headers: auth })
  }

  public endpoint(): string {
    return `${config.domain()}${PATH}`
  }
}
