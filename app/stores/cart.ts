import { defineStore } from 'pinia';
import type { CartItem } from '#shared/schemas/cart.schema';

let hydrated = false; // SSR-гард: корзина живёт только на клиенте

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    isLoading: false,
  }),

  getters: {
    count(): number {
      return this.items.reduce((sum, item) => sum + item.qty, 0);
    },
  },

  actions: {
    async load() {
      if (!import.meta.client || hydrated) return;
      this.isLoading = true;
      try {
        // TODO(#29): после появления CRUD корзины на бэке заменить на:
        // this.items = await $fetch<CartItem[]>('/api/cart')
      } finally {
        this.isLoading = false;
        hydrated = true;
      }
    },
    async addToCart(id: string, qty: number) {
      // TODO(#29): заменить на $fetch POST /api/cart + sync стейта с ответом
      const existing = this.items.find((item) => item.id === id);
      if (existing) existing.qty += qty;
      else this.items.push({ id, qty });
    },
    async updateQty(id: string, qty: number) {
      // TODO(#29): заменить на $fetch PATCH /api/cart/[id]
      const item = this.items.find((i) => i.id === id);
      if (item) item.qty = Math.max(1, qty);
    },
    async remove(id: string) {
      // TODO(#29): заменить на $fetch DELETE /api/cart/[id]
      const index = this.items.findIndex((i) => i.id === id);
      if (index !== -1) this.items.splice(index, 1);
    },
  },
});