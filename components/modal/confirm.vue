<template>
  <Dialog
    v-model:visible="updatedModelValue"
    modal
    dismissable-mask
    :header="title"
    :style="{ width: '20rem' }"
    class="dialog"
    @update:visible="closeModal"
  >
    <div class="dialog__btn-group">
      <Btn
        class="form__btn"
        type="submit"
        :show-spinner="showSpinner"
        @click="() => resolve()"
      >
        {{ btnResolveName }}
      </Btn>
      <Btn
        v-if="!hideBtnCancel && !showSpinner"
        class="form__btn"
        type="submit"
        @click="closeModal"
      >
        Отмена
      </Btn>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  btnResolveName: string
  title: string
  hideBtnCancel?: boolean
  showSpinner?: boolean
}>()

const updatedModelValue = computed({
  get: () => props.modelValue,
  set: () => closeModal(),
})

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'resolve'): void
}>()

function closeModal() {
  emit('update:modelValue', false)
}

async function resolve() {
  emit('resolve')
}
</script>

<style scoped lang="scss">
.dialog {
  &__btn-group {
    display: flex;
    justify-content: center;
    column-gap: 16px;
    padding-top: 16px;
  }
}
</style>
