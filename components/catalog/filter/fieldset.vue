<template>
  <fieldset class="fieldset">
    <legend class="fieldset__legend">
      {{ legend }}
    </legend>
    <ul class="fieldset__list">
      <li
        v-for="prop in properties"
        :key="prop._id"
        class="fieldset__item"
      >
        <Checkbox
          v-model="updatedModelValue"
          :value="prop._id"
          :label="prop.name"
        />
      </li>
    </ul>
  </fieldset>
</template>

<script setup lang="ts">
import type { IFilterOption } from '~/types/catalog'

const props = defineProps<{
  modelValue: string[]
  legend: string
  properties: IFilterOption[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string[]): void
}>()

const updatedModelValue = computed({
  get: () => props.modelValue,
  set: newValue => emit('update:modelValue', newValue),
})
</script>

<style scoped lang="scss">
.fieldset {
  margin: 0;
  padding: 0;
  border: none;
  &__legend {
    margin-bottom: 10px;
    font-weight: 600;
    color: $secondary;
  }
}
</style>
