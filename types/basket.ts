import type { IFilterOption } from '@/types/catalog'

export interface IAddedProductToBasket {
  productId: string
  sizeId: string
  amount: number
}

export interface IBasketConfig {
  selectedAmount: number
  totalAmount: number
  totalOldPrice: number
  totalPrice: number
  totalPriceDifference: number
}

export interface IBasketProduct {
  cartItemId: string
  amount: number
  brand: IFilterOption
  color: IFilterOption
  discount: number
  oldPrice: number
  picture: string
  price: number
  priceDifference: number
  priceForOne: number
  productId: string
  selected: boolean
  size: IFilterOption
  title: string
}

export interface IBasketResponse {
  config: IBasketConfig
  products: IBasketProduct[]
}
