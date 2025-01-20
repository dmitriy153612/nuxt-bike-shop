<template>
  <p class="option">
    <span class="option__name">{{ optionName }}:</span>
    <span class="option__value">{{ optionValue }}</span>
  </p>
</template>

<script setup lang="ts">
defineProps<{
  optionName: string
  optionValue: string | number
}>()
</script>

<style scoped lang="scss">
  .option {
    display: flex;
    align-items: center;
    column-gap: 8px;

    &__name {
      font-size: 18px;
      font-weight: 600;
    }
    &__value {
      font-size: 20px;
    }
  }
</style>
