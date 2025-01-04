<template>
  <header class="header">
    <Container class="header__inner">
      <BtnIcon icon-name="filter" class="header__filter" />
      <h1 class="header__title">Bike-Shop</h1>
      <Logo />
      <nav>
        <ul class="header__list">
          <li class="header__item">
            <BtnIcon icon-name="logout" v-if="isAuthorized">
              <span class="header__btn-text">Выйти</span>
            </BtnIcon>
            <BtnIcon icon-name="login" v-else>
              <span class="header__btn-text">Войти</span>
            </BtnIcon>
          </li>
          <li class="header__item">
            <BtnIcon icon-name="basket" to="/" :count="basketCount">
              <span class="header__btn-text">Корзина</span>
            </BtnIcon>
          </li>
        </ul>
      </nav>
    </Container>
  </header>
</template>

<script setup lang="ts">
const basketCount = ref(8);
const isAuthorized = ref(false);
</script>

<style scoped lang="scss">
.header {
  height: $header-height;
  color: $font-color-header;
  background-color: $bg-color-header;
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
    @media #{$md-screen} {
      @include hidden;
    }
  }
  &__title {
    @include hidden;
    @media #{$md-screen} {
      @include visible;
      font-size: 24px;
      font-weight: 700;
      text-shadow: 1px 1px 2px rgba($font-color, 0.5);
    }
  }
  &__list {
    display: flex;
    column-gap: 16px;
    padding-right: 12px;
  }

  &__btn-text {
    @include hidden;
    @media #{$md-screen} {
      @include visible;
    }
  }
}
</style>
