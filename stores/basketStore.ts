import { useAuthStore } from '~/stores/authStore'
import type {
  IAddedProductToBasket,
  IBasketProduct,
  IBasketConfig,
} from '@/types/basket'
import { BASKET_ADD_URL } from '@/config/api'

export const useBasketStore = defineStore('basketStore', () => {
  const authStore = useAuthStore()
  const basketList = shallowRef<IBasketProduct[]>([])
  const config = ref<IBasketConfig>({
    selectedAmount: 0,
    totalAmount: 0,
    totalOldPrice: 0,
    totalPrice: 0,
    totalPriceDifference: 0,
  })

  async function fetchAddProduct({
    productId,
    sizeId,
    amount,
  }: IAddedProductToBasket) {
    if (!authStore.token) {
      authStore.showLoginModal(true)
      return
    }
    try {
      const { totalCartAmount } = await $fetch<{ totalCartAmount: number }>(
        BASKET_ADD_URL,
        {
          method: 'POST',
          body: { productId, sizeId, amount },
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        },
      )

      setTotalAmount(totalCartAmount)
    }
    catch (err) {
      console.error(err)
    }
  }

  function setTotalAmount(amount: number) {
    config.value.totalAmount = amount
  }

  return {
    setTotalAmount,
    fetchAddProduct,
    config,
    basketList,
  }
})
