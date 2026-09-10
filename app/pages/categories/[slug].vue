<template>
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <div class="mb-8">
      <h1 class="text-2xl font-bold sm:text-3xl">{{ category.name }}</h1>
      <p class="mt-2 text-muted">Найдено товаров: {{ total }}</p>
    </div>

    <CatalogFilters :show-category-filter="false" @reset="reset" />

    <ProductGrid :items="paginated" :loading="pending" :show-reset="false" />

    <div class="mt-8 flex justify-center">
      <UPagination
        v-model:page="page"
        :items-per-page="perPage"
        :total="total"
        :sibling-count="2"
        :show-edges="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Category } from '#shared/schemas/product.schema';

  const store = useProductStore();
  const route = useRoute();

  const { pending } = await useAsyncData('products-catalog', () => store.fetch(), {
    default: () => [],
  });
  const { paginated, total, perPage } = storeToRefs(store);

  function findCategory(slug: string | string[] | undefined): Category {
    const category = store.categories.find((c) => c.slug === slug);
    if (!category) throw createError({ statusCode: 404, statusMessage: 'Категория не найдена' });
    return category;
  }

  const category = computed(() => findCategory(route.params.slug));

  watch(
    () => route.params.slug,
    () => store.applyCategory(category.value.id),
    { immediate: true },
  );

  const page = computed({
    get: () => store.page,
    set: (v: number) => store.setPage(v),
  });

  function reset() {
    store.applyCategory(category.value.id);
  }

  useSeoMeta({
    title: () => (category.value ? `${category.value.name} — Толкучка` : 'Категория — Толкучка'),
    description: () =>
      category.value ? `Товары категории "${category.value.name}" на Толкучке.` : '',
    ogTitle: () =>
      category.value ? `${category.value.name} — Толкучка` : 'Категория — Толкучка',
    ogDescription: () =>
      category.value ? `Товары категории "${category.value.name}" на Толкучке.` : '',
  });
</script>
