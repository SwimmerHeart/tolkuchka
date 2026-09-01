<template>
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <div class="mb-8">
      <h1 class="text-2xl font-bold sm:text-3xl">Каталог товаров</h1>
      <p class="mt-2 text-muted">Найдено: {{ total }}</p>
    </div>

    <div class="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div class="flex flex-wrap items-center gap-4">
        <UInput
          v-model="search"
          icon="i-heroicons-magnifying-glass"
          placeholder="Поиск по каталогу"
          class="w-full sm:w-72"
        />
        <USelect v-model="category" :items="categoryOptions" placeholder="Категория" class="w-48" />
        <div class="flex items-center gap-2">
          <UInput
            v-model="priceMin"
            type="number"
            inputmode="numeric"
            placeholder="Цена от"
            class="w-28"
          />
          <span class="text-muted">—</span>
          <UInput
            v-model="priceMax"
            type="number"
            inputmode="numeric"
            placeholder="до"
            class="w-28"
          />
        </div>
        <UButton color="neutral" variant="ghost" @click="reset"> Сбросить </UButton>
      </div>

      <USelect v-model="sort" :items="sortOptions" class="w-56" />
    </div>

    <ProductGrid :items="paginated" :loading="pending" @reset="reset" />

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
  import type { SortKey } from '~/stores/product';

  const store = useProductStore();
  const { pending } = await useAsyncData('products-catalog', () => store.fetch(), {
    default: () => [],
  });
  const { paginated, total, perPage } = storeToRefs(store);

  const search = ref('');
  watch(search, (v) => store.setQuery(v));

  const category = ref<string | undefined>();
  const categoryOptions = computed(() =>
    store.categories.map((c) => ({ label: c.name, value: c.id })),
  );

  watch(category, (v) => store.setCategory(v ?? null));

  const sortOptions = [
    { label: 'По релевантности', value: 'relevance' },
    { label: 'Сначала дешевле', value: 'priceAsc' },
    { label: 'Сначала дороже', value: 'priceDesc' },
    { label: 'По рейтингу', value: 'rating' },
  ] satisfies { label: string; value: SortKey }[];

  const sort = ref<SortKey>('relevance');
  watch(sort, (v) => store.setSort(v));

  const priceMin = ref<string>('');
  const priceMax = ref<string>('');
  watch([priceMin, priceMax], () =>
    store.setPriceRange(
      priceMin.value ? Number(priceMin.value) : null,
      priceMax.value ? Number(priceMax.value) : null,
    ),
  );

  const page = computed({
    get: () => store.page,
    set: (v: number) => store.setPage(v),
  });

  function reset() {
    search.value = '';
    category.value = undefined;
    priceMin.value = '';
    priceMax.value = '';
    sort.value = 'relevance';
    store.resetFilters();
  }

  useSeoMeta({
    title: 'Каталог товаров — Толкучка',
    description:
      'Найдите товары от продавцов: электроника, дом и кухня, одежда, спорт, книги, игрушки.',
    ogTitle: 'Каталог товаров — Толкучка',
    ogDescription: 'Каталог маркетплейса Толкучка.',
  });
</script>
