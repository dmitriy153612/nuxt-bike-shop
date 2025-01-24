export default defineNuxtRouteMiddleware(async (to, from) => {
  const productStore = useProductStore()
  const filterStore = useFilterStore()
  const globalStore = useGlobalStore()

  if (to.path === from.path && String(to.query.sizeId) !== String(from.query.sizeId)) {
    return
  }

  globalStore.showPageSpinner(true)

  if (!filterStore.sizes.length) {
    await filterStore.fetchSizes()
  }

  await productStore.fetchProduct({ id: String(to.params.id) })
  globalStore.showPageSpinner(false)
})
