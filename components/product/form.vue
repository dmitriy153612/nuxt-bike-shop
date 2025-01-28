<template>
  <form
    class="form"
    @submit.prevent="addToBasket"
  >
    <ProductOption
      option-name="Бренд"
      :option-value="brand"
      class="form__option"
    />
    <ProductOption
      option-name="Размер"
      :option-value="sizeName"
      class="form__option"
    />
    <p class="form__price-box">
      <span class="form__price-box-name">Цена:</span>
      <Price
        :price="price"
        :old-price="oldPrice"
        class="form__price-box-price"
      />
    </p>
    <div class="form__size-picker-wrapper">
      <Picker
        v-model="checkedSizeId"
        :sizes="sizes"
      />
    </div>

    <Btn
      type="submit"
      class="form__submit"
      :show-spinner="isSubmitSpinnerShown"
    >
      В корзину
    </Btn>
  </form>
</template>

<script setup lang="ts">
import type { IFilterOption } from '@/types/catalog'

const filterStore = useFilterStore()
const basketStore = useBasketStore()

const props = defineProps<{
  modelValue: string
  brand: string
  price: string | number
  sizes: IFilterOption[]
  oldPrice?: string | number
  productId: string
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
}
</script>

<style scoped lang="scss">
.form {
  display: grid;
  row-gap: 8px;
  &__price-box {
    display: grid;
    row-gap: 4px;
  }
  &__price-box-name {
    font-size: 18px;
    font-weight: 600;
  }
  &__size-picker-wrapper {
    padding-top: 8px;
    padding-bottom: 16px;
  }
  &__submit {
    justify-self: center;
  }
}
</style>
