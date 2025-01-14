import { COLORS_URL, SIZES_URL, BRANDS_URL } from '@/config/api';
import type { IColor, ISize, IBrand } from '@/types/catalog';

export const useFilterStore = defineStore('filterStore', () => {
  const colors = ref<IColor[]>([]);
  const sizes = ref<ISize[]>([]);
  const brands = ref<IBrand[]>([]);

  const isFilterLoaded = ref(false);

  async function fetchColors() {
    const data = await $fetch<IColor[]>(COLORS_URL);
    colors.value = data;
  }
  async function fetchSizes() {
    const data = await $fetch<ISize[]>(SIZES_URL);
    sizes.value = data;
  }
  async function fetchBrands() {
    const data = await $fetch<IBrand[]>(BRANDS_URL);
    brands.value = data;
  }

  async function fetchFilter() {
    if (isFilterLoaded.value) return;
    await Promise.allSettled([fetchColors(), fetchSizes(), fetchBrands()]);
    isFilterLoaded.value = true;
  }

  return {
    fetchFilter,
    colors,
    sizes,
    brands,
  };
});
