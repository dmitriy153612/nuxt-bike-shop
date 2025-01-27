import type { IBrand, IColor, ISize } from '@/types/catalog'

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
  brand: IBrand
  color: IColor
  discount: number
  oldPrice: number
  picture: string
  price: number
  priceDifference: number
  priceForOne: number
  productId: string
  selected: boolean
  size: ISize
  title: string
}

export interface IBasketResponse {
  config: IBasketConfig
  products: IBasketProduct[]
}
