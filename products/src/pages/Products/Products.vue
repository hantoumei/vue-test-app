<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import Search from '@/ui/Search/Search.vue';
  import { getProductsList } from '@/api/api';
  import type { Product } from '@/api/api.types';

  const products = ref<Product[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const loadProducts = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      products.value = await getProductsList();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load products';
      console.error('Error loading products:', err);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    loadProducts();
  });
</script>

<template lang="pug">
  .products
    Search
    
    .products__content
      p(v-if="isLoading") Loading products...
      p(v-else-if="error" class="products__error") {{ error }}
      
      .products__list(v-else-if="products.length")
        .product-card(v-for="product in products" :key="product.id")
          h3 {{ product.productName }}
          p {{ product.productDescription }}
          p.price ${{ product.productPrice }}
          
      p(v-else) No products found
</template>