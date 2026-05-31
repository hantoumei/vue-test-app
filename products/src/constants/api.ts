export const API_BASE_URL = 'https://6a1bf0038858a003817b54eb.mockapi.io/api/';

export const API_ENDPOINTS = {
  PRODUCTS: {
    GET: 'products',
    GET_BY_ID: (id: string) => `products/${id}`,
  },
} as const;