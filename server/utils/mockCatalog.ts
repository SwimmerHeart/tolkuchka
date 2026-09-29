import { categories, products } from '#shared/mocks/products';

// Во время nitro-пререндера (сборка) БД может быть недоступна (host/hosting-билд).
// Отдаём снапшот из mock-каталога — в проде (runtime) handler использует Prisma.
export const isPrerender = import.meta.prerender === true;

export function mockCategoriesPayload() {
  return categories.map(({ id, slug, name }) => ({ id, slug, name }));
}

export function mockProductsPayload(options: { q?: string; sort?: string; page?: number; perPage?: number } = {}) {
  const { q, sort = 'relevance', page = 1, perPage = 8 } = options;

  let list = [...products];
  if (q) {
    const needle = q.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(needle) ||
        (p.description ?? '').toLowerCase().includes(needle),
    );
  }

  const sorters: Record<string, (a: (typeof products)[number], b: (typeof products)[number]) => number> = {
    relevance: () => 0,
    priceAsc: (a, b) => a.price - b.price,
    priceDesc: (a, b) => b.price - a.price,
    rating: (a, b) => (b.rating ?? 0) - (a.rating ?? 0),
  };
  list = [...list].sort(sorters[sort] ?? sorters.relevance);

  const total = list.length;
  const start = (page - 1) * perPage;
  const items = list.slice(start, start + perPage).map((p) => ({
    ...p,
    description: p.description ?? '',
    rating: p.rating ?? undefined,
  }));

  return { products: items, total, page, perPage };
}

export function mockPromoPayload() {
  const deals = products
    .filter((p) => p.oldPrice != null && p.oldPrice > 0)
    .filter((p) => {
      const discount = 1 - p.price / (p.oldPrice as number);
      return discount >= 0.1 && discount <= 0.8;
    })
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

  return {
    products: deals.slice(0, 14).map((p) => ({
      ...p,
      description: p.description ?? '',
      rating: p.rating ?? undefined,
    })),
    total: deals.length,
    page: 1,
    perPage: 14,
  };
}