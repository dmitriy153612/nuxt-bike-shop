<template>
  <Pagination
    v-model="page"
    :total-pages="catalogStore.config?.totalPages || 0"
  />
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const catalogStore = useCatalogStore()

const page = ref<number>(Number(route.query['page']) || 1)

function setPageToQuery(page: number) {
  router.push({ query: { ...route.query, page: page } })
}

watch(() => page.value, () => setPageToQuery(page.value), { immediate: true })
</script>
