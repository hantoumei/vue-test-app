<script setup lang="ts">
  import Header from '@/ui/shared/Header/Header.vue'
  import Footer from '@/ui/shared/Footer/Footer.vue'
</script>

<template lang="pug">
  Header
  main
    .container
      slot
  Footer
</template>