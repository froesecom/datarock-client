import { createHash } from "crypto"
import jwt from "jsonwebtoken"

const REQUIRED_PARAMS = ["privateKey", "requestUrl", "email", "issuedTime"]
interface RequestParams {
  privateKey: string
  requestUrl: string
  email: string
  issuedTime?: Date
}

export interface AuthHeaders extends Record<string, string> {
  signature: string
  "x-api-user": string
}

function validatRequestParams(params: RequestParams): void {
  REQUIRED_PARAMS.forEach((key) => {
    // @ts-expect-error the keys match RequestParams
    if (!params[key] || params[key] === "") {
      throw new Error(`${key} is required when generating request headers!`)
    }
  })
}
export function generateRequestHeaders({
  privateKey,
  requestUrl,
  email,
  issuedTime = new Date(),
}: RequestParams): AuthHeaders {
  validatRequestParams({ privateKey, requestUrl, email, issuedTime })
  const iat = Math.floor(issuedTime.getTime() / 1000)
  const requestStringToHash = `${email}/${iat}/${requestUrl}`
  const jwtPayload = {
    requestHash: createHash("sha512").update(requestStringToHash).digest("hex"),
    iat,
  }

  return {
    signature: jwt.sign(jwtPayload, privateKey, { algorithm: "RS256" }),
    "x-api-user": email,
  }
}
