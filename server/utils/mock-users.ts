export interface MockUser {
  id: string;
  email: string;
  password: string; // хардкод, plaintext — заглушка до Prisma
  name: string;
  role: 'buyer' | 'seller';
}

// Эмуляция "БД в памяти": при register добавляем сюда
export const mockUsers: MockUser[] = [
  { id: '1', email: 'buyer@test.com', password: 'Test1234!', name: 'Покупатель', role: 'buyer' },
  { id: '2', email: 'seller@test.com', password: 'Test1234!', name: 'Продавец', role: 'seller' },
];
