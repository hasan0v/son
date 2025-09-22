import { SignJWT, jwtVerify, JWTPayload } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export async function signAdminJwt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret)
}

export async function verifyAdminJwt(token: string) {
  const { payload } = await jwtVerify(token, secret)
  return payload
}