export default defineNuxtRouteMiddleware(async ({ query }) => {
  const { fetchCatalog } = useCatalogStore();
  await fetchCatalog(query);
});
