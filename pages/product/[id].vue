<template>
  <div class="product-page">
    <section>
      <Container
        v-if="product"
        class="product-page__inner"
      >
        <PageTitle class="product-page__title">
          {{ product.title }}
        </PageTitle>
        <Carousel
          :value="product.pictures"
          :num-visible="1"
          :num-scroll="1"
          orientation="horizontal"
          vertical-view-port-height="330px"
          class="product-page__slider"
        >
          <template #item="slotProps">
            <div class="product-page__img-wrapper">
              <NuxtImg
                loading="lazy"
                alt="фотография велосипеда"
                :src="slotProps.data"
                class="product-page__img"
              />
            </div>
          </template>
        </Carousel>

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
      </Container>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { IProduct } from '@/types/product'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const product = computed<IProduct | null>(() => productStore.product)

definePageMeta({
  middleware: 'product',
})

const checkedSizeId = ref('')

watch(() => route.query.sizeId, (newValue) => {
  checkedSizeId.value = String(newValue)
}, { immediate: true })

watch(() => checkedSizeId.value, (newValue) => {
  router.replace({ query: { ...route.query, sizeId: newValue } })
})
</script>

<style scoped lang="scss">
.product-page {
  &__inner {
    padding-bottom: 32px;
    @media #{$lg-screen} {
      display: grid;
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
  &__slider {
    width: 100%;
    grid-area: slider;
  }
  &__img-wrapper {
    font-size: 0;
    aspect-ratio: 288 / 160;
  }
  &__img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
  &__form {
    grid-area: form;
  }
}
</style>
