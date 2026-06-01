<script setup lang="ts">
  defineEmits(['update:search']);

  defineProps({
    modelValue: {
      type: String,
      default: ''
    },
    searchName: {
      type: String,
      default: 'Search'
    },
    placeholder: {
      type: String,
      default: 'Search...'
    }
  });

</script>

<template lang="pug">
  form.search(@submit.prevent="$emit('update:search', modelValue)")
    .search__field-wrapper
      label.visually-hidden(for="search") {{ searchName }}
      
      input.search__field(
        name="search"
        type="text"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:search', $event.target.value)"
      )
      
      button.search__button.search__button--close.link(
        v-if="modelValue"
        type="button"
        @click="$emit('update:search', '')"
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