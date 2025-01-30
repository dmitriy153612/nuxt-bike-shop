<template>
  <span class="price-box">
    <span
      class="price-box__price"
      :class="{ 'price-box__price--alert': alert }"
    >
      <span v-if="minus">-</span>{{ formatCurrency(price) }}</span>
    <span
      v-if="oldPrice"
      class="price-box__old-price"
    >
      {{ formatCurrency(oldPrice) }}
    </span>
  </span>
</template>

<script setup lang="ts">
import formatCurrency from '@/helpers/formatCurrency'

withDefaults(defineProps<{
  price: string | number
  oldPrice?: string | number
  minus?: boolean
  alert?: boolean
}>(), {
  minus: false,
  alert: false,
})
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
      &--alert {
        color: $alert;
      }
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
