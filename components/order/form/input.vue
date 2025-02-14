<template>
  <div class="input-block">
    <FloatLabel variant="on">
      <Component
        :is="componentIs"
        v-model="updatedModelValue"
        :fluid="true"
        :input-id="uniqId"
        :invalid="!!errorMessage"
        v-bind="maskAttrs"
        :disabled="disabled"
        :name="name"
        :pt="{
          root: { id: uniqId },
        }"
      />
      <label :for="uniqId">{{ label }}<span
        v-if="required"
        class="input-block__star"
      >*</span>
      </label>
    </FloatLabel>
    <ClientOnly>
      <span
        v-if="errorMessage"
        class="input-block__error"
      >
        {{ errorMessage }}
      </span>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const uniqId = useId()

const props = withDefaults(defineProps<{
  modelValue: string
  label: string
  name: string
  required?: boolean
  errorMessage?: string
  inputType?: 'text' | 'mask'
  disabled?: boolean
}>(), {
  errorMessage: '',
  inputType: 'text',
})

const componentIs = computed(() => {
  return props.inputType === 'mask' ? 'InputMask' : 'InputText'
})

const maskAttrs = computed(() => {
  if (props.inputType === 'mask') {
    return {
      mask: '+7 (999) 999 99 99',
      autoClear: false,
    }
  }
  return null
})

const emit = defineEmits<{
  (e: 'update:modelValue' | 'input', modelValue: string): void
}>()

const updatedModelValue = computed({
  get: () => props.modelValue,
  set: newValue => emit('update:modelValue', newValue),
})
</script>

<style scoped lang="scss">
.input-block {
  &__star {
    color: $alert;
  }
  &__error {
    display: flex;
    color: $alert;
    font-size: 12px;
    line-height: 1.2;
  }
}

.p-inputtext {
  font-size: 18px;
  color: $secondary;
  font-weight: 500;
}
.p-inputtext:disabled {
  background-color: $secondary300;
  opacity: 0.6;
}
</style>
