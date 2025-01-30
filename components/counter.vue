<template>
  <div class="counter">
    <div class="counter__control">
      <Btn
        class="counter__btn"
        appearance="icon"
        icon-name="minus"
        :aria-label="ariaDecreaseBtn"
        :disabled="modelValue <= minValue"
        @click="decrease"
      />
      <output
        class="counter__output"
        :aria-label="ariaOutput"
      >
        {{ modelValue }}
      </output>
      <Btn
        class="counter__btn"
        appearance="icon"
        icon-name="plus"
        :aria-label="ariaIncreaseBtn"
        :disabled="modelValue >= maxValue"
        @click="increase"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: number
  minValue?: number
  maxValue?: number
  ariaDecreaseBtn?: string
  ariaIncreaseBtn?: string
  ariaOutput?: string
}>(), {
  minValue: 1,
  maxValue: 99,
  ariaDecreaseBtn: 'уменьшить',
  ariaIncreaseBtn: 'увеличить',
  ariaOutput: 'количество',
})

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: number): void
}>()

function increase() {
  if (props.modelValue >= props.maxValue) return
  emit('update:modelValue', props.modelValue + 1)
}

function decrease() {
  if (props.modelValue <= props.minValue) return
  emit('update:modelValue', props.modelValue - 1)
}
</script>

<style scoped lang="scss">
.counter {
  display: grid;
  max-width: max-content;
  &__output {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-inline: 4px;
    min-width: 40px;
    font-size: 24px;
  }
  &__control {
    display: flex;
    column-gap: 4px;
    flex-wrap: nowrap;
    :deep(.p-inputnumber-input) {
        padding: 0px;
        font-size: 24px;
        text-align: center;
        max-width: 40px;
    }
  }
}
</style>
