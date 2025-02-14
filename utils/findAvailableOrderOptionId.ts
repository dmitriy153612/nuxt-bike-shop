import type { IPaymentType, IDeliveryType } from '@/types/order'

function findAvailableOrderOptionId(optionList: IPaymentType[] | IDeliveryType[]): string {
  const availableObj = optionList.find(item => item.available)
  return availableObj ? availableObj._id : ''
}

export default findAvailableOrderOptionId
