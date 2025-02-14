export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore()
  if (!authStore.token) {
    return await navigateTo('/catalog')
  }

  const { showPageSpinner } = useGlobalStore()
  const orderStore = useOrderStore()

  showPageSpinner(true)
  orderStore.clearOrderNumber()
  await Promise.all([
    orderStore.fetchGetDeliveryTypes(),
    orderStore.fetchGetOrder(),
    orderStore.fetchGetPaymentTypes(),
    orderStore.fetchGetPickupPoints(),
  ])
  const deliveryTypeId = findAvailableOrderOptionId(orderStore.deliveryTypes)
  const paymentTypeId = findAvailableOrderOptionId(orderStore.paymentTypes)
  await orderStore.fetchGetOrderConfig({ deliveryTypeId, paymentTypeId })

  const areThereSelectedProduct = orderStore.orderConfig?.selectedAmount

  showPageSpinner(false)

  if (!areThereSelectedProduct) {
    return navigateTo('/catalog')
  }
})
