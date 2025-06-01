export interface MyJwtPayload {
  unique_name: string,
  role: string,
  email: string,
  userId: string,
  position: string,
  firstAccess: string,
  active: string,
  "nbf": number,
  "exp": number,
  "iat": number,
  "iss": string,
  "aud": string
}