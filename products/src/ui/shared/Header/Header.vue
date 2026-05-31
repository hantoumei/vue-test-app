<script setup lang="ts"></script>

<template lang="pug">
  header.header
    .container
      .header__wrapper
        router-link(to="/" aria-label="To main page")
          img.header__logo(src="/images/logo.png" alt="EIEN Logo")
        
        nav.header__navigation
          ul.header__navigation-list
            li.header__navigation-list-item
              router-link.header__navigation-link.link(to="/home") Home

            li.header__navigation-list-item
              router-link.header__navigation-link.link(to="/products") Products
</template>

<style lang="scss" scoped src="./Header.scss"></style>