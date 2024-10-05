import { helloWorld } from "./"

describe("helloWorld()", () => {
  it("is true", () => {
    helloWorld()
    expect(true).toBeTruthy()
  })
})
