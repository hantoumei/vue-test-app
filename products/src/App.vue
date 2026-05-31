<script setup lang="ts">
  import BasicLayout from './layouts/BasicLayout/BasicLayout.vue'
</script>

<template lang="pug">
  BasicLayout
    router-view
</template>

<style lang="scss">
  @use "./App.scss";
</style>