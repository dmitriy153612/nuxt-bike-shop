<template>
  <div class="order-page">
    <Container
      tag="main"
      class="order-page__main"
    >
      <div
        v-if="!orderStore.completedOrderNumber"
        class="order-page__content"
      >
        <section class="order-page__section">
          <div class="order-page__inner">
            <PageTitle>{{ pageTilte }}</PageTitle>
            <OrderForm
              v-model="submit"
              @invalid="scrollPageToTop"
            />
          </div>
        </section>
        <StickyAside
          class="order-page__aside"
          page="order"
        >
          <Checkout
            v-if="orderStore.orderConfig"
            :amount="orderStore.orderConfig.selectedAmount"
            :price="orderStore.orderConfig.totalOldPrice"
            :discount="orderStore.orderConfig.totalPriceDifference"
            :final-price="orderStore.orderConfig.totalPrice"
            :delivery-price="orderStore.orderConfig.deliveryPrice"
            :show-spinner="orderStore.isOrderConfigLoading"
            btn-name="Заказать"
            @resolve="submitForm"
          />
        </StickyAside>
        <section class="order-page__section">
          <div class="order-page__inner">
            <PageTitle>Мой заказ</PageTitle>
            <OrderList :order-list="orderStore.orderList" />
          </div>
        </section>
      </div>

      <section
        v-else
        class="order-page__message-section"
      >
        <PageTitle>{{ pageTilte }}</PageTitle>
        <p class="order-page__message-section-text">
          В ближайшее время наш оператор свяжется с Вами для уточнения заказа.
        </p>
      </section>
    </Container>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'order',
})

const submit = ref<boolean>(false)

const orderStore = useOrderStore()

const pageTilte = computed(() => {
  return orderStore.completedOrderNumber ? `Заказ №${orderStore.completedOrderNumber} оформлен` : 'Оформление заказа'
})

function submitForm() {
  submit.value = true
}

function scrollPageToTop() {
  scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped lang="scss">
$boxGap: 16px;
.order-page {
  &__content {
    position: relative;
    display: grid;
    row-gap: 32px;
    @media #{$xl-screen} {
      grid-template-columns: 1fr 264px;
      column-gap: 32px;
    }
  }
  &__aside {
    @media #{$xl-screen} {
      grid-column: 2 / 3;
      grid-row: 1 / 3;
    }
  }
  &__checkout {
    position: sticky;
    top: 0;
  }
  &__inner {
    display: grid;
    row-gap: 24px;
  }
  &__form {
    display: grid;
    gap: $boxGap;
  }
  &__switch-block {
    display: grid;
    gap: $boxGap;
    @media #{$lg-screen} {
      grid-template-columns: 1fr 234px;
    }
  }
  &__message-section {
    display: grid;
    row-gap: 16px;
    &-text {
      font-size: 18px;
      font-weight: 500;
      color: $secondary;
    }
  }
}
</style>
