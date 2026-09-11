import * as z from 'zod';
import type { Product } from './product.schema';

/**
 * Контракт корзины.
 * Клиентский слой (useCartStore) оперирует товаром напрямую: id — это productId.
 * После появления server/api/cart/* (#29) эти же типы вернёт бэкенд.
 */

export const cartItemSchema = z.object({
  id: z.string(), // productId
  qty: z.number().int().positive(),
});

export type CartItem = z.output<typeof cartItemSchema>;

/** Позиция корзины, обогащённая живыми данными товара (join на клиенте). */
export type CartLine = CartItem & {
  product: Product;
};