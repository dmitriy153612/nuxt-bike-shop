export default function formatCurrency(value: number | string, currencySymbol: boolean = true): string {
  const formattedValue = Number(value).toLocaleString('ru-RU', {
    style: currencySymbol ? 'currency' : undefined,
    currency: 'RUB',
    maximumFractionDigits: 0,
  })
  if (currencySymbol) {
    return formattedValue.split('').slice(0, -2).join('') + formattedValue.split('').slice(-1).join('')
  }
  return formattedValue
}
