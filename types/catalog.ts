export interface IFilterOption {
  _id: string
  name: string
  nameEn: string
}

export interface ICatalogConfig {
  limit: number
  page: number
  totalPages: number
  totalProducts: number
}

export interface ICatalogCard {
  _id: string
  brand: IFilterOption
  color: IFilterOption
  pictures: string[]
  price: number
  oldPrice: number
  discount: number
  sizes: IFilterOption[]
  title: string
}

export interface ICatalogResponse {
  config: ICatalogConfig
  catalog: ICatalogCard[]
}

export interface ICatalogConfig {
  limit: number
  page: number
  totalPages: number
  totalProducts: number
}

export interface ISortingQueryObj {
  sorting?: string
}

export type TCatalogRequestParams = {
  page?: number
  brandId?: string[]
  colorId?: string[]
  sizeId?: string[]
  maxPrice?: string
  minPrice?: string
}

export interface IFilter {
  brandId: string[]
  colorId: string[]
  sizeId: string[]
  minPrice: number | undefined
  maxPrice: number | undefined
}
