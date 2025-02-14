export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore()
  if (!authStore.token) {
    return await navigateTo('/catalog')
  }

  const { fetchGetBasket } = useBasketStore()

  await fetchGetBasket()
})
