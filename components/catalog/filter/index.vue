<template>
  <div class="filter">
    <form class="filter__form" @submit.prevent>
      <h3 class="filter__title">Фильтр</h3>
      <CatalogFilterFieldset
        v-model="filter.brandId"
        :properties="filterStore.brands"
        legend="Бренд"
      />
      <CatalogFilterFieldset
        v-model="filter.colorId"
        :properties="filterStore.colors"
        legend="Цвет"
      />
      <CatalogFilterFieldset
        v-model="filter.sizeId"
        :properties="filterStore.sizes"
        legend="Размер"
      />
      <div class="filter__inputs">
        <CatalogFilterInput v-model="filter.minPrice" label="Цена от" />
        <CatalogFilterInput v-model="filter.maxPrice" label="Цена до" />
      </div>
      <div class="filter__buttons">
        <Btn class="filter__btn" @click.prevent="setFilterToRouter" type="submit" >Применить</Btn
        >
        <Btn class="filter__btn" @click.prevent="resetFilter">Сбросить</Btn>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { IFilter } from '@/types/catalog';

const filterStore = useFilterStore();
const globalStore = useGlobalStore();
const router = useRouter();
const route = useRoute();
const filter = ref<IFilter>({
  brandId: getArrayFromRoute('brandId'),
  colorId: getArrayFromRoute('colorId'),
  sizeId: getArrayFromRoute('sizeId'),
  minPrice: Number(route.query['minPrice']) || undefined,
  maxPrice: Number(route.query['maxPrice']) || undefined,
});

function setFilterToRouter() {
  router.replace({
    query: { ...route.query, ...filter.value, ...{ page: 1 } },
  });
  globalStore.openFilter(false);
}

function resetFilter() {
  router.replace({
    query: {
      ...route.query,
      ...{
        brandId: [],
        colorId: [],
        sizeId: [],
        minPrice: undefined,
        maxPrice: undefined,
      },
      ...{ page: 1 },
    },
  });
  filter.value.brandId = [];
  filter.value.colorId = [];
  filter.value.sizeId = [];
  filter.value.minPrice = undefined;
  filter.value.maxPrice = undefined;
}

function getArrayFromRoute(properyName: string): string[] {
  if (Object.prototype.hasOwnProperty.call(route.query, properyName)) {
    const value = route.query[properyName];
    if (Array.isArray(value)) {
      return value.map((item) => String(item));
    }
    return [String(value)];
  }
  return [];
}
</script>

<style scoped lang="scss">
.filter {
  &__form {
    padding: 40px 50px 40px 16px;
  overflow-y: auto;
  display: grid;
  row-gap: 24px;
  }

  &__title {
    font-size: 20px;
  }
  &__inputs {
    display: grid;
    row-gap: 14px;
    @media #{$xl-screen} {
      width: 152px;
    }
  }
  &__buttons {
    display: grid;
    row-gap: 12px;
  }
  &__btn {
    width: 100%;
  }
}
</style>
