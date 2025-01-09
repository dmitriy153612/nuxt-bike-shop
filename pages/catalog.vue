<template>
  <div class="catalog-page">
    <section>
      <Container class="catalog-page__inner">
        <PageTitle>Mountain bikes</PageTitle>
        <AppSelect :options="sortingOptions" v-model="sortingId" />
        <Catalog :catalog="catalog" />
      </Container>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'catalog',
});

const { catalog, config } = storeToRefs(useCatalogStore());

const sortingOptions = shallowRef([
  { label: 'По релевантности', id: '' },
  { label: 'Цена по возрастанию', id: 'priceUp' },
  { label: 'Цена по убыванию', id: 'priceDown' },
]);
const sortingId = ref(sortingOptions.value[0]);
</script>

<style scoped lang="scss">
.catalog-page {
  &__select {
    margin-bottom: 32px;
  }
}
</style>
