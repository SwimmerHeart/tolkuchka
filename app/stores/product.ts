import { defineStore } from 'pinia';
import type { Product, Category } from '#shared/schemas/product.schema';
import { products, categories } from '#shared/mocks/products';

export type SortKey = 'relevance' | 'priceAsc' | 'priceDesc' | 'rating';

interface CatalogFilters {
  categoryId: string | null;
  q: string;
  priceMin: number | null;
  priceMax: number | null;
}

export const useProductStore = defineStore('product', {
  state: () => ({
    items: [] as Product[],
    categories: [] as Category[],
    filters: {
      categoryId: null,
      q: '',
      priceMin: null,
      priceMax: null,
    } as CatalogFilters,
    sort: 'relevance' as SortKey,
    page: 1,
    perPage: 12, // 36 товаров → ровно 3 страницы
    loaded: false, // кэш-флаг: повторный fetch не перезатирает данные
  }),

  getters: {
    filtered(): Product[] {
      const { q, categoryId, priceMin, priceMax } = this.filters;
      const query = q.trim().toLowerCase();
      return this.items.filter((p) => {
        const byQ =
          !query ||
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query);
        const byCategory = !categoryId || p.category.id === categoryId;
        const byMin = priceMin === null || p.price >= priceMin;
        const byMax = priceMax === null || p.price <= priceMax;
        return byQ && byCategory && byMin && byMax;
      });
    },
    sorted(): Product[] {
      const arr = [...this.filtered];
      switch (this.sort) {
        case 'priceAsc':
          return arr.sort((a, b) => a.price - b.price);
        case 'priceDesc':
          return arr.sort((a, b) => b.price - a.price);
        case 'rating':
          return arr.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        default:
          return arr; // relevance = порядок 'как в данных'
      }
    },
    paginated(): Product[] {
      const start = (this.page - 1) * this.perPage;
      return this.sorted.slice(start, start + this.perPage);
    },
    total(): number {
      return this.filtered.length;
    },
    totalPages(): number {
      return Math.max(1, Math.ceil(this.total / this.perPage));
    },
  },

  actions: {
    // TODO(api): после появления API заменить на:
    // const data = await $fetch<{ products: Product[]; categories: Category[] }>('/api/products')
    // и убрать import моков сверху.
    async fetch(): Promise<Product[]> {
      if (this.loaded) return this.items;
      const data = await Promise.resolve({ products, categories });
      this.items = data.products;
      this.categories = data.categories;
      this.loaded = true;
      return this.items;
    },
    setCategory(categoryId: string | null) {
      this.filters.categoryId = categoryId;
      this.page = 1;
    },
    setQuery(q: string) {
      this.filters.q = q;
      this.page = 1;
    },
    setPriceRange(min: number | null, max: number | null) {
      this.filters.priceMin = min;
      this.filters.priceMax = max;
      this.page = 1;
    },
    setSort(sort: SortKey) {
      this.sort = sort;
      this.page = 1;
    },
    setPage(page: number) {
      this.page = page;
    },
    resetFilters() {
      this.filters = { categoryId: null, q: '', priceMin: null, priceMax: null };
      this.sort = 'relevance';
      this.page = 1;
    },
  },
});
