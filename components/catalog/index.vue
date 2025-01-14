<template>
  <div class="catalog">
    <ul class="catalog__list">
    <li class="catalog__item" v-for="card in catalog" :key="card._id">
      <CatalogCard :card="card" />
    </li>
  </ul>
  </div>

</template>

<script setup lang="ts">
import type { ICatalogCard } from '~/types/catalog';

defineProps<{
  catalog: ICatalogCard[],
}>()
</script>

<style scoped lang="scss">
.catalog {
  &__list {
    display: grid;
  grid-template-columns: repeat(auto-fill, minmax(288px, 1fr));
  gap: 14px;
  }
}
</style>
