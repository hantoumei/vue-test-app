<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import Search from '@/ui/Search/Search.vue';
  import ProductCard from '@/ui/ProductCard/ProductCard.vue';
  import { getProductsList } from '@/api/api';
  import type { ORDER, Product } from '@/api/api.types';
  import Paginator, { type PageState } from 'primevue/paginator';
  import { watch } from 'vue';

  // Products
  const products = ref<Product[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Pagination
  const page = ref(0);
  const limit = ref(10);
  const totalRecords = ref(100); // Hardcoded for now, ideally should come from API response

  // FIlters
  const filters = ref<Record<string, string>>({});

  // Sorting
  const sortBy = ref('createdAt');
  const order = ref<ORDER>('desc');

  // Search
  const search = ref('');

  const loadProducts = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      products.value = await getProductsList(
        page.value + 1,
        limit.value,
        sortBy.value,
        order.value,
        filters.value,
        search.value
      );
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load products';
      console.error('Error loading products:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const onPageChange = (event: PageState) => {
    page.value = event.page;
    limit.value = event.rows;
  };

  onMounted(() => {
    loadProducts();
  });

  watch([page, limit, sortBy, order, filters, search], loadProducts);
</script>

<template lang="pug">
  .products
    Search(
      :searchName="'Search products'"
      :placeholder="'Type product name...'"
      @update:search="search = $event; page = 0"
    )
    
    .products__content
      p(v-if="isLoading") Loading products...
      p(v-else-if="error" class="products__error") {{ error }}
      
      .products__list(v-else-if="products.length")
        ProductCard(v-for="product in products" :key="product.id" :product="product" :search="search")
      
        Paginator(
          class="products__paginator"
          :rows="limit"
          :totalRecords="totalRecords"
          :rowsPerPageOptions="[10, 20, 30]"
          :first="page * limit"
          @page="onPageChange"
        )
          
      p(v-else) No products found
</template>

<style lang="scss" scoped src="./Products.scss"></style>