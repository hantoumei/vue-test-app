<script setup lang="ts">
  import { ref } from 'vue';

  defineEmits(['update:search']);

  defineProps({
    searchName: {
      type: String,
      default: 'Search'
    },
    placeholder: {
      type: String,
      default: 'Search...'
    }
  });

  const searchTerm = ref('')
</script>

<template lang="pug">
  form.search(@submit="$event.preventDefault(); $emit('update:search', searchTerm)")
    .search__field-wrapper
      label.visually-hidden(for="search") {{ searchName }}
      
      input.search__field(
        name="search"
        type="text"
        :placeholder="placeholder"
        v-model="searchTerm"
      )
      
      button.search__button.search__button--close.link(
        v-if="searchTerm"
        type="button"
        @click="searchTerm = ''; $emit('update:search', searchTerm)"
      )
        svg.search__icon(aria-label="Clear search field")
          use(href="/icons/sprite.svg#icon-close")
          
      button.search__button.search__button--search.link(
        type="submit"
        
      )
        svg.search__icon
          use(href="/icons/sprite.svg#icon-search")
        span Search
</template>

<style lang="scss" scoped src="./Search.scss"></style>