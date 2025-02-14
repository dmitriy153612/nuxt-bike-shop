<template>
  <OrderFieldset legend="Адрес доставки">
    <ul class="address-list">
      <li class="address-list__item address-list__item--long">
        <OrderFormInput
          v-model="updatedCity"
          :required="true"
          label="Город"
          name="city"
          :error-message="errorCity"
          :disabled="true"
        />
      </li>
      <li class="address-list__item address-list__item--long">
        <OrderFormInput
          v-model="updatedStreet"
          :required="true"
          label="Улица"
          name="street"
          :error-message="errorStreet"
        />
      </li>
      <li class="address-list__item address-list__item--short">
        <OrderFormInput
          v-model="updatedHouse"
          :required="true"
          label="Дом"
          name="house"
          :error-message="errorHouse"
        />
      </li>
      <li class="address-list__item address-list__item--short">
        <OrderFormInput
          v-model="updatedBuilding"
          label="Кор."
          name="building"
        />
      </li>
      <li class="address-list__item address-list__item--short">
        <OrderFormInput
          v-model="updatedFlat"
          label="Кв."
          name="flat"
        />
      </li>
    </ul>
  </OrderFieldset>
</template>

<script setup lang="ts">
const props = defineProps<{
  city: string
  street: string
  house: string
  building: string
  flat: string
  errorCity?: string
  errorStreet?: string
  errorHouse?: string
}>()

const emit = defineEmits<{
  (e: 'update:city' | 'update:street' | 'update:house' | 'update:building' | 'update:flat', value: string): void
}>()

const updatedCity = computed({
  get: () => props.city,
  set: newValue => emit('update:city', newValue),
})
const updatedStreet = computed({
  get: () => props.street,
  set: newValue => emit('update:street', newValue),
})
const updatedHouse = computed({
  get: () => props.house,
  set: newValue => emit('update:house', newValue),
})
const updatedBuilding = computed({
  get: () => props.building,
  set: newValue => emit('update:building', newValue),
})
const updatedFlat = computed({
  get: () => props.flat,
  set: newValue => emit('update:flat', newValue),
})
</script>

<style scoped lang="scss">
.address-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  &__item {
    min-width: auto;
    &--long {
      flex: 1 1 100%;
    }
    &--short {
      flex: 1 1 30%;
    }
  }
}
</style>
