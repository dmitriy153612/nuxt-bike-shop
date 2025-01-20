<template>
  <header class="header">
    <Container
      class="header__inner"
      type="header"
    >
      <Btn
        icon-name="filter"
        appearance="nav"
        class="header__filter"
        aria-label="Показать фильтр товаров"
        @click="() => catalogStore.openFilter()"
      />
      <h1 class="header__title">
        Bike-Shop
      </h1>
      <Logo />
      <nav>
        <ul class="header__list">
          <li class="header__item">
            <Btn
              v-if="!authStore.token"
              icon-name="login"
              appearance="nav"
              @click="() => authStore.showLoginModal(true)"
            >
              <span class="header__btn-text">Войти</span>
            </Btn>
            <Btn
              v-else
              icon-name="logout"
              appearance="nav"
              @click="isLoguoutModalOpened = true"
            >
              <span class="header__btn-text">Выйти</span>
            </Btn>
          </li>
          <li class="header__item">
            <Btn
              icon-name="basket"
              appearance="nav"
              to="/basket"
              :count="basketStore.config.totalAmount"
            >
              <span class="header__btn-text">Корзина</span>
            </Btn>
          </li>
        </ul>
      </nav>
      <ModalConfirm
        v-model:model-value="isLoguoutModalOpened"
        title="Выйти из аккаунта?"
        btn-resolve-name="Выйти"
        :resolve-function="authStore.logout"
      />
      <ModalLogin />
      <ModalRegistration />
    </Container>
  </header>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const basketStore = useBasketStore()
const catalogStore = useCatalogStore()

const isLoguoutModalOpened = ref(false)
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
    @media #{$xl-screen} {
      @include hidden;
    }
  }
  &__title {
    @include hidden;
    @media #{$xl-screen} {
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
