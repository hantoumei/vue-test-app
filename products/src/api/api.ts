import { API_BASE_URL, API_ENDPOINTS } from "@/constants/api";
import { ProductsListSchema, type Product } from "./api.types";
import { SERVER_ERRORS } from "@/constants/errors";
import type { ORDER, SORT_BY } from "@/constants/shared";

export async function getProductsList(
  page: number,
  limit: number,
  sortBy: SORT_BY,
  order: ORDER,
  filters: Record<string, string>,
  search?: string
): Promise<Product[]> {
  const url = new URL(`${API_BASE_URL}${API_ENDPOINTS.PRODUCTS.GET}`);
  url.searchParams.append('page', page.toString());
  url.searchParams.append('limit', limit.toString());
  url.searchParams.append('sortBy', sortBy);
  url.searchParams.append('order', order);

  for (const [key, value] of Object.entries(filters)) {
    url.searchParams.append(key, value);
  }

  if (search) {
    url.searchParams.append('productName', search);
  }

  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === SERVER_ERRORS.NOT_FOUND) {
      return []; // Return empty array if no products found
    }
    throw new Error('Network error: ' + response.status);
  }
  
  const rawData = await response.json();
  const validation = ProductsListSchema.safeParse(rawData);
  
  if (!validation.success) {
    console.error('Invalid server response:', validation.error);
    throw new Error('Server response validation failed');
  }
  
  return validation.data;
}


// Since the API doesn't return total count, we fetch the products and return the length of the array as count.
// In a real-world scenario, the API should include total count in the response for better performance.
export async function getProductsCount(
  page: number,
  filters: Record<string, string>,
  search?: string
): Promise<number> {
  const url = new URL(`${API_BASE_URL}${API_ENDPOINTS.PRODUCTS.GET}`);
  url.searchParams.append('page', page.toString());

  for (const [key, value] of Object.entries(filters)) {
    url.searchParams.append(key, value);
  }

  if (search) {
    url.searchParams.append('productName', search);
  }

  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === SERVER_ERRORS.NOT_FOUND) {
      return 0; // Return 0 if no products found
    }
    throw new Error('Network error: ' + response.status);
  }
  
  const rawData = await response.json();
  const validation = ProductsListSchema.safeParse(rawData);
  
  if (!validation.success) {
    console.error('Invalid server response:', validation.error);
    throw new Error('Server response validation failed');
  }
  
  return validation.data.length;
}