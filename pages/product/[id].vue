<template>
  <div class="product-page">
    <main class="product-page__main">
      <section class="product-page__sec">
        <Container
          v-if="product"
          class="product-page__inner"
        >
          <PageTitle class="product-page__title">
            {{ product.title }}
          </PageTitle>
          <div
            class="product-page__slider-wrapper"
          >
            <ProductSlider
              v-show="isSliderLoaded"
              :slides="product.pictures"
              @load="isSliderLoaded = true"
            />
          </div>

          <ProductForm
            v-if="product"
            v-model="checkedSizeId"
            :sizes="product.sizes"
            :brand="product.brand.name"
            :price="product.price"
            :old-price="product.oldPrice"
            :product-id="String(route.params.id || '')"
            class="product-page__form"
          />
          <ProductInfo :info-list="product.info" />
        </Container>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { IProduct } from '@/types/product'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()

const product = computed<IProduct | null>(() => productStore.product)

const isSliderLoaded = ref<boolean>(false)

definePageMeta({
  middleware: 'product',
})

const checkedSizeId = ref<string>('')

watch(() => route.query.sizeId, (newValue) => {
  checkedSizeId.value = String(newValue)
}, { immediate: true })

watch(() => checkedSizeId.value, (newValue) => {
  router.replace({ query: { ...route.query, sizeId: newValue } })
})
</script>

<style scoped lang="scss">
.product-page {
  &__main,
  &__sec,
  &__inner {
    display: grid;
    height: 100%;
  }
  &__inner {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
    'title'
    'slider'
    'form'
    ;
    padding-bottom: 32px;
    @media #{$xxl-screen} {
      grid-template-columns: 1fr auto;
      align-items: flex-start;
      grid-template-areas:
      'title title'
      'slider form'
      ;
    }
  }
  &__title {
    margin-bottom: 16px;
    grid-area: title;
  }
  &__slider-wrapper {
    grid-area: slider;
    max-width: 100%;
    width: 100%;
  }
  &__form {
    grid-area: form;
  }
}
</style>
