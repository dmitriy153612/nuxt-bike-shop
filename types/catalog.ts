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
  oldPrice?: number;
  discount?: number;
  sizes: ISize[];
  title: string;
}

export interface ICatalogResponse {
  config: ICatalogConfig;
  catalog: ICatalogCard[];
}

export interface IFilterParams {
  brandId?: string | string[]
  colorId?: string | string[]
  sizeId?: string | string[]
  maxPrice?: string | undefined
  minPrice?: string | undefined
}

export interface ICatalogConfig {
  limit: number;
  page: number;
  totalPages: number;
  totalProducts: number;
}

export type ICatalogRequestParams = Pick<ICatalogConfig, 'page'> & IFilterParams
