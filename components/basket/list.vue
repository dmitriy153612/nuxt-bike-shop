<template>
  <TransitionGroup
    tag="ul"
    name="list"
    class="list"
  >
    <li
      v-for="product in basketList"
      :key="product.cartItemId"
      class="list__item"
    >
      <BasketCard
        :product="product"
      />
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
import type { IBasketProduct } from '@/types/basket'

defineProps<{
  basketList: IBasketProduct[]
}>()
</script>

<style scoped lang="scss">
.list {
  display: grid;
  row-gap: 16px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
