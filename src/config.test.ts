import { config } from "./config"

describe("config", () => {
  it("returns the production domain if no override", () => {
    expect(config.domain()).toEqual("https://api.prod.datarock.com.au/v2")
  })

  it("return override if present", () => {
    const prevDomain = process.env.DATAROCK_DOMAIN
    const d = "https://someotherdomain.com"
    process.env.DATAROCK_DOMAIN = d
    expect(config.domain()).toEqual(d)
    process.env.DATAROCK_DOMAIN = prevDomain
  })
})
