<template>
  <Form
    v-slot="$form"
    ref="formRef"
    :key="isDeliveryAddressVisible ? 'delivery' : 'pickup'"
    class="form"
    :initial-values="initialValidateValues"
    :resolver="resolver"
    @submit="onSubmitForm"
  >
    <OrderFormReceivingMethod
      v-model="checkedDeliveryTypeId"
      :list="orderStore.deliveryTypes"
      :show-spinner="orderStore.isOrderConfigLoading"
    />
    <div class="form__switch-block">
      <div class="form__switch-block-left">
        <OrderFormAddress
          v-show="isDeliveryAddressVisible"
          v-model:city="address.city"
          v-model:street="address.street"
          v-model:house="address.house"
          v-model:building="address.building"
          v-model:flat="address.flat"
          :error-city="$form.city?.error?.message"
          :error-street="$form.street?.error?.message"
          :error-house="$form.house?.error?.message"
        />
        <OrderFormPickupPoint
          v-show="!isDeliveryAddressVisible"
          v-model="checkedPickupPointId"
          :list="orderStore.pickupPoints"
        />
      </div>
      <div class="form__switch-block-right">
        <KeepAlive>
          <OrderFormRecipient
            v-model:name="recipient.name"
            v-model:surname="recipient.surname"
            v-model:phone="recipient.phone"
            :error-name="$form.name?.error?.message"
            :error-surname="$form.surname?.error?.message"
            :error-phone="$form?.phone?.error?.message"
          />
        </KeepAlive>
      </div>
    </div>
    <OrderFormPaymentMethod
      v-model="checkedPaymentMethodId"
      :list="orderStore.paymentTypes"
    />
  </Form>
</template>

<script setup lang="ts">
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { Form, type FormSubmitEvent } from '@primevue/forms'
import type { IRecipient, IDeliveryAddress } from '@/types/order'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue' | 'invalid', value: boolean): void
}>()

const orderStore = useOrderStore()
const globalStore = useGlobalStore()

const formRef = ref()

const checkedDeliveryTypeId = ref<string>(findAvailableOrderOptionId(orderStore.deliveryTypes))
const checkedPickupPointId = ref<string>(orderStore.pickupPoints[0]._id)
const checkedPaymentMethodId = ref<string>(findAvailableOrderOptionId(orderStore.paymentTypes))

const recipient = ref<IRecipient>({
  name: '',
  surname: '',
  phone: '',
})

const address = ref<IDeliveryAddress>({
  city: 'Москва',
  street: '',
  house: '',
  building: '',
  flat: '',
})

const isDeliveryAddressVisible = computed<boolean>(() =>
  orderStore.deliveryTypes.find(item => item._id === checkedDeliveryTypeId.value)?.type === 'delivery',
)

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

const updatedSubmit = computed({
  get: () => props.modelValue,
  set: newValue => emit('update:modelValue', newValue),
})

const submitData = computed<ICreatingOrder>(() => {
  return {
    delivery: isDeliveryAddressVisible.value
      ? {
          deliveryTypeId: checkedDeliveryTypeId.value,
          pickupAddressId: checkedPickupPointId.value,
        }
      : {
          deliveryTypeId: checkedDeliveryTypeId.value,
          address: address.value,
        },
    deliveryListIds: orderStore.orderList.map(item => item.cartItemId),
    paymentTypeId: checkedPaymentMethodId.value,
    userData: recipient.value,
  }
})

const initialValidateValues = computed(() => {
  if (isDeliveryAddressVisible.value) {
    return {
      ...address.value,
      ...recipient.value,
    }
  }
  return recipient.value
})

const validationAddressSchema = z.object({
  city: z
    .string()
    .trim()
    .nonempty({ message: 'Введите город' }),
  street: z
    .string()
    .trim()
    .nonempty({ message: 'Введите улицу' }),
  house: z
    .string()
    .trim()
    .nonempty({ message: 'Введите номер дома' }),
})

const validationRecipientSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty({ message: 'Введите имя' })
    .min(2, { message: 'Не может быть короче 2 букв' }),
  surname: z
    .string()
    .trim()
    .nonempty({ message: 'Введите фамилию' })
    .min(2, { message: 'Не может быть короче 2 букв' }),
  phone: z
    .string()
    .trim()
    .nonempty({ message: 'Введите телефон' })
    .refine((value) => {
      const numbersOnly = value.replace(/\D/g, '')
      return numbersOnly.length === 11
    }, { message: 'Должен содержать 11 цифр' }),
})

const validationSchema = computed(() => {
  if (isDeliveryAddressVisible.value) {
    return validationAddressSchema.merge(validationRecipientSchema)
  }
  return validationRecipientSchema
})

const resolver = computed(() => zodResolver(validationSchema.value))

async function updateOrderConfig() {
  await orderStore.fetchGetOrderConfig({
    deliveryTypeId: checkedDeliveryTypeId.value,
    paymentTypeId: checkedPaymentMethodId.value,
  })
}

function createSubmitEvent() {
  if (formRef.value && updatedSubmit.value) {
    formRef.value.onSubmit()
    updatedSubmit.value = false
  }
}

async function onSubmitForm(e: FormSubmitEvent) {
  if (!e.valid) {
    emit('invalid', true)
    return
  }
  globalStore.showPageSpinner(true)
  await orderStore.fetchCreateOrder(submitData.value)
  globalStore.showPageSpinner(false)
}

watch(() => [checkedDeliveryTypeId.value, checkedPaymentMethodId.value], () => {
  updateOrderConfig()
})

watch(() => updatedSubmit.value, () => {
  createSubmitEvent()
})
</script>

<style scoped lang="scss">
$gap: 16px;
$gapXl: 24px;
.form {
  display: grid;
  gap: $gap;
  @media #{$xl-screen} {
    gap: $gapXl;
  }
  &__switch-block {
    display: grid;
    gap: $gap;
    @media #{$xl-screen} {
      gap: $gapXl;
      grid-template-columns: 1fr 234px;
    }
  }
}
</style>
