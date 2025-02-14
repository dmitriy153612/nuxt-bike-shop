<template>
  <span
    class="price-box"
    :class="{ 'price-box--small': small }"
  >
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
defineProps<{
  price: string | number
  oldPrice?: string | number
  minus?: boolean
  alert?: boolean
  small?: boolean
}>()
</script>

<style scoped lang="scss">
  .price-box {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    color: $secondary;
    line-height: 1;
    &--small & {
      &__price {
        font-size: 16px;
      }
      &__old-price {
        font-size: 14px;
      }
    }
    &__price {
      position: relative;
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
      text-decoration-color: inherit;
      color: $alert;
    }
  }
</style>
