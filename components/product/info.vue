<template>
  <div class="product-info">
    <h3 class="product-info__title">
      Характеристики
    </h3>
    <ul class="product-info__list">
      <li
        v-for="(group, index) in infoList"
        :key="index"
        class="product-info__item"
      >
        <h4 class="product-info__item-title">
          {{ group.infoGroupName }}
        </h4>
        <ul class="product-info__inner-list">
          <li
            v-for="(innerItem, index2) in group.infoList"
            :key="index2"
            class="product-info__inner-item"
          >
            <h5 class="product-info__inner-title">
              {{ innerItem.name }}
              <span />
            </h5>
            <p class="product-info__inner-text">
              {{ innerItem.property }}
            </p>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { ProductInfo } from '@/types/product'

defineProps<{
  infoList: ProductInfo[]
}>()
</script>

<style lang="scss" scoped>
.product-info {
  padding-top: 32px;

  @media #{$sm-screen} {
    padding-top: 48px;
  }
  &__title {
    margin: 0 0 20px;
    font-size: 24px;
  }

  &__list {
    display: grid;
    row-gap: 15px;
  }

  &__item-title {
    margin: 0 0 10px;
    font-size: 16px;
  }

  &__inner-list {
    display: grid;
    row-gap: 10px;
    padding-left: 15px;
  }

  &__inner-item {
    row-gap: 4px;
    grid-template-columns: 1fr;
    @media #{$sm-screen} {
      display: grid;
      grid-template-columns: 0.3fr 0.7fr;
    }
  }

  &__inner-title {
    position: relative;
    align-self: flex-end;
    display: flex;
    align-items: flex-end;
    margin-bottom: 6px;
    font-weight: 800;
    font-size: 14px;
    @media #{$sm-screen} {
      margin-bottom: 0;
    }

    & span {
      display: none;
      @media #{$sm-screen} {
        display: flex;
        flex-grow: 1;
      border-bottom: 1px dotted $secondary;
      margin: 0 5px;
      min-width: 15px;
      opacity: 0.4;
      }
    }
  }

  &__inner-text {
    align-self: flex-end;
    margin: 0;
  }
}
</style>
