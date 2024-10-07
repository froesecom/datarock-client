import { Command, CommandOutput } from "./commands/Command"
import { generateRequestHeaders } from "./auth"

interface DatarockClientParams {
  privateKey: string
  email: string
}

export class DatarockClient {
  private email: string
  private privateKey: string

  constructor({ privateKey, email }: DatarockClientParams) {
    validateParmas({ privateKey, email })
    this.email = email
    this.privateKey = privateKey
  }

  public async send(command: Command): CommandOutput {
    // TODO: implement options
    const auth = generateRequestHeaders({
      email: this.email,
      privateKey: this.privateKey,
      requestUrl: command.endpoint(),
    })
    return command.resolve({ auth })
  }
}

function validateParmas({ privateKey, email }: DatarockClientParams): void {
  if (!email || email === "") throw new Error("email is required")
  if (!privateKey || privateKey === "")
    throw new Error("privateKey is required")
}
