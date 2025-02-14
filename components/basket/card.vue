<template>
  <article class="card">
    <Spinner
      v-if="isSelectLoading || isAmountLoading || basketStore.isAllListSelectLoading"
      type="card"
    />
    <div class="card__inner">
      <Checkbox
        v-model="updatedSelected"
        :disabled="isSelectLoading"
        class="card__checkbox"
      />
      <h2 class="card__title">
        {{ product.title }}
      </h2>
      <NuxtLink
        class="card__link"
        :to="{
          name: 'product-id',
          params: { id: product.productId },
          query: { sizeId: product.size._id },
        }"
      >
        <NuxtImg
          class="card__img"
          loading="lazy"
          alt="изображение байка"
          :src="product.picture"
        />
      </NuxtLink>
      <div class="card__counter">
        <Counter v-model="updatedAmount" />
        <UnitPrice
          v-if="updatedAmount > 1"
          :price="product.priceForOne"
        />
      </div>
      <div class="card__options">
        <OptionDetails
          option-name="Размер"
          :option-value="product.size.name"
        />
      </div>
      <Price
        class="card__price"
        :price="product.price"
        :old-price="product?.oldPrice"
      />
    </div>
  </article>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import type { IBasketProduct } from '@/types/basket'

const basketStore = useBasketStore()

const props = defineProps<{ product: IBasketProduct }>()

const isSelectLoading = ref<boolean>(false)
const isAmountLoading = ref<boolean>(false)

const updatedAmount = computed({
  get: () => props.product.amount,
  set: async (newValue) => {
    const product: IBasketProduct | undefined = basketStore.updateBasketAmount(
      newValue, props.product.cartItemId,
    )
    debouncedUpdateAmount(product)
  },
})

const updatedSelected = computed({
  get: () => props.product.selected,
  set: async (newValue) => {
    isSelectLoading.value = true
    await basketStore.fetchSelectProduct(newValue, props.product.cartItemId)
    isSelectLoading.value = false
  },
})

const debouncedUpdateAmount = useDebounceFn((product: IBasketProduct | undefined) => {
  fetchUpdateAmount(product)
}, 300)

async function fetchUpdateAmount(product: IBasketProduct | undefined) {
  isAmountLoading.value = true
  await basketStore.fetchChangeBasketAmount(product)
  isAmountLoading.value = false
}
</script>

<style scoped lang="scss">
.card {
  position: relative;
  overflow: hidden;
  padding: 16px;
  box-shadow: $boxShadow;
  border-radius: 14px;
  &__inner {
    display: grid;
    row-gap: 8px;
    column-gap: 4px;
    grid-template-columns: auto 1fr;
    grid-template-areas:
    'checkbox title'
    'link link'
    'counter counter'
    'options options'
    'price price'
    ;
    @media #{$sm-screen} {
      grid-template-columns: min-content 1fr minmax(160px, 180px);
      grid-template-rows: auto auto auto 1fr;
      align-items: flex-start;
      gap: 16px;
      grid-template-areas:
      'checkbox title title'
      'link link counter'
      'link link options'
      'link link price'
      ;
    }
    @media #{$lg-screen} {
      grid-template-columns: min-content 1fr 1fr minmax(160px, 180px);
      grid-template-rows: auto auto 1fr;
      grid-template-areas:
      'checkbox title title title'
      'checkbox link counter options'
      'checkbox link counter price'
      ;
    }
  }
  &__checkbox {
    grid-area: checkbox;
    align-self: flex-start;
    @media #{$lg-screen} {
      align-self: center;
    }
  }
  &__title {
    grid-area: title;
    align-self: center;
    justify-self: flex-start;
    text-align: center;
    font-size: 22px;
    line-height: 1;
    color: $secondary;
  }
  &__link {
    grid-area: link;
    aspect-ratio: 256 / 142;
    border: 2px solid transparent;
    border-radius: 6px;
    outline: none;
    @include transition(border-color);
    &:focus-visible {
      border-color: $primary;
    }
    @media #{$sm-screen} {
      align-self: center;
      max-width: 200px;
    }
  }
  &__img {
    display: flex;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  &__counter {
    grid-area: counter;
    display: grid;
    justify-content: center;
    row-gap: 4px;
    @media #{$sm-screen} {
      justify-self: flex-start;
    }
    @media #{$lg-screen} {
      justify-self: center;
      align-self: center;
    }
  }
  &__options {
    grid-area: options;
    display: grid;
    row-gap: 4px;
    @media #{$sm-screen} {
      justify-self: flex-start;
    }
  }
  &__price {
    grid-area: price;
    justify-self: center;
    @media #{$sm-screen} {
      align-self: flex-end;
      justify-self: flex-start;
    }
  }
}
</style>
