import { API_BASE_URL, API_ENDPOINTS } from "@/constants/api";
import { ProductsListSchema, type Product } from "./api.types";

export async function getProductsList(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PRODUCTS.GET_ALL}`);
  if (!response.ok) throw new Error('Network error: ' + response.statusText);
  
  const rawData = await response.json();
  const validation = ProductsListSchema.safeParse(rawData);
  
  if (!validation.success) {
    console.error('Invalid server response:', validation.error);
    throw new Error('Server response validation failed');
  }
  
  return validation.data;
}