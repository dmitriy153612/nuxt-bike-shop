import type { TCatalogRequestParams, isTCatalogRequestParams } from '@/types/catalog';
import type { LocationQuery } from 'vue-router';


export default function useRouteCatalogQueries() {
  function getCatalogQueries(routeQueries: LocationQuery): TCatalogRequestParams {
    let queryParams: TCatalogRequestParams = {};

    

    return queryParams;
  }

  return {
    getCatalogQueries,
  };
}
