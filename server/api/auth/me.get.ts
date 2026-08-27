import { verifyJwt } from '#server/utils/jwt';
import { mockUsers } from '#server/utils/mock-users';
import { AUTH_COOKIE } from '#server/utils/cookies';

export default defineEventHandler(async (event) => {
  const token = getCookie(event, AUTH_COOKIE.name);
  if (!token) throw createError({ statusCode: 401, statusMessage: 'Не авторизован' });

  const payload = await verifyJwt(token);
  const user = mockUsers.find((u) => u.id === payload.sub);
  if (!user) throw createError({ statusCode: 401, statusMessage: 'Пользователь не найден' });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
});
