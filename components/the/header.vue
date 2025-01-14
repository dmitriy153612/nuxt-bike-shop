<template>
  <header class="header">
    <Container class="header__inner">
      <Btn @click="() => globalStore.openFilter()" icon-name="filter" appearance="nav" class="header__filter" />
      <h1 class="header__title">Bike-Shop</h1>
      <Logo />
      <nav>
        <ul class="header__list">
          <li class="header__item">
            <Btn icon-name="logout" appearance="nav" v-if="isAuthorized">
              <span class="header__btn-text">Выйти</span>
            </Btn>
            <Btn icon-name="login" appearance="nav" to="/product/1" v-else>
              <span class="header__btn-text">Войти</span>
            </Btn>
          </li>
          <li class="header__item">
            <Btn
              icon-name="basket"
              appearance="nav"
              to="/catalog"
              :count="basketCount"
            >
              <span class="header__btn-text">Корзина</span>
            </Btn>
          </li>
        </ul>
      </nav>
    </Container>
  </header>
</template>

<script setup lang="ts">
const globalStore = useGlobalStore()
const basketCount = ref(8);
const isAuthorized = ref(false);
</script>

<style scoped lang="scss">
.header {
  height: $header-height;
  color: $primary;
  background-color: $secondary;
  @media #{$lg-screen} {
    height: $header-height-lg;
  }
  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
  &__filter {
    @media #{$lg-screen} {
      @include hidden;
    }
  }
  &__title {
    @include hidden;
    @media #{$lg-screen} {
      @include visible;
      font-size: 24px;
      font-weight: 700;
    }
  }
  &__list {
    display: flex;
    column-gap: 8px;
    padding-right: 8px;
  }

  &__btn-text {
    @include hidden;
    @media #{$md-screen} {
      @include visible;
    }
  }
}
</style>
