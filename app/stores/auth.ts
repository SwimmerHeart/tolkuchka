import { defineStore } from 'pinia';
import type { PublicUser } from '#shared/schemas/user.schema';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<PublicUser | null>(null);

  async function login({ email, password }: { email: string; password: string }) {
    const { user: u } = await $fetch<{ user: PublicUser }>('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    user.value = u;

    return u;
  }

  async function register(data: Omit<PublicUser, 'id'> & { password: string }) {
    const { user: u } = await $fetch<{ user: PublicUser }>('/api/auth/register', {
      method: 'POST',
      body: data,
    });
    user.value = u;

    return u;
  }

  async function logout() {
    await $fetch('/api/auth/logout', { method: 'POST' });
    user.value = null;
  }

  async function fetchUser() {
    try {
      const { user: u } = await $fetch<{ user: PublicUser }>('/api/auth/me');
      user.value = u;
    } catch {
      user.value = null; // 401 — просто гость
    }
  }

  return { user, login, register, logout, fetchUser };
});
