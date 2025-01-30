import { useAuthStore } from '~/stores/authStore'
import type {
  IAddedProductToBasket,
  IBasketProduct,
  IBasketConfig,
  IBasketResponse,
} from '@/types/basket'
import {
  BASKET_ADD_URL,
  BASKET_URL,
  BASKET_SELECT_PRODUCT_URL,
  BASKET_CHANGE_AMOUNT_URL,
  BASKET_DELETE_URL,
} from '@/config/api'

export const useBasketStore = defineStore('basketStore', () => {
  const authStore = useAuthStore()
  const basketList = ref<IBasketProduct[]>([])
  const config = ref<IBasketConfig>({
    selectedAmount: 0,
    totalAmount: 0,
    totalOldPrice: 0,
    totalPrice: 0,
    totalPriceDifference: 0,
  })

  const amountOfCurrentChangingProducts = ref<number>(0)
  const isAllListSelectLoading = ref<boolean>(false)

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

  async function fetchGetBasket() {
    try {
      const res = await $fetch<IBasketResponse>(BASKET_URL, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      basketList.value = res.products
      config.value = res.config
    }
    catch (err) {
      console.error(err)
    }
  }

  async function fetchSelectProduct(
    isSelected: boolean,
    basketItemId?: string,
  ) {
    if (basketItemId) {
      const product: IBasketProduct | undefined = basketList.value.find(
        item => item.cartItemId === basketItemId,
      )
      if (product) {
        product.selected = isSelected
      }
      amountOfCurrentChangingProducts.value++
    }
    else {
      isAllListSelectLoading.value = true
      basketList.value.forEach((product) => {
        product.selected = isSelected
      })
    }
    const basketItems: { cartItemId: string, selected: boolean }[]
      = basketList.value.map(product => ({
        cartItemId: product.cartItemId,
        selected: product.selected,
      }))

    try {
      const res = await $fetch<IBasketResponse>(BASKET_SELECT_PRODUCT_URL, {
        method: 'PUT',
        body: { cartItemIds: basketItems },
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })

      basketList.value = res.products
      config.value = res.config
    }
    catch (err) {
      console.error(err)
      fetchGetBasket()
    }
    finally {
      if (basketItemId) {
        amountOfCurrentChangingProducts.value--
      }
      else {
        isAllListSelectLoading.value = false
      }
    }
  }

  function updateBasketAmount(
    amount: number,
    basketItemId: string,
  ): IBasketProduct | undefined {
    const product: IBasketProduct | undefined = basketList.value.find(
      item => item.cartItemId === basketItemId,
    )
    if (product) {
      product.amount = amount
    }
    return product
  }

  async function fetchChangeBasketAmount(product: IBasketProduct | undefined) {
    if (product?.selected) {
      amountOfCurrentChangingProducts.value++
    }
    try {
      const basketItems = basketList.value.map((product: IBasketProduct) => {
        return { cartItemId: product.cartItemId, amount: product.amount }
      })
      const res = await $fetch<IBasketResponse>(BASKET_CHANGE_AMOUNT_URL, {
        method: 'PUT',
        body: { cartItems: basketItems },
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      basketList.value = res.products
      config.value = res.config
    }
    catch (err) {
      console.error(err)
      fetchGetBasket()
    }
    finally {
      console.log(product?.selected)
      if (product?.selected) {
        amountOfCurrentChangingProducts.value--
      }
    }
  }

  async function fetchDeleteSelectedProducts() {
    const selectedProductsIds: string[] = []
    basketList.value.forEach((product) => {
      if (product.selected) {
        selectedProductsIds.push(product.cartItemId)
      }
    })
    console.log(selectedProductsIds)
    try {
      const res = await $fetch<IBasketResponse>(BASKET_DELETE_URL, {
        method: 'DELETE',
        body: { cartItemIds: selectedProductsIds },
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      console.log(res)
      basketList.value = res.products
      config.value = res.config
    }
    catch (err) {
      console.error(err)
    }
  }

  return {
    setTotalAmount,
    fetchAddProduct,
    fetchGetBasket,
    basketList,
    config,
    fetchSelectProduct,
    isAllListSelectLoading,
    fetchChangeBasketAmount,
    updateBasketAmount,
    amountOfCurrentChangingProducts,
    fetchDeleteSelectedProducts,
  }
})
