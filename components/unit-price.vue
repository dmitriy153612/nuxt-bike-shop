<template>
  <dl class="unit-price">
    <dd class="unit-price__value">
      {{ formatCurrency(price, false) }}
    </dd>
    <dt class="unit-price__name">
      ₽/шт.
    </dt>
  </dl>
</template>

<script setup lang="ts">
import formatCurrency from '@/helpers/formatCurrency'

defineProps<{
  price: number | string
}>()
</script>

<style scoped lang="scss">
.unit-price {
  display: flex;
  column-gap: 4px;
  justify-content: center;
  align-items: center;
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: $secondary;
  opacity: 0.9;
  &__value,
  &__name {
    margin: 0;
  }
}
</style>
