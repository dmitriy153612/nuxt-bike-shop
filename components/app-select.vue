<template>
    <Select
    class="select"
    v-model="updatedModelValue"
    :options="options"
    optionLabel="label"
    checkmark
    :highlightOnSelect="false"
  />
</template>

<script setup lang="ts">

interface ISelect {
    label: string;
    id: string;
}
const props = defineProps<{
  modelValue: ISelect,
  options: ISelect[],
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: ISelect): void
}>()

const updatedModelValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue)
})
</script>

<style scoped lang="scss">

</style>
