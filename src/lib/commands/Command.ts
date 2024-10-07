import { AuthHeaders } from "../auth"

export interface CommandInput {
  auth: AuthHeaders
  options?: object
}

export type CommandOutput = Promise<Response>

export abstract class Command {
  abstract resolve(input: CommandInput): CommandOutput
  abstract endpoint(): string
}
