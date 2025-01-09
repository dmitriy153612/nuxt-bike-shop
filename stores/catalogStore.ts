import type {
  ICatalogResponse,
  ICatalogConfig,
  ICatalogCard,
  TCatalogRequestParams,
} from '@/types/catalog';
import { CATALOG_PER_PAGE } from '~/config/catalogVariables';
import { CATALOG_URL } from '~/config/api';

export const useCatalogStore = defineStore('catalogStore', () => {
  const { showPageSpinner } = useGlobalStore();

  const catalog = ref<ICatalogCard[]>([]);
  const config = ref<ICatalogConfig | null>(null);

  async function fetchCatalog(
    queryParams: TCatalogRequestParams | undefined = {}
  ) {
    try {
      showPageSpinner(true);
      const res = await $fetch<ICatalogResponse>(CATALOG_URL, {
        params: { ...queryParams, limit: CATALOG_PER_PAGE },
      });
      catalog.value = res.catalog;
      config.value = res.config;
    } catch (err) {
      console.error(err);
    } finally {
      showPageSpinner(false);
    }
  }
  return {
    fetchCatalog,
    config,
    catalog,
  };
});
