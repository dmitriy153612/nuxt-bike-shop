const BASE_API_URL: string = 'http://147.45.183.40:27017'

export const CATALOG_URL: string = `${BASE_API_URL}/catalog`
export const PRODUCT_URL: string = `${BASE_API_URL}/catalog/product`

export const COLORS_URL: string = `${BASE_API_URL}/colors`
export const SIZES_URL: string = `${BASE_API_URL}/sizes`
export const BRANDS_URL: string = `${BASE_API_URL}/brands`

export const LOGIN_URL: string = `${BASE_API_URL}/login`
export const REGISTRATION_URL: string = `${BASE_API_URL}/registration`
export const CHECK_AUTH_URL: string = `${BASE_API_URL}/check-auth`

export const CART_URL: string = `${BASE_API_URL}/cart`
export const CART_ADD_URL: string = `${BASE_API_URL}/cart/add`
export const CART_DELETE_URL: string = `${BASE_API_URL}/cart/delete`
export const CART_CHANGE_AMOUNT_URL: string = `${BASE_API_URL}/cart/change-amount`
export const CART_SELECT_CART_PRODUCT_URL: string = `${BASE_API_URL}/cart/select-product`

export const ORDER_GET_ORDER_URL: string = `${BASE_API_URL}/order`
export const ORDER_GET_ORDER_CONFIG_URL: string = `${BASE_API_URL}/order-config`
export const ORDER_CREATE_ORDER_URL: string = `${BASE_API_URL}/create-order`
export const ORDER_DELIVERY_TYPES_URL: string = `${BASE_API_URL}/delivery-types`
export const ORDER_PAYMENT_TYPES_URL: string = `${BASE_API_URL}/payment-types`
export const ORDER_GET_PICKUP_POINTS_URL: string = `${BASE_API_URL}/pickup-points`
