<script setup lang="ts">
  import Checkbox from 'primevue/checkbox';
  import CheckboxGroup from 'primevue/checkboxgroup';

  const props = defineProps<{
    options: { label: string; value: string; }[];
    modelValue?: string[];
  }>();

  defineEmits(['update:modelValue']);
</script>

<template lang="pug">
  CheckboxGroup(:model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" class="checkbox-group")
    .checkbox-group__checkbox(v-for="option in options" :key="option.value")
      Checkbox(:value="option.value" :input-id="option.label" :defaultValue="true")
      label(:for="option.label") {{ option.label }}
</template>

<style lang="scss" scoped src="./CheckboxGroup.scss"></style>