<template>
  <div class="order">
    <Transition>
      <Spinner
        v-if="showSpinner"
        type="card"
      />
    </Transition>
    <div class="order__inner">
      <OptionDetails
        class="order__option"
        option-name="Выбрано товаров"
        :option-value="amount"
      />
      <OptionDetails
        class="order__option"
        option-name="Цена"
      >
        <Price :price="price" />
      </OptionDetails>
      <OptionDetails
        v-if="discount"
        class="order__option"
        option-name="Скидка"
      >
        <Price
          :price="discount"
          :alert="true"
          :minus="true"
        />
      </OptionDetails>
      <div class="order__box">
        <OptionDetails
          class="order__option"
          option-name="Итого"
          :big="true"
        >
          <Price :price="finalPrice" />
        </OptionDetails>
      </div>
      <Btn
        to="/order"
        :disabled="!amount"
        @click="showModal"
      >
        Оформить
      </Btn>
    </div>
    <ModalConfirm
      v-model="isModalShown"
      :hide-btn-cancel="true"
      title="Вберите товары"
      btn-resolve-name="Ок"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  amount: number
  price: number
  discount: number
  finalPrice: number
  showSpinner?: boolean
}>()

const isModalShown = ref<boolean>(false)

function showModal() {
  if (!props.amount) {
    isModalShown.value = true
  }
}
</script>

<style scoped lang="scss">
.order {
  position: relative;
  overflow: hidden;
  box-shadow: $boxShadow;
  border-radius: 14px;
  padding: 16px;

  &__inner {
    display: grid;
    justify-content: center;
    row-gap: 8px;
  }
  &__box {
    padding-block: 16px 8px;
  }
}

.v-enter-active,
.v-leave-active {
  @include transition(opacity);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
