<template>
  <Pagination v-model="page" :totalPages="catalogStore.config?.totalPages || 0" />
</template>

<script setup lang="ts">
import type { LocationQuery } from 'vue-router';

const route = useRoute()
const router = useRouter()
const catalogStore = useCatalogStore()

const page = ref<number>(1)

function setPageFromQuery(routeQuery: LocationQuery) {
  if (routeQuery.hasOwnProperty('page')) {
    page.value = Number(route.query.page)
  } else {
    page.value = 1
  }
}

function setPageToQuery(page: number) {
  router.push({ query: { ...route.query, page: page }})
}

watch(() => route.query, () => setPageFromQuery(route.query), { immediate: true})
watch(() => page.value, () => setPageToQuery(page.value))
</script>
