import * as z from 'zod';

/**
 * Контракт каталога (task 21–22). После появления API (task 20)
 * эти же типы вернёт server/api/products.
 */

export const categorySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
});

export type Category = z.output<typeof categorySchema>;

export const productSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number().int().positive(),
  oldPrice: z.number().int().positive().optional(),
  // Фото пока нет → placeholder-блок, позже подставится imageUrl
  imageUrl: z.string().nullable().optional(),
  rating: z.number().min(0).max(5).optional(),
  category: categorySchema,
});

export type Product = z.output<typeof productSchema>;
