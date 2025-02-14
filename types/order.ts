import type { IFilterOption } from '@/types/catalog'

export interface IOrderProduct {
  amount: number
  brand: IFilterOption
  cartItemId: string
  color: IFilterOption
  picture: string
  price: number
  priceForOne: number
  productId: string
  selected: boolean
  size: IFilterOption
  title: string
  discount?: number
  oldPrice?: number
  priceDifference?: number
}

export interface IOrderConfigQuery {
  deliveryTypeId: string
  paymentTypeId: string
}

export interface IDeliveryType {
  _id: string
  type: 'pickup' | 'delivery'
  price: number
  name: string
  deliveryTime: number
  available: boolean
}

export interface IOrderConfig {
  deliveryName: string
  deliveryPrice: number
  deliveryTypeId: string
  paymentName: string
  paymentTypeId: string
  selectedAmount: number
  totalAmount: number
  totalOldPrice: number
  totalPrice: number
  totalPriceDifference: number
}

export interface IPickupPoint {
  _id: string
  address: string
  lineColor: string
  metro: string
  workTime: {
    _id: string
    day: string
    time: string
  }[]
}

export interface IRecipient {
  name: string
  surname: string
  phone: string
}
export interface IDeliveryAddress {
  city: string
  street: string
  house: string
  building: string
  flat: string
}

export interface IPaymentType {
  _id: string
  type: 'online' | 'upon-receiving'
  name: string
  available: boolean
}

export interface ICreatingOrder {
  delivery: {
    deliveryTypeId: string
    pickupAddressId: string
  } | {
    deliveryTypeId: string
    address: IDeliveryAddress
  }
  deliveryListIds: string[]
  paymentTypeId: string
  userData: IRecipient
}

export function isIPaymentType(data: object): data is IPaymentType {
  return '_id' in data && 'type' in data && 'name' in data && 'available' in data
}

export function isIPickupPoint(data: object): data is IPickupPoint {
  return '_id' in data && 'address' in data && 'lineColor' in data && 'metro' in data && 'workTime' in data
}

export function isIDeliveryType(data: object): data is IDeliveryType {
  return (
    '_id' in data
    && 'type' in data
    && 'price' in data
    && 'name' in data
    && 'available' in data
    && 'deliveryTime' in data
  )
}
