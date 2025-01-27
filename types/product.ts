import type { ICatalogCard } from '@/types/catalog'

export interface ProductInfo {
  _id: string
  infoGroupName: string
  infoList: Array<{ _id: string, name: string, property: string }>
}

export interface IProduct extends ICatalogCard {
  info: ProductInfo[]
}
