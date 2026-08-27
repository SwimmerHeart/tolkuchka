import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

export interface JwtPayload extends JWTPayload {
  sub: string; // user ID
  email: string;
  name: string;
  role: 'buyer' | 'seller';
}

function getSecret() {
  const secret = useRuntimeConfig().authSecret as string;
  if (!secret) throw new Error('NUXT_AUTH_SECRET не задан в .env');
  return new TextEncoder().encode(secret);
}

export async function signJwt(payload: JwtPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret());
}

export async function verifyJwt<T = JwtPayload>(token: string): Promise<T> {
  const { payload } = await jwtVerify(token, getSecret());
  return payload as T;
}
