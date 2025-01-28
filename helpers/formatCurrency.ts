export default function formatCurrency(value: number | string): string {
  const formattedValue = Number(value).toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  })

  return formattedValue.split('').slice(0, -2).join('') + formattedValue.split('').slice(-1).join('')
}
