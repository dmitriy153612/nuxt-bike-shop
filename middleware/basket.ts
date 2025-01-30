export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore()
  if (!authStore.token) {
    return await navigateTo('/catalog')
  }

  const { showPageSpinner } = useGlobalStore()
  const { fetchGetBasket } = useBasketStore()

  showPageSpinner(true)
  await fetchGetBasket()
  showPageSpinner(false)
})
