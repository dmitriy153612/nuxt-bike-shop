<template>
  <div class="catalog-page">
    <main class="catalog-page__main">
      <section class="catalog-page__sec">
        <Container class="catalog-page__inner">
          <PageTitle>Mountain bikes</PageTitle>
          <AppSelect
            class="catalog-page__select"
            :options="SORTING_OPTIONS"
            v-model="sorting"
          />
          <div class="catalog-page__catalog-wrapper">
            <Catalog
            class="catalog-page__catalog"
            :catalog="catalogStore.catalog"
          />
          </div>
          <CatalogPagination class="catalog-page__pagination" />
        </Container>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'catalog',
});

import { SORTING_OPTIONS } from '@/config/catalogVariables';
import type { ISelect } from '@/types/select';

const catalogStore = useCatalogStore();
const route = useRoute();
const router = useRouter();

const sorting = ref(SORTING_OPTIONS[0]);

function getSortingObj(): ISelect | null {
  if (route.query.hasOwnProperty('sorting')) {
    const index = SORTING_OPTIONS.findIndex(
      (option) => option.id === route.query.sorting
    );
    return SORTING_OPTIONS[index];
  }
  return null;
}

function getSortingQueryObj(sortingId: string) {
  const isIdExistOnOptions = SORTING_OPTIONS.some(
    (item) => item.id === sortingId
  );

  if (!isIdExistOnOptions || sortingId === SORTING_OPTIONS[0].id) {
    return { sorting: undefined };
  }

  return { sorting: sortingId };
}

function setSortingToRoute(sortingId: string) {
  const sortingQueryObj = getSortingQueryObj(sortingId);
  router.replace({
    query: { ...route.query, ...sortingQueryObj },
  });
}

onMounted(() => {
  const newSorting = getSortingObj();
  if (newSorting) {
    sorting.value = newSorting;
  }
});

watch(
  () => sorting.value.id,
  () => setSortingToRoute(sorting.value.id)
);
</script>

<style scoped lang="scss">
.catalog-page {
  &__main,
  &__sec,
  &__inner {
    height: 100%;
  }
  &__inner {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  &__select {
    margin-bottom: 32px;
    width: max-content;
  }
  &__catalog-wrapper {
    flex-grow: 1;
    margin-bottom: 34px;
  }
  &__pagination {
    padding-bottom: 34px;
  }
}
</style>
