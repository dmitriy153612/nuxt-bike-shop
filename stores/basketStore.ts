import type { IAddedTobasketProduct } from '@/types/basket'

export const useBasketStore = defineStore('basketStore', () => {
  const basket = ref<IAddedTobasketProduct[]>([])


  return {

  }
})
