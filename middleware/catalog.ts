export default defineNuxtRouteMiddleware(async ({ query }) => {
  const { showPageSpinner } = useGlobalStore()
  const { fetchFilter } = useFilterStore()
  const { fetchCatalog } = useCatalogStore()
  
  showPageSpinner(true)
  await fetchCatalog(query)
  await fetchFilter()
  showPageSpinner(false)
});
