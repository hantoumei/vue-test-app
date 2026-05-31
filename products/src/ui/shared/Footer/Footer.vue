<script setup lang="ts"></script>

<template lang="pug">
  footer.footer
  .container
    .footer__wrapper
      img.footer__logo(src="/images/logo.png" alt="EIEN Logo")
      
      ul.footer__navigation-list
        li.footer__navigation-list-item
          router-link.footer__navigation-link.link(to="/home") Home

        li.footer__navigation-list-item
          router-link.footer__navigation-link.link(to="/products") Products
      
      .footer__copyright © EIEN. {{ new Date().getFullYear() }}
</template>

<style lang="scss" scoped src="./Footer.scss"></style>