<template>
  <div class="catalog-page">
    <main class="catalog-page__main">
      <section class="catalog-page__sec">
        <Container class="catalog-page__inner">
          <div class="catalog-page__top">
            <PageTitle class="catalog-page__title">
              Mountain bikes
            </PageTitle>
            <AppSelect
              v-model="sorting"
              class="catalog-page__select"
              :options="SORTING_OPTIONS"
            />
            <div class="catalog-page__counter">
              найдено <b>{{ catalogStore.config?.totalProducts || 0 }}</b> шт.
            </div>
            <CatalogFilterApplied class="catalog-page__applied-filter" />
          </div>

          <Catalog
            class="catalog-page__catalog"
            :catalog="catalogStore.catalog"
          />

          <Pagination
            v-if="catalogStore.config?.totalPages && catalogStore.config?.totalPages > 1"
            v-model="page"
            :total-pages="catalogStore.config?.totalPages || 0"
            class="catalog-page__pagination"
          />
          <CatalogFilter class="catalog-page__filter" />

          <Drawer
            v-if="width < 1280"
            :block-scroll="true"
            :visible="catalogStore.isFilterOpened"
            class="catalog-page__drawer"
            @update:visible="() => catalogStore.openFilter(false)"
          >
            <CatalogFilter />
          </Drawer>
        </Container>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { SORTING_OPTIONS } from '@/config/catalogVariables'
import type { ISelect } from '@/types/select'

definePageMeta({
  middleware: 'catalog',
})

const catalogStore = useCatalogStore()

const route = useRoute()
const router = useRouter()

const { width } = useWindowSize()

const page = computed({
  get: () => Number(route.query.page) || 1,
  set: newPage => router.push({
    query: { ...route.query, page: newPage },
  }),
})

const sorting = computed({
  get: () => getSortingObjFromRoute() || SORTING_OPTIONS[0],
  set: (newValue) => {
    setSortingToRoute(newValue.id)
  },
})

function getSortingObjFromRoute(): ISelect | null {
  if (route.query?.sorting) {
    const index = SORTING_OPTIONS.findIndex(
      option => option.id === route.query.sorting,
    )
    return SORTING_OPTIONS[index]
  }
  return null
}

function setSortingToRoute(sortingId: string) {
  const sortingQueryObj: { sorting: string | undefined } = { sorting: undefined }
  const isIdExistOnOptions = SORTING_OPTIONS.some(
    item => item.id === sortingId,
  )
  if (!isIdExistOnOptions || sortingId === SORTING_OPTIONS[0].id) {
    sortingQueryObj.sorting = undefined
  }
  else {
    sortingQueryObj.sorting = sortingId
  }
  router.replace({
    query: { ...route.query, ...sortingQueryObj },
  })
}
</script>

<style  lang="scss">
.catalog-page {
  &__main,
  &__sec,
  &__inner {
    height: 100%;
  }
  &__inner {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    row-gap: 16px;
    grid-template-areas:
      'top'
      'catalog'
      'pagination';
    @media #{$xxl-screen} {
      grid-template-columns: auto 1fr;
      grid-template-areas:
        'filter top'
        'filter catalog'
        'filter pagination';
    }
  }
  &__top {
    grid-area: top;
    display: grid;
    row-gap: 16px;
    grid-template-areas:
    'title'
    'select'
    'counter'
    'applied-filter'
    ;
    @media #{$md-screen} {
      grid-template-columns: auto 1fr;
      align-items: center;
      column-gap: 16px;
      grid-template-areas:
    'title title'
    'select counter'
    'applied-filter applied-filter'
    ;
    }
  }
  &__title {
    grid-area: title;
    text-align: center;
  }
  &__select {
    grid-area: select;
    width: max-content;
  }
  &__counter {
    grid-area: counter;
    font-size: 18px;
  }
  &__applied-filter {
    grid-area: applied-filter;

  }
  &__catalog {
    grid-area: catalog;
    position: relative;
    z-index: 1;
    flex-grow: 1;
    margin-bottom: 34px;
  }
  &__pagination {
    grid-area: pagination;
    padding-bottom: 34px;
  }
  &__filter {
    grid-area: filter;
    display: none;
    @media #{$xxl-screen} {
      display: block;
    }
  }
}
</style>
