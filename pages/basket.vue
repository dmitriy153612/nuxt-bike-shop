<template>
  <div class="basket-page">
    <main class="basket-page__main">
      <section class="basket-page__section">
        <ModalConfirm
          v-model="isModalDelShown"
          title="Удалить выделенные товары?"
          btn-resolve-name="Удалить"
          :show-spinner="isProductsDeleting"
          @resolve="fetchDeleteProducts"
        />
        <Container class="basket-page__inner">
          <PageTitle class="basket-page__title">
            Корзина
          </PageTitle>
          <div class="basket-page__selection">
            <Checkbox
              v-if="basketStore.basketList.length"
              v-model="updatedAllListSelected"
              :disabled="basketStore.isAllListSelectLoading"
              label="Выбрать всё"
            />
            <button
              v-if="isAnyProductSelected"
              class="basket-page__btn-del"
              :disabled="basketStore.isAllListSelectLoading"
              @click="isModalDelShown = true"
            >
              <span class="basket-page__btn-del-icon">
                <IconCross />
              </span>
              <span class="basket-page__btn-del-name">
                Удалить выбранное
              </span>
            </button>
          </div>
          <div class="basket-page__box">
            <div class="basket-page__list">
              <BasketList
                v-if="basketStore.basketList.length"
                :basket-list="basketStore.basketList"
              />
              <h3
                v-else
                class="basket-page__message"
              >
                Корзина пуста
              </h3>
            </div>
            <div class="basket-page__order-wrapper">
              <div class="basket-page__order">
                <BasketOrder
                  v-if="basketStore.basketList.length"
                  :amount="basketStore.config.selectedAmount"
                  :price="basketStore.config.totalOldPrice"
                  :discount="basketStore.config.totalPriceDifference"
                  :final-price="basketStore.config.totalPrice"
                  :show-spinner="isOrderSpinnerShown"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'basket',
})
const basketStore = useBasketStore()

const isModalDelShown = ref<boolean>(false)
const isProductsDeleting = ref<boolean>(false)

const updatedAllListSelected = computed<boolean>({
  get: () => basketStore.basketList.every(product => product.selected),
  set: (newValue) => {
    basketStore.fetchSelectProduct(newValue)
  },
})

const isOrderSpinnerShown = computed<boolean>(() => {
  return basketStore.isAllListSelectLoading || !!basketStore.amountOfCurrentChangingProducts
})

const isAnyProductSelected = computed<boolean>(() => {
  return basketStore.basketList.some(product => product.selected)
})

async function fetchDeleteProducts() {
  isProductsDeleting.value = true
  await basketStore.fetchDeleteSelectedProducts()
  isModalDelShown.value = false
  isProductsDeleting.value = false
}
</script>

<style scoped lang="scss">
.basket-page {
  &__main,
  &__section,
  &__inner {
    height: 100%;
  }
  &__inner {
    position: relative;
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    padding-bottom: 32px;
  }
  &__selection {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    background-color: $body;
    height: max-content;
    @media #{$xl-screen} {
      position: sticky;
      top: $header-height;
      z-index: 1;
    }
    @media #{$xxl-screen} {
      top: $header-height-xxl;
    }
  }
  &__btn-del {
    display: flex;
    align-items: center;
    column-gap: 8px;
    padding: 2px;
    border: 2px solid transparent;
    border-radius: 4px;
    outline: none;
    font-size: 18px;
    @include transition(border-color, color);
    &:focus-visible {
      border-color: $primary;
    }
    &:hover {
      @media #{$xl-screen} {
        color: $alert;
      }
    }
    &:active &-icon {
      color: $primary;
    }
    &:disabled {
      cursor: default;
      opacity: 0.6;
    }
    &-icon {
      width: 20px;
      height: 20px;
      color: $alert;
      @include transition(color)
    }
  }
  &__box {
    flex-grow: 1;
    display: grid;
    grid-template-rows: auto 1fr;
    row-gap: 40px;
    @media #{$xl-screen} {
      grid-template-columns: 1fr auto;
      column-gap: 24px;
    }
  }
  &__list {
    @media #{$xl-screen} {
      flex-grow: 1;
    }
  }
  &__message {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
  }
  &__order-wrapper {
    display: flex;
    justify-content: center;
    min-width: 260px;
    @media #{$xl-screen} {
      display: block;
    }
  }
  &__order {
    background-color: $body;
    @media #{$xl-screen} {
      position: sticky;
      top: calc($header-height + 16px);
      z-index: 2;
    }
    @media #{$xxl-screen} {
      top: calc($header-height-xxl + 16px);
    }
  }
}
</style>
