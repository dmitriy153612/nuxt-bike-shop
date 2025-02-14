<template>
  <OrderFieldset legend="Способ оплаты">
    <OrderFormRadioList
      v-model="updatedModelValue"
      :list="list"
    >
      <template #default="{ data }">
        <template v-if="isIPaymentType(data)">
          <div class="payment">
            <span class="payment__name">{{ data.name }}</span>
            <span
              v-if="!data.available"
              class="payment__disabled-message"
            >
              Временно недоступно
            </span>
          </div>
        </template>
      </template>
    </OrderFormRadioList>
  </OrderFieldset>
</template>

<script setup lang="ts">
import { type IPaymentType, isIPaymentType } from '@/types/order'

const props = defineProps<{
  modelValue: string
  list: IPaymentType[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>()

const updatedModelValue = computed({
  get: () => props.modelValue,
  set: newValue => emit('update:modelValue', newValue),
})
</script>

<style scoped lang="scss">
.payment {
  display: grid;
  gap: 4px;
  color: $secondary;
  &__disabled-message {
    font-size: 16px;
    font-weight: 600;
  }
}
</style>
