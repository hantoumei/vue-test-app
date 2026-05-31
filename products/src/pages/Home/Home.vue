<script setup lang="ts">
  import Button from '@/ui/Button/Button.vue';
</script>

<template lang="pug">
  .home
    h1.home__title Welcome to My Product Store
    p.home__subtitle Discover our amazing products!
    Button(variant="primary" size="large" url="/products") Shop Now
</template>

<style lang="scss" scoped src="./Home.scss"></style>