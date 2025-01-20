<template>
  <Select
    v-model="updatedModelValue"
    class="select"
    :options="options"
    option-label="label"
    checkmark
    :highlight-on-select="false"
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

</style>
