<template lang="pug">
    a(
      v-if="url"
      :class="['button', `button--${variant}`, `button--${size}`]",
      :href="url"
    )
      slot
    button(
      v-else
      :class="['button', `button--${variant}`, `button--${size}`]"
      :disabled="disabled"
      @click="$emit('click', $event)"
    )
      slot
</template>

<script setup lang="ts">
  defineProps({
    variant: {
      type: String,
      default: 'primary',
      validator: (value: string) => ['primary', 'secondary', 'danger'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value: string) => ['small', 'medium', 'large'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: ''
    }
  });

  defineEmits(['click']);
</script>

<style lang="scss" scoped src="./Button.scss"></style>