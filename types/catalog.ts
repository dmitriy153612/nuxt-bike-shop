export interface ISize {
  _id: string;
  name: string;
  nameEn: string;
}

export interface IBrand extends ISize {}

export interface IColor extends ISize {
  code: string;
}

export interface ICatalogConfig {
  limit: number;
  page: number;
  totalPages: number;
  totalProducts: number;
}

export interface ICatalogCard {
  _id: string;
  brand: IBrand;
  color: IColor;
  pictures: string[];
  price: number;
  oldPrice: number;
  discount: number;
  sizes: ISize[];
  title: string;
}

export interface ICatalogResponse {
  config: ICatalogConfig;
  catalog: ICatalogCard[];
}



export interface ICatalogConfig {
  limit: number;
  page: number;
  totalPages: number;
  totalProducts: number;
}

export interface IFilterParams {
  brandId?: string | string[];
  colorId?: string | string[];
  sizeId?: string | string[];
  maxPrice?: string;
  minPrice?: string;
}

export interface ISortingQueryObj {
  sorting?: string;
}

export type TCatalogRequestParams = { page?: number } & ISortingQueryObj & IFilterParams;


export function isTCatalogRequestParams(obj: unknown): obj is TCatalogRequestParams {
  if (typeof obj !== 'object' || obj === null) return false;

  const validStringOrArray = (val: unknown) =>
    typeof val === 'string' || (Array.isArray(val) && val.every((item) => typeof item === 'string'));

  return (
    ('page' in obj && (obj.page === undefined || typeof obj.page === 'number')) &&
    ('sorting' in obj && (obj.sorting === undefined || typeof obj.sorting === 'string')) &&
    ('brandId' in obj && (obj.brandId === undefined || validStringOrArray(obj.brandId)) )&&
    ('colorId' in obj && (obj.colorId === undefined || validStringOrArray(obj.colorId))) &&
    ('sizeId' in obj && (obj.sizeId === undefined || validStringOrArray(obj.sizeId))) &&
    ('maxPrice' in obj && (obj.maxPrice === undefined || typeof obj.maxPrice === 'string')) &&
    ('minPrice' in obj && (obj.minPrice === undefined || typeof obj.minPrice === 'string'))
  );
}

