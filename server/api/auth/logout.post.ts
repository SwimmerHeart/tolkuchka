import { clearAuthCookie } from '#server/utils/cookies';

export default defineEventHandler(async (event) => {
  clearAuthCookie(event);

  return { ok: true };
});
