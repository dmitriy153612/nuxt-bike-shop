import { COLORS_URL, SIZES_URL, BRANDS_URL } from '@/config/api'
import type { IFilterOption } from '@/types/catalog'

export const useFilterStore = defineStore('filterStore', () => {
  const colors = ref<IFilterOption[]>([])
  const sizes = ref<IFilterOption[]>([])
  const brands = ref<IFilterOption[]>([])

  const isFilterLoaded = ref(false)

  function getSizeName(sizeId: string): string {
    const sizeObj = sizes.value.find(item => item._id === sizeId)
    return sizeObj ? sizeObj.name : ''
  }

  async function fetchColors() {
    const data = await $fetch<IFilterOption[]>(COLORS_URL)
    colors.value = data
  }
  async function fetchSizes() {
    const data = await $fetch<IFilterOption[]>(SIZES_URL)
    sizes.value = data
  }
  async function fetchBrands() {
    const data = await $fetch<IFilterOption[]>(BRANDS_URL)
    brands.value = data
  }

  async function fetchFilter() {
    if (isFilterLoaded.value) return
    await Promise.allSettled([fetchColors(), fetchSizes(), fetchBrands()])
    isFilterLoaded.value = true
  }

  return {
    fetchFilter,
    colors,
    sizes,
    brands,
    fetchSizes,
    getSizeName,
  }
})
