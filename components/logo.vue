<template>
  <NuxtLink
    :to="{ path: '/' }"
    class="logo"
  >
    <img
      src="@/assets/img/logo.png"
      alt="bike-shop"
      class="logo__img"
    >
  </NuxtLink>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.logo {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: $primary;
  box-shadow: 0px 0px 6px 4px $primary;
  outline: none;
  @include transition(box-shadow);
  &:focus-visible {
    box-shadow: 0px 0px 10px 6px $primary;
  }

  @media #{$xxl-screen} {
    width: 50px;
    height: 50px;
  }
  &__img {
    width: 100%;
  }
}
</style>
