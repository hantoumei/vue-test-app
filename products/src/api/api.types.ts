import { z } from 'zod';

export const ProductSchema = z.object({
  "createdAt": z.iso.datetime(),
    "productName": z.string().max(255),
    "productDescription": z.string().max(255),
    "productPrice": z.string().regex(/^\d+\.\d+$/),
    "productIsNew": z.boolean(),
    "productImage": z.string().url(),
    "keywords": z.string().max(255),
    "userName": z.string().max(255),
    "userImage": z.string().url(),
    "id": z.string()
});

export const ProductsListSchema = z.array(ProductSchema);

export type Product = z.infer<typeof ProductSchema>;

export type ORDER = 'asc' | 'desc';