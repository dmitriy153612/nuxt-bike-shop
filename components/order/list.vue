<template>
  <OrderFieldset>
    <ul class="order-list">
      <li
        v-for="(product, index) in orderList"
        :key="index"
        class="order-list__item"
      >
        <OrderCard :product="product" />
      </li>
    </ul>
  </OrderFieldset>
</template>

<script setup lang="ts">
import type { IOrderProduct } from '@/types/order'

defineProps<{
  orderList: IOrderProduct[]
}>()
</script>

<style scoped lang="scss">
.order-list {
  display: grid;
  row-gap: 8px;
}
</style>
