import type { CartItem } from '#shared/schemas/cart.schema';

// ── Типизированные заглушки корзины ────────────────────────────────────────
// TODO(#29): заменить тела на $fetch('/api/cart') после появления CRUD корзины
// на бэке. Сигнатуры совпадают с будущим API — менять их не нужно.
async function fetchCartStub(): Promise<CartItem[]> {
  return [];
}
async function addToCartStub(_id: string, _qty: number): Promise<void> {}
async function updateCartItemStub(_id: string, _qty: number): Promise<void> {}
async function removeCartItemStub(_id: string): Promise<void> {}
// ────────────────────────────────────────────────────────────────────────────

const items = ref<CartItem[]>([]);
const isLoading = ref(false);
let hydrated = false;

export function useCart() {
  async function load() {
    if (!import.meta.client || hydrated) return;
    isLoading.value = true;
    try {
      // TODO(#30): после появления Pinia-стора состояние корзины переедет туда.
      items.value = await fetchCartStub();
    } finally {
      isLoading.value = false;
      hydrated = true;
    }
  }

  async function addToCart(id: string, qty: number): Promise<void> {
    await addToCartStub(id, qty);
  }

  async function updateQty(id: string, qty: number): Promise<void> {
    await updateCartItemStub(id, qty);
  }

  async function remove(id: string): Promise<void> {
    await removeCartItemStub(id);
  }

  const count = computed(() => items.value.reduce((sum, item) => sum + item.qty, 0));

  return { items, count, isLoading, load, addToCart, updateQty, remove };
}