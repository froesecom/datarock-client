const PROD_DOMAIN = "https://api.prod.datarock.com.au/v2"

export const config = {
  domain: (): string => {
    return process.env.DATAROCK_DOMAIN || PROD_DOMAIN
  },
}
