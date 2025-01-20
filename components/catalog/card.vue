<template>
  <article class="card">
    <div class="card__inner">
      <NuxtLink
        class="card__link"
        :to="{
          name: 'product-id',
          params: { id: card._id },
          query: { sizeId: checkedSize },
        }"
      >
        <div
          v-if="card.discount"
          class="card__discount"
        >
          <IconDiscount class="card__discount-svg" />
          <span class="card__discount-percent">{{ card.discount }}%</span>
        </div>
        <div class="card__img-wrapper">
          <NuxtImg
            class="card__img"
            :src="card.pictures[0]"
            alt="изображение байка"
          />
        </div>
        <h3 class="card__title">{{ card.title }}</h3>
      </NuxtLink>
      <div class="card__bottom">
        <Picker
          v-model="checkedSize"
          class="card__size-picker"
          :sizes="card.sizes"
        />
        <Price
          :price="card.price"
          :old-price="card?.oldPrice"
        />
        <Btn
          class="card__btn"
          icon-name="basket"
          :show-spinner="isBtnSpinnerShown"
          @click="fetchAddToBasket"
        >
          В корзину
        </Btn>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { ICatalogCard } from '@/types/catalog'

const props = defineProps<{
  card: ICatalogCard
}>()

const basketStore = useBasketStore()

const checkedSize = ref(props.card.sizes[0]._id)

const isBtnSpinnerShown = ref(false)

async function fetchAddToBasket() {
  isBtnSpinnerShown.value = true
  await basketStore.fetchAddProduct({
    productId: props.card._id,
    sizeId: checkedSize.value,
    amount: 1,
  })
  isBtnSpinnerShown.value = false
}
</script>

<style scoped lang="scss">
.card {
  position: relative;
  height: 100%;
  padding: 20px;
  border-radius: 14px;
  box-shadow: $boxShadow;
  overflow: hidden;
  &__inner {
    display: grid;
    grid-template-rows: auto 1fr;
    row-gap: 16px;
    height: 100%;
  }
  &__link {
    flex-shrink: 0;
    font-size: 0;
    outline: none;
  }
  &__discount {
    position: absolute;
    top: 10px;
    left: 10px;
    height: 50px;
    width: 50px;
    &-svg {
      color: $primary;
    }
    &-percent {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: $alert;
      font-size: 16px;
    }
  }
  &__img-wrapper {
    margin-bottom: 14px;
    aspect-ratio: 248 / 140;
  }
  &__img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
  &__bottom {
    display: grid;
    grid-template-rows: 1fr auto;
    row-gap: 20px;
  }
  &__title {
    text-align: center;
    font-size: 20px;
    font-weight: 800;
    color: $secondary;
  }
  &__size-picker {
    align-self: flex-end;
  }
  &__btn {
    justify-self: center;
  }
}
</style>
