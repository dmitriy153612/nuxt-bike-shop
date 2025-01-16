<template>
<FloatLabel variant="on">
    <InputNumber v-model="updatedModelValue" :min="0" :fluid="true" suffix=" ₽" :inputId="uniqId" />
    <label :for="uniqId">{{ label }}</label>
</FloatLabel>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: number | undefined,
  label: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: number | undefined): void
}>()

const updatedModelValue = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    let updatedValue = undefined
    if (newValue !== null) {
      updatedValue = newValue
    }
    emit('update:modelValue', updatedValue)
  }
})

const uniqId = useId()

</script>