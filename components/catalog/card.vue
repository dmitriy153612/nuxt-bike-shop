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
        <div v-if="card.discount" class="card__discount">
          <IconDiscount class="card__discount-svg" />
          <span class="card__discount-percent">{{ card.discount }}%</span>
        </div>
        <div class="card__img-wrapper">
          <NuxtImg
            class="card__img"
            :src="card.pictures[0]"
            :alt="card.title"
          />
        </div>
        <h3 class="card__title">{{ card.title }}</h3>
      </NuxtLink>
      <div class="card__bottom">
        <Picker
          class="card__size-picker"
          :sizes="card.sizes"
          v-model="checkedSize"
        />
        <p class="card__price-box">
          <span class="card__price-box-current">{{
            $formatCurrency(card.price)
          }}</span>
          <span class="card__price-box-old" v-if="card?.oldPrice">
            {{ $formatCurrency(card.oldPrice) }}
          </span>
        </p>
        <Btn class="card__btn" icon-name="basket"> В корзину </Btn>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { type ICatalogCard } from '@/types/catalog';

const props = defineProps<{
  card: ICatalogCard;
}>();

console.log(props.card);

const checkedSize = ref(props.card.sizes[0]._id);
</script>

<style scoped lang="scss">
.card {
  position: relative;
  height: 100%;
  padding: 20px;
  border-radius: 14px;
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.15);
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
      color: var(--primary);
    }
    &-percent {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: var(--hover);
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
    color: var(--secondary);
  }
  &__size-picker {
    align-self: flex-end;
  }
  &__price-box {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    color: var(--secondary);
    &-current {
      position: relative;
      bottom: -2px;
      font-size: 18px;
      font-weight: 700;
    }
    &-old {
      position: relative;
      top: -2px;
      font-size: 16px;
      font-weight: 500;
      text-decoration: line-through;
    }
  }
  &__btn {
    justify-self: center;
  }
}
</style>
