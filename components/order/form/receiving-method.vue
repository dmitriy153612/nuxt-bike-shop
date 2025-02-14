<template>
  <OrderFieldset
    legend="Способ получения"
    :show-spinner="showSpinner"
  >
    <OrderFormRadioList
      v-model="updatedModelValue"
      :list="list"
    >
      <template #default="{ data }">
        <template v-if="isIDeliveryType(data)">
          <div class="method">
            <div
              class="method__left"
              :class="{ 'method__left--checked': data._id === modelValue }"
            >
              <ClientOnly>
                <Component :is="getIcon(data.type)" />
              </ClientOnly>
            </div>
            <div class="method__center">
              <span class="method__center-name">{{ data.name }}</span>
              <span class="method__center-duration">{{ formatDays(data.deliveryTime) }}</span>
            </div>
            <div class="method__right">
              {{ formatCurrency(data.price) }}
            </div>
          </div>
        </template>
      </template>
    </OrderFormRadioList>
  </OrderFieldset>
</template>

<script setup lang="ts">
import { isIDeliveryType, type IDeliveryType } from '@/types/order'

const props = defineProps<{
  modelValue: string
  list: IDeliveryType[]
  showSpinner: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>()

const updatedModelValue = computed({
  get: () => props.modelValue,
  set: newValue => emit('update:modelValue', newValue),
})

function getIcon(type: 'delivery' | 'pickup') {
  if (type === 'delivery') {
    return resolveComponent('IconTruck')
  }
  else if (type === 'pickup') {
    return resolveComponent('IconLocation')
  }
}

function formatDays(hours: number) {
  const days = Math.floor(hours / 24)
  return `${days} ${getDayWord(days)}`
}

function getDayWord(days: number) {
  if (days % 10 === 1 && days % 100 !== 11) return 'день'
  if ([2, 3, 4].includes(days % 10) && ![12, 13, 14].includes(days % 100)) return 'дня'
  return 'дней'
}
</script>

<style scoped lang="scss">
.method {
  display: flex;
  align-items: center;
  column-gap: 8px;
  &__left {
    flex-shrink: 0;
    height: 30px;
    width: 30px;
    color: $primary;
    &--checked {
      color: $alert;
    }
  }
  &__center {
    flex-grow: 1;
    display: grid;
    row-gap: 8px;
    font-size: 16px;
    &-name {
      font-weight: 500;
    }
  }
}
</style>
