import {
  ORDER_GET_ORDER_URL,
  ORDER_GET_ORDER_CONFIG_URL,
  ORDER_DELIVERY_TYPES_URL,
  ORDER_PAYMENT_TYPES_URL,
  ORDER_GET_PICKUP_POINTS_URL,
  ORDER_CREATE_ORDER_URL,
} from '@/config/api'
import type {
  IOrderProduct,
  IDeliveryType,
  IPaymentType,
  IOrderConfigQuery,
  IOrderConfig,
  IPickupPoint,
  ICreatingOrder,

} from '@/types/order'
import type { IBasketProduct, IBasketConfig } from '@/types/basket'

export const useOrderStore = defineStore('orderStore', () => {
  const authStore = useAuthStore()
  const basketStore = useBasketStore()

  const orderList = shallowRef<IOrderProduct[]>([])
  const orderConfig = shallowRef<IOrderConfig | null>(null)
  const isOrderConfigLoading = ref<boolean>(false)
  const deliveryTypes = shallowRef<IDeliveryType[]>([])
  const paymentTypes = shallowRef()
  const pickupPoints = shallowRef<IPickupPoint[]>([])
  const completedOrderNumber = ref<string>('')

  async function fetchGetOrder() {
    try {
      const res = await $fetch<{ products: IOrderProduct[] }>(ORDER_GET_ORDER_URL, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      orderList.value = res.products
    }
    catch (err) {
      console.error(err)
    }
  }

  async function fetchGetOrderConfig({ deliveryTypeId, paymentTypeId }: IOrderConfigQuery) {
    try {
      isOrderConfigLoading.value = true
      const res = await $fetch<{ config: IOrderConfig }>(ORDER_GET_ORDER_CONFIG_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
        body: { deliveryTypeId, paymentTypeId },
      })
      orderConfig.value = res.config
    }
    catch (err) {
      console.error(err)
    }
    finally {
      isOrderConfigLoading.value = false
    }
  }

  async function fetchGetDeliveryTypes() {
    try {
      const res = await $fetch<IDeliveryType[]>(ORDER_DELIVERY_TYPES_URL)
      deliveryTypes.value = res
    }
    catch (err) {
      console.error(err)
    }
  }

  async function fetchGetPaymentTypes() {
    try {
      const res = await $fetch<IPaymentType[]>(ORDER_PAYMENT_TYPES_URL)
      paymentTypes.value = res
    }
    catch (err) {
      console.error(err)
    }
  }

  async function fetchGetPickupPoints() {
    try {
      const res = await $fetch<IPickupPoint[]>(ORDER_GET_PICKUP_POINTS_URL)
      pickupPoints.value = res.sort((a, b) => a.metro.localeCompare(b.metro))
    }
    catch (err) {
      console.error(err)
    }
  }

  async function fetchCreateOrder(order: ICreatingOrder) {
    try {
      const res = await $fetch<{
        orderNumber: string
        cart: IBasketProduct[]
        config: IBasketConfig
      }>(ORDER_CREATE_ORDER_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
        body: { order },
      })
      completedOrderNumber.value = res.orderNumber
      basketStore.setBasket(res.cart, res.config)
    }
    catch (err) {
      console.error(err)
    }
  }

  function clearOrderNumber() {
    completedOrderNumber.value = ''
  }

  return {
    fetchGetOrder,
    orderList,
    fetchGetOrderConfig,
    orderConfig,
    isOrderConfigLoading,
    fetchGetDeliveryTypes,
    deliveryTypes,
    fetchGetPaymentTypes,
    paymentTypes,
    fetchGetPickupPoints,
    pickupPoints,
    fetchCreateOrder,
    completedOrderNumber,
    clearOrderNumber,
  }
})
