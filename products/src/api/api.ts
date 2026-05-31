import { API_BASE_URL, API_ENDPOINTS } from "@/constants/api";
import { ProductsListSchema, type ORDER, type Product } from "./api.types";

export async function getProductsList(
  page: number,
  limit: number,
  sortBy: string,
  order: ORDER,
  filters: Record<string, string>
): Promise<Product[]> {
  const url = new URL(`${API_BASE_URL}${API_ENDPOINTS.PRODUCTS.GET}`);
  url.searchParams.append('page', page.toString());
  url.searchParams.append('limit', limit.toString());
  url.searchParams.append('sortBy', sortBy);
  url.searchParams.append('order', order);

  for (const [key, value] of Object.entries(filters)) {
    url.searchParams.append(key, value);
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error('Network error: ' + response.statusText);
  
  const rawData = await response.json();
  const validation = ProductsListSchema.safeParse(rawData);
  
  if (!validation.success) {
    console.error('Invalid server response:', validation.error);
    throw new Error('Server response validation failed');
  }
  
  return validation.data;
}