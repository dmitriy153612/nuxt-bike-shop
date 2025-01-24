export default defineNuxtRouteMiddleware(async (to) => {
  const { fetchFilter } = useFilterStore()
  const { fetchCatalog } = useCatalogStore()

  await Promise.allSettled([fetchCatalog(to.query), fetchFilter()])
})
