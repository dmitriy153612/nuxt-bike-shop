<template>
  <div class="catalog-page">
    <main class="catalog-page__main">
      <section class="catalog-page__sec">
        <Container class="catalog-page__inner">
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
  title: 'Каталог',
  middleware: 'catalog',
})

const catalogStore = useCatalogStore()
const route = useRoute()
const router = useRouter()

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

<style scoped lang="scss">
.catalog-page {
  &__main,
  &__sec,
  &__inner {
    height: 100%;
  }
  &__inner {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto 1fr auto;
    grid-template-areas:
      'title'
      'select'
      'counter'
      'catalog'
      'pagination';

      @media #{$sm-screen} {
        grid-template-columns: auto 1fr;
        grid-template-rows: auto auto 1fr auto;
        grid-template-areas:
        'title title'
        'select counter'
        'catalog catalog'
        'pagination pagination'
        ;
      }

    @media #{$md-screen} {
      grid-template-columns: auto 1fr auto;
      grid-template-areas:
        'title select counter'
        'catalog catalog'
        'pagination pagination';
    }
    @media #{$xl-screen} {
      grid-template-columns: auto auto 1fr;
      grid-template-areas:
        'filter title title'
        'filter select counter'
        'filter catalog catalog'
        'filter pagination pagination';
    }
  }
  &__title {
    grid-area: title;
    text-align: center;
    align-self: center;
    margin-bottom: 24px;
  }
  &__select {
    margin-bottom: 16px;
    width: max-content;
    grid-area: select;
    margin-right: 16px;
    @media #{$sm-screen} {
      margin-bottom: 0;
    }
    @media #{$md-screen} {
      margin-bottom: 0;
    }
    @media #{$xl-screen} {
      justify-self: center;
    }
  }
  &__counter {
    grid-area: counter;
    align-self: center;
    margin-bottom: 16px;
    font-size: 18px;
    @media #{$sm-screen} {
      margin-bottom: 0;
    }
  }
  &__catalog {
    grid-area: catalog;
    position: relative;
    z-index: 1;
    flex-grow: 1;
    margin-bottom: 34px;
    @media #{$sm-screen} {
      padding-top: 40px;
    }
  }
  &__pagination {
    grid-area: pagination;
    padding-bottom: 34px;
  }
  &__filter {
    grid-area: filter;
    display: none;
    @media #{$xl-screen} {
      display: block;
    }
  }
}
</style>
