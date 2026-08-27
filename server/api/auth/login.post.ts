import { signJwt } from '#server/utils/jwt';
import { mockUsers } from '#server/utils/mock-users';
import { loginSchema } from '#shared/schemas/auth.schema';
import { setAuthCookie } from '#server/utils/cookies';

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, (data) => loginSchema.parse(data));

  // 1. Ищем пользователя
  const user = mockUsers.find((u) => u.email === email && u.password === password);
  if (!user) throw createError({ statusCode: 401, statusMessage: 'Неверный email или пароль' });

  // 2. Создаём JWT
  const token = await signJwt({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  // 3. Устанавливаем куку
  setAuthCookie(event, token);

  // 4. Возвращаем пользователя (без пароля!)
  return {
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  };
});
