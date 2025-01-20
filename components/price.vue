<template>
  <span class="price-box">
    <span class="price-box__price">{{
      $formatCurrency(price)
    }}</span>
    <span
      v-if="oldPrice"
      class="price-box__old-price"
    >
      {{ $formatCurrency(oldPrice) }}
    </span>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  price: string | number
  oldPrice?: string | number
}>()
</script>

<style scoped lang="scss">
  .price-box {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    color: $secondary;
    &__price {
      position: relative;
      bottom: -2px;
      font-size: 18px;
      font-weight: 700;
    }
    &__old-price {
      position: relative;
      top: -2px;
      font-size: 16px;
      font-weight: 500;
      text-decoration: line-through;
    }
  }
</style>
