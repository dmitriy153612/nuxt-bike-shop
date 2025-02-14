<template>
  <div class="picker">
    <Component
      :is="tilteTag"
      class="picker__title"
    >
      {{ title }}
    </Component>
    <ul class="picker__list">
      <li
        v-for="(size, index) in options"
        :key="uniqIds[index]"
        class="picker__item"
      >
        <input
          :id="uniqIds[index]"
          v-model="updatedModelValue"
          type="radio"
          class="picker__input"
          :value="size._id"
        >
        <label
          class="picker__label"
          :for="uniqIds[index]"
        >
          <span class="picker__descr">{{ size.name }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { IFilterOption } from '@/types/catalog'

const props = defineProps<{
  title: string
  modelValue: string
  options: IFilterOption[]
  tilteTag: 'h3' | 'h4' | 'h5' | 'h6'
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>()

const uniqIds = Array.from({ length: props.options.length }, () => useId())

const updatedModelValue = computed({
  get: () => props.modelValue,
  set: newValue => emit('update:modelValue', newValue),
})
</script>

<style lang="scss" scoped>
.picker {
  position: relative;
  margin: 0;
  padding: 0;
  border: none;
  max-width: max-content;

  &__title {
    display: flex;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 400;
    color: $secondary;
  }

  &__list {
    display: flex;
    gap: 10px;
    margin: 0;
    padding: 0 0 0 4px;
  }

  &__item {
    position: relative;
    display: flex;
  }

  &__input {
    position: absolute;
    transform: scale(0);
    opacity: 0;
    cursor: pointer;
  }

  &__label {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid $secondary;
    border-radius: 6px;
    padding: 2px;
    font-size: 18px;
    min-width: 1.5em;
    color: $secondary;
    cursor: pointer;
    @include transition(border-color, color, transform, background-color);
  }

  &__input + &__label {
    user-select: none;
  }

  &__descr {
    text-transform: uppercase;
  }

  &__input:checked + &__label {
    color: white;
    border-color: $secondary;
    background-color: $secondary;
    transform: scale(1.3);
  }

  &__input:focus + &__label {
    color: $primary;
  }
}
</style>
