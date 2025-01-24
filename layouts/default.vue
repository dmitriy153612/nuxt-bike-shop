<template>
  <div class="layout">
    <TheHeader class="layout__header" />
    <Container
      class="layout__breadcrumbs-box"
      type="box"
    >
      <Breadcrumbs
        v-if="route.name !== 'catalog'"
        :breadcrumbs="productBreadcrumbs"
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

const productBreadcrumbs = computed(() => [
  { label: 'Каталог', path: '/' },
  { label: productStore.product?.title || '', path: '' },
])
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
    @media #{$lg-screen} {
      padding-top: $header-height-lg;
    }
  }
  &__content {
    display: grid;
    width: 100%;
  }
}
</style>
