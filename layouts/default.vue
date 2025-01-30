<template>
  <div class="layout">
    <TheHeader class="layout__header" />
    <Container
      class="layout__breadcrumbs-box"
      type="box"
    >
      <Breadcrumbs
        v-if="route.name !== 'catalog'"
        :breadcrumbs="breadcrumbs"
      />
    </Container>
    <div class="layout__content">
      <slot />
    </div>
    <TheFooter class="layout__footer" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const productStore = useProductStore()

const catalogBreadcrumb = { label: 'Каталог', path: '/' }
const basketBreadcrumb = { label: 'Корзина', path: '/basket' }
const orderBreadcrumb = { label: 'Оформление заказа', path: '/order' }
const productBreadcrumb = computed(() => ({ label: productStore.product?.title || '', path: '' }))

const breadcrumbs = computed(() => {
  if (route.name === 'product-id') {
    return [catalogBreadcrumb, productBreadcrumb.value]
  }
  else if (route.name === 'basket') {
    return [catalogBreadcrumb, basketBreadcrumb]
  }
  else if (route.name === 'order') {
    return [catalogBreadcrumb, basketBreadcrumb, orderBreadcrumb]
  }
  return []
})
</script>

<style scoped lang="scss">
.layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  &__header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: $header-z-index;
  }
  &__breadcrumbs-box {
    padding-top: $header-height;
    @media #{$xxl-screen} {
      padding-top: $header-height-xxl;
    }
  }
  &__content {
    display: grid;
    width: 100%;
  }
}
</style>
