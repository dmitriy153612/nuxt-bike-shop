<template>
  <div class="size-picker">
    <h4 class="size-picker__title">Доступные размеры:</h4>
    <ul class="size-picker__list">
      <li v-for="(size, index) in sizes" :key="index" class="size-picker__item">
        <input
          :id="uniqIds[index]"
          v-model="updatedModelValue"
          type="radio"
          class="size-picker__input"
          :value="size._id"
        />
        <label class="size-picker__label" :for="uniqIds[index]">
          <span class="size-picker__descr">{{ size.name }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { type ISize } from '@/types/catalog';
const { $uniqId } = useNuxtApp();

const props = defineProps<{
  modelValue: string;
  sizes: ISize[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void;
}>();

const uniqIds = Array.from({ length: props.sizes.length }, () => $uniqId());

const updatedModelValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue),
});
</script>

<style lang="scss" scoped>
.size-picker {
  margin: 0;
  padding: 0;
  border: none;

  &__title {
    display: flex;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 10px;
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
    border: 1px solid var(--secondary);
    border-radius: 5px;
    padding: 2px;
    font-size: 18px;
    min-width: 1.5em;
    color: var(--secondary);
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
    border-color: var(--secondary);
    background-color: var(--secondary);
    transform: scale(1.3);
  }

  &__input:focus + &__label {
    color: var(--primary);
  }
}
</style>
