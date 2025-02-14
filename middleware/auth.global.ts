export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore()
  if (authStore.isFirstEnter && import.meta.server) {
    authStore.setFirstEnter()
    await authStore.fetchCheckAuth()
  }
})
