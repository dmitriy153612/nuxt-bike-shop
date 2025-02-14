<template>
  <article class="card">
    <h3 class="card__title">
      {{ product.title }}
    </h3>
    <div class="card__link">
      <NuxtLink :to="{ name: 'product-id', params: { id: product.productId } }">
        <NuxtImg
          alt="изображение байка"
          :src="product.picture"
          class="card__img"
          loading="lazy"
        />
      </NuxtLink>
    </div>
    <div class="card__descr-box">
      <OptionDetails
        option-name="Размер"
        :option-value="product.size.name"
        size="small"
        class="card__size"
      />
      <OptionDetails
        :option-name="`${product.amount} шт`"
        size="small"
        class="card__size"
      >
        <UnitPrice
          class="card__unit-price"
          :price="product.priceForOne"
        />
      </OptionDetails>
      <Price
        :price="product.price"
        :old-price="product.oldPrice"
        size="small"
        class="card__price"
      />
      <OptionDetails
        v-if="product.priceDifference"
        option-name="Скидка"
        size="small"
        class="card__discount"
      >
        <Price
          :price="product.priceDifference"
          :minus="true"
          :alert="true"
          size="small"
        />
      </OptionDetails>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { IOrderProduct } from '@/types/order'

defineProps<{ product: IOrderProduct }>()
</script>

<style scoped lang="scss">
.card {
  display: grid;
  gap: 4px;
  padding: 8px;
  border: 1px solid $secondary300;
  border-radius: 4px;
  @media #{$sm-screen} {
    grid-template-areas:
    'title title'
    'link descr'
    ;
    grid-template-columns: 160px 1fr;
    align-items: flex-start;
    column-gap: 16px;

  }
  @media #{$md-screen} {
    grid-template-areas:
    'link title'
    'link descr'
    ;
    grid-template-columns: 160px 1fr;
    align-items: flex-start;
    column-gap: 16px;
  }
  @media #{$lg-screen} {
    column-gap: 32px;
  }
  &__title {
    text-align: center;
    font-size: 18px;
    color: $secondary;
    @media #{$sm-screen} {
      grid-area: title;
    }
  }
  &__link {
    justify-self: center;
    aspect-ratio: 238 / 134;
    max-width: 238px;
    width: 100%;
    @media #{$sm-screen} {
      grid-area: link;
      max-width: none;
    }
  }
  &__img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  &__descr-box {
    display: grid;
    gap: 4px;
    @media #{$sm-screen} {
      grid-area: descr;
    }
  }
  &__size {

  }
  &__amount {
    font-size: 14px;
    font-weight: 600;
  }
  &__unit-price {
    width: max-content;
  }
  &__price {

  }
  &__discount {
    justify-self: flex-end;
  }

}
</style>
