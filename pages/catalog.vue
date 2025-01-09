<template>
  <div class="catalog-page">
    <section>
      <Container class="catalog-page__inner">
        <PageTitle>Mountain bikes</PageTitle>
        <AppSelect
          class="catalog-page__select"
          :options="SORTING_OPTIONS"
          v-model="sorting"
        />
        <Catalog :catalog="catalogStore.catalog" />
      </Container>
    </section>
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
    const isIdExistOnOptions = SORTING_OPTIONS.some(item => item.id === sortingId)

    if (!isIdExistOnOptions || sortingId === SORTING_OPTIONS[0].id) {
      return { sorting: undefined }
    } 

    return { sorting: sortingId }
  }

onMounted(() => {
  const newSorting = getSortingObj();
  if (newSorting) {
    sorting.value = newSorting;
  }
});

watch(
  () => sorting.value.id,
  () => {
    const sortingQueryObj = getSortingQueryObj(sorting.value.id)
    router.replace({
        query: { ...route.query, ...sortingQueryObj },
      });
  }
);
</script>

<style scoped lang="scss">
.catalog-page {
  &__select {
    margin-bottom: 32px;
  }
}
</style>
