<template>
  <ul
    class="radio-list"
    :class="{ 'radio-list--column': column === true }"
  >
    <li
      v-for="item in list"
      :key="item._id"
      class="radio-list__item"
    >
      <div class="radio-list__radio">
        <input
          :id="item._id"
          v-model="updatedModelValue"
          :value="item._id"
          class="radio-list__input"
          type="radio"
          :name="uniqListName"
          :disabled="'available' in item && !item.available"
        >
        <label
          :for="item._id"
          class="radio-list__label"
        >
          <span class="radio-list__fake-radio">
            <span class="radio-list__fake-radio-dot" />
          </span>
          <div class="radio-list__descr">
            <slot :data="item" />
          </div>
        </label>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { IPaymentType, IDeliveryType, IPickupPoint } from '@/types/order'

const props = defineProps<{
  modelValue: string
  list: IPaymentType[] | IDeliveryType[] | IPickupPoint[]
  column?: boolean
}>()

const uniqListName = useId()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>()

const updatedModelValue = computed({
  get: () => props.modelValue,
  set: newValue => emit('update:modelValue', newValue),
})
</script>

<style scoped lang="scss">
.radio-list {
  display: grid;
  gap: 8px;
  @media #{$lg-screen} {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
  &--column {
    grid-template-columns: 1fr
  }
  &__radio {
    height: 100%
  }
  &__input {
    @include hidden;
  }
  &__label {
    display: flex;
    align-items: center;
    column-gap: 8px;
    padding: 6px;
    height: 100%;
    border: 2px solid $secondary300;
    border-radius: 6px;
    cursor: pointer;
    @include transition(border-color);
  }
  &__descr {
    flex-grow: 1;
  }
  &__fake-radio {
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    height: 20px;
    width: 20px;
    border:  2px solid $secondary500;
    border-radius: 50%;
    @include transition(border-color);
    &-dot {
      height: 50%;
      width: 50%;
      border-radius: 50%;
      background-color: transparent;
      @include transition(background-color);
    }
  }

  &__input:checked + &__label {
    border-color: $primary;
    background-color: $primary50;
  }
  &__input:checked + &__label & {
    &__fake-radio {
      border-color: $alert;
      &-dot {
        background-color: $alert;
      }
    }
  }
  &__input:focus-visible + &__label {
    border-color: $alert;
  }
  &__input:disabled + &__label {
    background-color: $secondary300;
    opacity: 0.6;
    cursor: default;
  }
}
</style>
