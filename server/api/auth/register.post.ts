import { signJwt } from '#server/utils/jwt';
import { mockUsers } from '#server/utils/mock-users';
import { serverRegisterSchema } from '#shared/schemas/auth.schema';
import { setAuthCookie } from '#server/utils/cookies';

export default defineEventHandler(async (event) => {
  const { name, email, password, role } = await readValidatedBody(event, (data) =>
    serverRegisterSchema.parse(data),
  );

  // 1. Ищем пользователя
  const user = mockUsers.find((u) => u.email === email);
  if (user)
    throw createError({ statusCode: 409, statusMessage: 'Пользователь уже зарегистрирован' });

  // Создаём пользователя (без хеширования — заглушка)
  const newUser = {
    id: crypto.randomUUID(),
    email,
    password, // plaintext — заменится на bcrypt когда будет Prisma
    name,
    role,
  };
  mockUsers.push(newUser);

  // Автоматически входим после регистрации
  const token = await signJwt({
    sub: newUser.id,
    email: newUser.email,
    name: newUser.name,
    role: newUser.role,
  });

  // Устанавливаем куку
  setAuthCookie(event, token);

  return {
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    },
  };
});
