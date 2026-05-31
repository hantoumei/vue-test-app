<script setup lang="ts">
  import { ref } from 'vue';

  const searchName = 'Search products'
  const placeholder = 'Search for products...'
  const searchTerm = ref('')
</script>

<template lang="pug">
  .search
  .search__field-wrapper
    label.visually-hidden(for="search") {{ searchName }}
    
    input.search__field(
      name="search"
      type="text"
      :placeholder="placeholder"
      v-model="searchTerm"
    )
    
    button.search__button.link(
      v-if="searchTerm"
      type="button"
      @click="searchTerm = ''"
    )
      svg.search__icon(aria-label="Clear search field")
        use(href="/icons/sprite.svg#icon-close")
        
    svg.search__icon(aria-hidden="true")
      use(href="/icons/sprite.svg#icon-search")
      
  p.search__search-text(v-if="searchTerm")
    | Search results for 
    b "{{ searchTerm }}"
</template>

<style lang="scss" scoped>
  @use "./Search.scss";
</style>