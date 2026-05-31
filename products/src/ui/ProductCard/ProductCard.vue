<script setup lang="ts">
  import type { Product } from '@/api/api.types';

  const props = defineProps<{
    product: Product;
    search: string;
  }>();

  const highlightText = (text: string): string => {
    if (!props.search || !text) return text;
    const regex = new RegExp(`(${props.search})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };
</script>

<template lang="pug">
  router-link.product-card(:to="`/products/${product.id}`")
    img.product-card__image(
      :src="product.productImage"
      :alt="product.productName"
    )
    .product-card__content
      h2.product-card__name(v-html="highlightText(product.productName)")
      div.product-card__user
        img.product-card__user-avatar(:src="product.userImage" :alt="`${product.userName}'s avatar`")
        span.product-card__user-name {{ product.userName }}
      p.product-card__description(v-html="highlightText(product.productDescription)")
      p.product-card__price ${{ product.productPrice }}
</template>

<style lang="scss" scoped src="./ProductCard.scss"></style>