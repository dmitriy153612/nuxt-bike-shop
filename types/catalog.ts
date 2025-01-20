export interface ISize {
  _id: string
  name: string
  nameEn: string
}

export type IBrand = ISize

export interface IColor extends ISize {
  code: string
}

export interface ICatalogConfig {
  limit: number
  page: number
  totalPages: number
  totalProducts: number
}

export interface ICatalogCard {
  _id: string
  brand: IBrand
  color: IColor
  pictures: string[]
  price: number
  oldPrice: number
  discount: number
  sizes: ISize[]
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
