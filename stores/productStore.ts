import type { IProduct } from '@/types/product'

import { PRODUCT_URL } from '~/config/api'

export const useProductStore = defineStore('productStore', () => {
  const product = ref<IProduct | null>(null)

  async function fetchProduct({ id }: { id: string }) {
    product.value = null
    try {
      const data = await $fetch<IProduct>(`${PRODUCT_URL}/${id}`)
      product.value = data
    }
    catch (err) {
      console.error(err)
    }
  }
  return {
    product,
    fetchProduct,
  }
})
