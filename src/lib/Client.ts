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
}

function validateParmas({ privateKey, email }: DatarockClientParams): void {
  if (!email || email === "") throw new Error("email is required")
  if (!privateKey || privateKey === "")
    throw new Error("privateKey is required")
}
