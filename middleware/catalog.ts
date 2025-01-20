export default defineNuxtRouteMiddleware(async ({ query }) => {
  const { fetchFilter } = useFilterStore()
  const { fetchCatalog } = useCatalogStore()

  await Promise.allSettled([fetchCatalog(query), fetchFilter()])
})
