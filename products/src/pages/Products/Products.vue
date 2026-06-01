<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import Search from '@/ui/Search/Search.vue';
  import ProductCard from '@/ui/ProductCard/ProductCard.vue';
  import { getProductsList } from '@/api/api';
  import { type Product } from '@/api/api.types';
  import Paginator, { type PageState } from 'primevue/paginator';
  import CheckboxGroup from '@/ui/CheckboxGroup/CheckboxGroup.vue';
  import Select from 'primevue/select';
  import Loader from '@/ui/Loader/Loader.vue';
  import { watch } from 'vue';
  import { FILTERS_OPTIONS, ORDER, SORT_BY, SORTING_OPTIONS } from '@/constants/shared';

  // Products
  const products = ref<Product[]>([]);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  // Pagination
  const page = ref<number>(0);
  const limit = ref<number>(10);
  const totalRecords = ref<number>(100); // Hardcoded for now, since API doesn't return total count

  // FIlters
  const filters = ref<Record<string, string>>({});
  const filterOptions = ref<typeof FILTERS_OPTIONS>(FILTERS_OPTIONS);

  // Sorting
  const sortBy = ref<SORT_BY>(SORT_BY.CREATED_AT);
  const order = ref<ORDER>(ORDER.DESC);

  // Search
  const search = ref<string>('');

  const loadProducts = async (): Promise<void> => {
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

  const onPageChange = (event: PageState): void => {
    page.value = event.page;
    limit.value = event.rows;
  };

  const onFiltersChange = (selectedValues: string[]): void => {
    filters.value = {};
    page.value = 0;
    if (selectedValues.includes('new') && selectedValues.includes('used')) return;
    if (selectedValues.includes('new')) filters.value['productIsNew'] = 'true';
    if (selectedValues.includes('used')) filters.value['productIsNew'] = 'false';
  };

  const onSortingChange = (
    event: { value: typeof SORTING_OPTIONS[number]['value'] }
  ): void => {
    const [newSortBy, newOrder] = Object.entries(event.value)[0]!;
    sortBy.value = newSortBy as SORT_BY;
    order.value = newOrder as ORDER;
  };

  onMounted(() => {
    loadProducts();
  });

  watch([page, limit, sortBy, order, filters, search], loadProducts);
</script>

<template lang="pug">
  .products
    .products__controls
      Search(
        :searchName="'Search products'"
        :placeholder="'Type product name or keywords...'"
        @update:search="search = $event; page = 0"
      )
      CheckboxGroup(:options="filterOptions" @update:modelValue="onFiltersChange")
      Select(
        :options="SORTING_OPTIONS"
        option-label="label"
        option-value="value"
        placeholder="Sort by"
        @change="onSortingChange"
      )

    .products__content
      div(v-if="isLoading")
        Loader
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
          
      p.products__no-results(v-else) No products found
</template>

<style lang="scss" scoped src="./Products.scss"></style>