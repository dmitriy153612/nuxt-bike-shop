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

          <Catalog
            class="catalog-page__catalog"
            :catalog="catalogStore.catalog"
          />

          <CatalogPagination
            v-if="catalogStore.catalog.length"
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

const sorting = ref(SORTING_OPTIONS[0])

function getSortingObj(): ISelect | null {
  if (route.query?.sorting) {
    const index = SORTING_OPTIONS.findIndex(
      option => option.id === route.query.sorting,
    )
    return SORTING_OPTIONS[index]
  }
  return null
}

function getSortingQueryObj(sortingId: string) {
  const isIdExistOnOptions = SORTING_OPTIONS.some(
    item => item.id === sortingId,
  )

  if (!isIdExistOnOptions || sortingId === SORTING_OPTIONS[0].id) {
    return { sorting: undefined }
  }

  return { sorting: sortingId }
}

function setSortingToRoute(sortingId: string) {
  const sortingQueryObj = getSortingQueryObj(sortingId)
  router.replace({
    query: { ...route.query, ...sortingQueryObj },
  })
}

onMounted(() => {
  const newSorting = getSortingObj()
  if (newSorting) {
    sorting.value = newSorting
  }
})

watch(
  () => sorting.value.id,
  () => setSortingToRoute(sorting.value.id),
)
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
    grid-template-rows: auto auto 1fr auto;
    grid-template-columns: 1fr;
    grid-template-areas:
      'title'
      'select'
      'catalog'
      'pagination';

    @media #{$md-screen} {
      grid-template-rows: auto 1fr auto;
      grid-template-columns: auto 1fr;
      grid-template-areas:
        'title select'
        'catalog catalog'
        'pagination pagination';
    }
    @media #{$xl-screen} {
      grid-template-columns: auto 1fr auto;
      grid-template-areas:
        'select title'
        'filter catalog'
        '. pagination';
    }
  }
  &__title {
    grid-area: title;
    text-align: center;
    align-self: center;
    margin-bottom: 24px;
    @media #{$sm-screen} {
      margin-right: 24px;

    }
    @media #{$md-screen} {
      margin-right: 24px;
      margin-bottom: 0;
    }
    @media #{$xl-screen} {
      margin-right: 0;
    }
  }
  &__select {
    margin-bottom: 32px;
    width: max-content;
    grid-area: select;
    @media #{$md-screen} {
      margin-bottom: 0;
    }
  }
  &__catalog {
    grid-area: catalog;
    position: relative;
    z-index: 1;
    flex-grow: 1;
    margin-bottom: 34px;
    @media #{$md-screen} {
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
