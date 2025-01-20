import type { ISelect } from '@/types/select'

export const CATALOG_PER_PAGE: number = 8
export const SORTING_OPTIONS: ISelect[] = [
  { label: 'По релевантности', id: '' },
  { label: 'Цена по возрастанию', id: 'priceUp' },
  { label: 'Цена по убыванию', id: 'priceDown' },
]
