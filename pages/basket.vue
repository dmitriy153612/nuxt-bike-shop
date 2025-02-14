<template>
  <div class="basket-page">
    <Container
      tag="main"
      class="basket-page__main"
    >
      <section class="basket-page__section">
        <ModalConfirm
          v-model="isModalDelShown"
          title="Удалить выделенные товары?"
          btn-resolve-name="Удалить"
          :show-spinner="isProductsDeleting"
          @resolve="fetchDeleteProducts"
        />
        <ModalConfirm
          v-model="isModalConfirmShown"
          :hide-btn-cancel="true"
          title="Вберите товары"
          btn-resolve-name="Ок"
          @resolve="isModalConfirmShown = false"
        />
        <div class="basket-page__inner">
          <PageTitle class="basket-page__title">
            {{ pageTitle }}
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
          <div class="basket-page__list">
            <BasketList
              v-if="basketStore.basketList.length"
              :basket-list="basketStore.basketList"
            />
          </div>
        </div>
      </section>
      <StickyAside page="basket">
        <Checkout
          v-if="basketStore.basketList.length"
          :amount="basketStore.config.selectedAmount"
          :price="basketStore.config.totalOldPrice"
          :discount="basketStore.config.totalPriceDifference"
          :final-price="basketStore.config.totalPrice"
          :show-spinner="isOrderSpinnerShown"
          btn-name="Оформить"
          @resolve="handleBtnCheckout"
        />
      </StickyAside>
    </Container>
  </div>
</template>

<script setup lang="ts">
import StickyAside from '~/components/sticky-aside.vue'

definePageMeta({
  middleware: 'basket',
})
const basketStore = useBasketStore()
const router = useRouter()

const isModalDelShown = ref<boolean>(false)
const isModalConfirmShown = ref<boolean>(false)
const isProductsDeleting = ref<boolean>(false)

const updatedAllListSelected = computed<boolean>({
  get: () => basketStore.basketList.every(product => product.selected),
  set: (newValue) => {
    basketStore.fetchSelectProduct(newValue)
  },
})

const pageTitle = computed(() => {
  return basketStore.basketList.length ? 'Корзина' : 'Корзина пуста'
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

function handleBtnCheckout() {
  if (!basketStore.config.selectedAmount) {
    isModalConfirmShown.value = true
  }
  else {
    router.push({ path: '/order' })
  }
}
</script>

<style scoped lang="scss">
.basket-page {
  &__main {
    display: grid;
    row-gap: 24px;
    @media #{$xl-screen} {
      grid-template-columns: 1fr 264px;
      column-gap: 24px;
    }
  }
  &__inner {
    display: grid;
    row-gap: 16px;
  }
  &__selection {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    background-color: $body;
    box-shadow: 0 0 0 100vmax $body;
    clip-path: inset(0 -100vmax);
    height: max-content;
    position: sticky;
    top: $header-height;
    z-index: 1;
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
    &-name {
      color: $secondary;
    }
  }
  &__aside {
    justify-self: center;
    @media #{$xl-screen} {
      position: relative;
      justify-self: stretch;
      padding-top: 86px;
    }
  }
  &__checkout {
    @media #{$xl-screen} {
      position: sticky;
      z-index: 1;
      top: $header-height + 16px;
    }
    @media #{$xxl-screen} {
      top: $header-height-xxl + 16px;
    }
  }
}
</style>
