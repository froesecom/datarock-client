import { Command, CommandInput, CommandOutput } from "../../Command"
import { config } from "../../../../config"

export interface ListExportsCommandInput {
  limit?: number
  offset?: number
}

export class ListExportsCommand extends Command {
  private limit?: number
  private offset?: number

  constructor(input: ListExportsCommandInput = {}) {
    super()
    const { limit, offset } = input
    this.limit = limit
    this.offset = offset
  }

  public async resolve({ auth }: CommandInput): CommandOutput {
    return await fetch(this.endpoint(), {
      method: "GET",
      headers: auth,
    })
  }

  public endpoint(): string {
    return `${config.domain()}${this.path()}`
  }

  private path(): string {
    const path = `/export/artefacts`
    const params = [
      { key: "limit", value: this.limit },
      { key: "offset", value: this.offset },
    ].filter(({ key: _, value }) => value)

    return params.length
      ? params.reduce((accum, { key, value }, index) => {
          return index === 0
            ? `${accum}${key}=${value}`
            : `${accum}&${key}=${value}`
          return accum
        }, `${path}?`)
      : path
  }
}
