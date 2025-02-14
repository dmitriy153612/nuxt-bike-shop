<template>
  <form
    class="form"
    @submit.prevent="addToBasket"
  >
    <OptionDetails
      option-name="Бренд"
      :option-value="brand"
      class="form__option"
    />
    <OptionDetails
      option-name="Размер"
      :option-value="sizeName"
      class="form__option"
    />
    <OptionDetails option-name="Цена">
      <Price
        :price="price"
        :old-price="oldPrice"
      />
    </OptionDetails>
    <div class="form__size-picker-wrapper">
      <Picker
        v-model="checkedSizeId"
        title="Доступные размеры:"
        tilte-tag="h3"
        :options="sizes"
      />
    </div>

    <Btn
      type="submit"
      class="form__submit"
      icon-name="basket"
      :show-spinner="isSubmitSpinnerShown"
    >
      В корзину
    </Btn>
  </form>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import type { IFilterOption } from '@/types/catalog'

const filterStore = useFilterStore()
const basketStore = useBasketStore()
const authStore = useAuthStore()
const toast = useToast()

const props = defineProps<{
  modelValue: string
  brand: string
  price: string | number
  sizes: IFilterOption[]
  oldPrice?: string | number
  productId: string
  title: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>()

const checkedSizeId = computed({
  get: () => props.modelValue,
  set: newValue => emit('update:modelValue', newValue),
})

const sizeName = computed(() => filterStore.getSizeName(checkedSizeId.value))
const isSubmitSpinnerShown = ref(false)

async function addToBasket() {
  isSubmitSpinnerShown.value = true
  await basketStore.fetchAddProduct({
    productId: props.productId,
    sizeId: checkedSizeId.value,
    amount: 1,
  })
  isSubmitSpinnerShown.value = false

  if (!basketStore.isFetchAddProductFailed && authStore.token) {
    toast.add({
      severity: 'success',
      summary: 'Добавлено в корзину:',
      detail: props.title,
      life: 1000,
    })
  }
}
</script>

<style scoped lang="scss">
.form {
  display: grid;
  row-gap: 8px;
  &__size-picker-wrapper {
    padding-top: 8px;
    padding-bottom: 16px;
  }
  &__submit {
    justify-self: center;
  }
}
</style>
