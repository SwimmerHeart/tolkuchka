<template>
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <template v-if="isLoading">
      <USkeleton class="mb-8 h-9 w-40" />
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div class="flex flex-col gap-4">
          <USkeleton v-for="i in 2" :key="i" class="h-32 rounded-lg" />
        </div>
        <USkeleton class="h-64 rounded-lg" />
      </div>
    </template>

    <template v-else-if="lines.length === 0">
      <UEmpty
        icon="i-heroicons-shopping-cart"
        title="Корзина пуста"
        description="Вы ещё ничего не добавили — самое время подобрать товар на Толкучке"
        :actions="[
          { label: 'Перейти в каталог', color: 'primary', variant: 'solid', to: '/products' },
        ]"
        class="mx-auto max-w-md"
      />
    </template>

    <template v-else>
      <header class="mb-8 flex items-baseline justify-between gap-4">
        <h1 class="text-2xl font-semibold sm:text-3xl">Корзина</h1>
        <span class="text-sm text-muted">{{ totalQty }} шт.</span>
      </header>

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <div class="flex flex-col gap-4">
          <CartItem
            v-for="line in lines"
            :key="line.id"
            :line="line"
            @update-qty="onUpdateQty(line.id, $event)"
            @remove="onRemove(line)"
          />
        </div>

        <CartSummary :lines="available" :unavailable-count="unavailable.length" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import type { CartLine } from '#shared/schemas/cart.schema';

  const { items, isLoading, load, addToCart, updateQty, remove } = useCart();
  const productStore = useProductStore();

  await useAsyncData('cart-products', () => productStore.fetch(), {
    default: () => [],
  });

  onMounted(() => load());

  const lines = computed<CartLine[]>(() =>
    items.value.flatMap((item) => {
      const product = productStore.items.find((p) => p.id === item.id);
      return product ? [{ ...item, product }] : [];
    }),
  );

  const available = computed<CartLine[]>(() =>
    lines.value.filter((line) => (line.product.stock ?? 0) > 0),
  );
  const unavailable = computed<CartLine[]>(() =>
    lines.value.filter((line) => (line.product.stock ?? 0) === 0),
  );
  const totalQty = computed(() =>
    available.value.reduce((sum, line) => sum + line.qty, 0),
  );

  const toast = useToast();

  async function onUpdateQty(id: string, qty: number) {
    const line = lines.value.find((item) => item.id === id);
    const max = line?.product.stock ?? qty;
    const next = Math.min(Math.max(1, qty), max);
    await updateQty(id, next);
  }

  async function onRemove(line: CartLine) {
    await remove(line.id);
    toast.add({
      title: 'Товар удалён',
      color: 'warning',
      actions: [
        {
          label: 'Вернуть',
          onClick: () => addToCart(line.id, line.qty),
        },
      ],
    });
  }

  useSeoMeta({
    title: 'Корзина — Толкучка',
    description: 'Выбранные товары на Толкучке',
    robots: 'noindex',
  });
</script>