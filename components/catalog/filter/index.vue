<template>
  <div class="filter">
    <form
      class="filter__form"
      @submit.prevent
    >
      <h3 class="filter__title">
        Фильтр
      </h3>
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
        <CatalogFilterInput
          v-model="filter.minPrice"
          label="Цена от"
        />
        <CatalogFilterInput
          v-model="filter.maxPrice"
          label="Цена до"
        />
      </div>
      <div class="filter__buttons">
        <Btn
          class="filter__btn"
          type="submit"
          @click.prevent="setFilterToRouter"
        >
          Применить
        </Btn>
        <Btn
          v-if="!isFilterEmpty"
          class="filter__btn"
          :disabled="isFilterEmpty"
          @click.prevent="resetFilter"
        >
          Сбросить
        </Btn>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { IFilter } from '@/types/catalog'

const filterStore = useFilterStore()
const catalogStore = useCatalogStore()
const router = useRouter()
const route = useRoute()

const isFilterComponentLoaded = ref(false)

const filter = ref<IFilter>({
  sizeId: [],
  brandId: [],
  colorId: [],
  minPrice: undefined,
  maxPrice: undefined,
})

const isFilterEmpty = computed<boolean>(() => {
  return Object.values(filter.value).every((value) => {
    return Array.isArray(value) ? !value.length : !value
  })
})

function setFilterToRouter() {
  router.replace({
    query: { ...route.query, ...filter.value, page: 1 },
  })
  catalogStore.openFilter(false)
}

function setFilterFromRoute() {
  filter.value.sizeId = getStringArray(route.query['sizeId'])
  filter.value.brandId = getStringArray(route.query['brandId'])
  filter.value.colorId = getStringArray(route.query['colorId'])
  filter.value.minPrice = getPriceFromRoute('minPrice')
  filter.value.maxPrice = getPriceFromRoute('maxPrice')
}

function resetFilter() {
  filter.value.brandId = []
  filter.value.colorId = []
  filter.value.sizeId = []
  filter.value.minPrice = undefined
  filter.value.maxPrice = undefined

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
      page: 1,
    },
  })
}

function getPriceFromRoute(priceKey: string): number | undefined {
  const value = route.query[priceKey]
  return value ? Number(value) : undefined
}

onMounted(() => {
  isFilterComponentLoaded.value = true
})

watch(() => route.query, setFilterFromRoute, { immediate: true })
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
    color: $secondary;
  }
  &__inputs {
    display: grid;
    row-gap: 14px;
    @media #{$xxl-screen} {
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
