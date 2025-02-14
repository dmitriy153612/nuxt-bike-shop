<template>
  <div class="checkbox">
    <input
      :id="uniqId"
      v-model="updatedModelValue"
      class="checkbox__input"
      type="checkbox"
      :value="value"
      :disabled="disabled"
    >
    <label
      class="checkbox__label"
      :for="uniqId"
    >
      <span class="checkbox__fake-checkbox">&#10004;</span>
      <span
        v-if="label"
        class="checkbox__descr"
      >{{ label }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string[] | boolean
  value?: string
  label?: string
  disabled?: boolean
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string[] | boolean): void
}>()

const updatedModelValue = computed({
  get: () => props.modelValue,
  set: newValue => emit('update:modelValue', newValue),
})

const uniqId = useId()
</script>

<style scoped lang="scss">
.checkbox {
  display: flex;
  align-items: center;
  max-width: max-content;
  font-size: 18px;

  &__input {
    @include hidden;
  }
  &__input:focus-visible + &__label {
    border-color: $primary;
  }
  &__input:checked + &__label &__fake-checkbox {
    color: $primary;
    background-color: $secondary;
  }
  &__input:disabled + &__label {
    opacity: 0.6;
    cursor: default;
  }
  &__label {
    display: flex;
    align-items: center;
    column-gap: 0.4em;
    padding: 2px;
    cursor: pointer;
    user-select: none;
    border: 2px solid transparent;
    border-radius: 4px;
    color: $secondary;
    @include transition(border-color);
  }
  &__fake-checkbox {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: 1px solid $secondary;
    border-radius: 4px;
    color: transparent;
    background-color: transparent;
    @include transition(color, background-color);
  }
}
</style>
