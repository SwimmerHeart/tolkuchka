import type { H3Event } from 'h3'

export const AUTH_COOKIE = {
  name: 'auth_token',
  maxAge: 60 * 60 * 24 * 7, // 7 дней
  options: {
    httpOnly: true,
    secure: !import.meta.dev,
    sameSite: 'lax' as const,
    path: '/',
  },
} as const

export function setAuthCookie(event: H3Event, token: string) {
  setCookie(event, AUTH_COOKIE.name, token, {
    ...AUTH_COOKIE.options,
    maxAge: AUTH_COOKIE.maxAge,
  })
}

export function clearAuthCookie(event: H3Event) {
  setCookie(event, AUTH_COOKIE.name, '', {
    ...AUTH_COOKIE.options,
    maxAge: 0, // истекает немедленно
  })
}
