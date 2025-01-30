<template>
  <header class="header">
    <Container
      type="box"
      class="header__inner"
    >
      <div
        v-if="route.name === 'catalog'"
        class="header__btn-filter"
      >
        <Btn
          icon-name="filter"
          appearance="nav"
          aria-label="Показать фильтр товаров"
          @click="() => catalogStore.openFilter()"
        />
      </div>
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
          <li
            v-if="authStore.token"
            class="header__item"
          >
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
        @resolve="logout"
      />
      <ModalLogin />
      <ModalRegistration />
    </Container>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const authStore = useAuthStore()
const basketStore = useBasketStore()
const catalogStore = useCatalogStore()

const isLoguoutModalOpened = ref(false)

function logout() {
  authStore.logout()
  isLoguoutModalOpened.value = false
}
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: $header-height;
  color: $primary;
  background-color: $secondary;
  @media #{$xxl-screen} {
    height: $header-height-xxl;
  }
  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
  }
  &__btn-filter {
    @media #{$xxl-screen} {
      @include hidden;
    }
  }
  &__title {
    @include hidden;
    @media #{$xxl-screen} {
      @include visible;
      font-size: 24px;
      font-weight: 700;
    }
  }
  &__list {
    display: flex;
    column-gap: 8px;
  }

  &__btn-text {
    @include hidden;
    @media #{$md-screen} {
      @include visible;
    }
  }
}
</style>
