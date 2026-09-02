import { NuxtAuthHandler } from '#auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { mockUsers } from '#server/utils/mock-users';

// Runtime-нюанс next-auth@4 под Vite: CJS-модуль экспортирует функцию через
// exports.default, и сборка отдаёт namespace вместо функции. Чиним в одном месте:
// говорим TS «у импорта есть свойство default, тип которого = типу самого импорта»,
// поэтому все остальные типы (authorize, credentials) выводятся как раньше.
const Credentials = (
  CredentialsProvider as unknown as { default: typeof CredentialsProvider }
).default


export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret, // .env через runtimeConfig, next-auth подписывает им JWT и шифрует cookie-значения.
  pages: { signIn: '/auth/login' }, // Куда редиректить неавторизованного, когда защищённая страница закрыта
  callbacks: {
    // user типизирован как User | AdapterUser; наша аугментация добавляет role в User
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    // session() вызывается на каждый запрос /api/auth/session (и SSR-гидрацию).
    // БЕРЁт данные из токена и перекладывает в то, что видит клиент: session.user.
    // Без этого блока клиент получил бы user без нашего поля role.
    async session({ session, token }) {
      if (session.user) {
        if (token.sub) session.user.id = token.sub;
        // token.role — опциональный, поэтому требуется сужение (каст) при присваивании в обязательное поле
        session.user.role = token.role as 'buyer' | 'seller';
      }
      return session;
    },
  },
  // Здесь описываем ВСЕ способы входа. Пока один — логин/пароль.
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        // Поля формы входа, которые next-auth ждёт от клиента.
        email: { label: 'Email', type: 'email' },
        password: { label: 'Пароль', type: 'password' },
      },
      async authorize(credentials) {
        const user = mockUsers.find(
          (u) => u.email === credentials?.email && u.password === credentials?.password,
        );

        // Возвращаем только поля, которые пойдут в JWT (id автоматически попадёт в sub).
        return user ? { id: user.id, email: user.email, name: user.name, role: user.role } : null;
      },
    }),
  ],
});
