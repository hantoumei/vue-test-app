<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import Search from '@/ui/Search/Search.vue';
  import ProductCard from '@/ui/ProductCard/ProductCard.vue';
  import { getProductsCount, getProductsList } from '@/api/api';
  import { type Product } from '@/api/api.types';
  import Paginator, { type PageState } from 'primevue/paginator';
  import CheckboxGroup from '@/ui/CheckboxGroup/CheckboxGroup.vue';
  import Select from 'primevue/select';
  import Loader from '@/ui/Loader/Loader.vue';
  import { watch } from 'vue';
  import { FILTERS_OPTIONS, ORDER, SORT_BY, SORTING_OPTIONS } from '@/constants/shared';

  const router = useRouter();
  const route = useRoute();

  // Products
  const products = ref<Product[]>([]);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  // Pagination
  const page = ref<number>(0);
  const limit = ref<number>(10);
  const totalRecords = ref<number>(0);

  // FIlters
  const selectedFilters = ref<string[]>(['new', 'used']);
  const filters = ref<Record<string, string>>({});

  // Sorting
  const sortBy = ref<SORT_BY>(SORT_BY.CREATED_AT);
  const order = ref<ORDER>(ORDER.DESC);

  const sortingValue = computed(() => ({ [sortBy.value]: order.value }));

  // Search
  const search = ref<string>('');

  const updateUrl = (): void => {
    const query: Record<string, string> = {};
    if (page.value > 0) query.page = String(page.value + 1);
    if (limit.value !== 10) query.limit = String(limit.value);
    if (sortBy.value !== SORT_BY.CREATED_AT || order.value !== ORDER.DESC) {
      query.sortBy = sortBy.value;
      query.order = order.value;
    }
    if (search.value) query.search = search.value;

    const hasNew = selectedFilters.value.includes('new');
    const hasUsed = selectedFilters.value.includes('used');
    if (selectedFilters.value.length > 0 && !(hasNew && hasUsed)) {
      query.filters = selectedFilters.value.join(',');
    }
    
    router.replace({ query });
  };

  const initFromUrl = (): void => {
    const q = route.query;
    if (q.page) page.value = parseInt(q.page as string) - 1;
    if (q.limit) limit.value = parseInt(q.limit as string);
    if (q.sortBy) sortBy.value = q.sortBy as SORT_BY;
    if (q.order) order.value = q.order as ORDER;
    if (q.search) search.value = q.search as string;
    if (q.filters) {
      const filterValues = (q.filters as string).split(',');
      selectedFilters.value = filterValues;
      onFiltersChange(filterValues);
    } else {
      onFiltersChange(['new', 'used']);
    }
  };

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
      totalRecords.value = await getProductsCount(
        page.value + 1,
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
    selectedFilters.value = selectedValues;
    filters.value = {};
    page.value = 0;
    if (selectedValues.includes('new') && selectedValues.includes('used')) return;
    if (selectedValues.includes('new')) filters.value['productIsNew'] = 'true';
    if (selectedValues.includes('used')) filters.value['productIsNew'] = 'false';
  };

  const onSortingChange = (
    value: typeof SORTING_OPTIONS[number]['value']
  ): void => {
    const [newSortBy, newOrder] = Object.entries(value)[0]!;
    sortBy.value = newSortBy as SORT_BY;
    order.value = newOrder as ORDER;
    page.value = 0;
  };

  const onCheckboxChange = (val: string[]): void => {
    selectedFilters.value = val;
    onFiltersChange(val);
  };

  onMounted(() => {
    initFromUrl();
    loadProducts();
  });

  watch([page, limit, sortBy, order, filters, search], () => {
    updateUrl();
    loadProducts();
  });
</script>

<template lang="pug">
  .products
    .products__controls
      Search(
        :searchName="'Search products'"
        :placeholder="'Type product name or keywords...'"
        :model-value="search"
        @update:search="search = $event; page = 0"
      )
      CheckboxGroup(:options="FILTERS_OPTIONS" :model-value="selectedFilters" @update:modelValue="onCheckboxChange")
      Select(
        :options="SORTING_OPTIONS"
        option-label="label"
        option-value="value"
        :model-value="sortingValue"
        placeholder="Sort by"
        @update:model-value="onSortingChange"
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