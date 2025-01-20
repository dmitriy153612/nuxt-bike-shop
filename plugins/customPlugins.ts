export default defineNuxtPlugin(() => {
  return {
    provide: {
      formatCurrency,
    },
  }
})

function formatCurrency(value: number | string): string {
  return Number(value).toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  })
}
