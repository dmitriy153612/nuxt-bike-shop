<template>
  <Select
    v-model="updatedModelValue"
    :options="options"
    option-label="label"
    checkmark
    :highlight-on-select="false"

    :pt="{
      root: { class: 'select' },
    }"
  />
</template>

<script setup lang="ts">
import type { ISelect } from '@/types/select'

const props = defineProps<{
  modelValue: ISelect
  options: ISelect[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: ISelect): void
}>()

const updatedModelValue = computed({
  get: () => props.modelValue,
  set: newValue => emit('update:modelValue', newValue),
})
</script>

<style scoped lang="scss">
.select {
  border: 1px solid $secondary;
  border-radius: 4px;
  background-color: $body;
  &:focus-within {
    border-color: $primary;
  }
  :deep(.p-select-label) {
    color: $secondary;
  }
}
</style>
