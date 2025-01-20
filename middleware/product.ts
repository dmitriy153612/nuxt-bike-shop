export default defineNuxtRouteMiddleware(async (to, from) => {
  const productStore = useProductStore()
  const filterStore = useFilterStore()

  if (!filterStore.sizes.length) {
    await filterStore.fetchSizes()
  }
  if (to.path === from.path && String(to.query.sizeId) !== String(from.query.sizeId)) {
    return
  }
  await productStore.fetchProduct({ id: String(to.params.id) })
})
