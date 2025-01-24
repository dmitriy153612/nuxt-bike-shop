<template>
  <Pagination
    v-model="page"
    :total-pages="catalogStore.config?.totalPages || 0"
  />
</template>

<script setup lang="ts">
const catalogStore = useCatalogStore()
const route = useRoute()
const router = useRouter()

const page = ref<number>(1)

function setPageToQuery(page: number) {
  router.push({ query: { ...route.query, page: page } })
}

function setPageFromQuery(newPage: number) {
  page.value = newPage || 1
}

watch(() => page.value, () => setPageToQuery(page.value), { immediate: true })
watch(() => route.query['page'], (newValue) => {
  setPageFromQuery(Number(newValue))
}, { immediate: true })
</script>
