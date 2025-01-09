
export default defineNuxtRouteMiddleware(async () => {
  const { fetchCatalog} = useCatalogStore()
  await fetchCatalog()
})