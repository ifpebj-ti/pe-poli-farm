export interface MyJwtPayload {
  unique_name: String,
  role: String,
  email: String,
  userId: String,
  position: String,
  firstAccess: String,
  active: String,
  "nbf": Number,
  "exp": Number,
  "iat": Number,
  "iss": String,
  "aud": String
}