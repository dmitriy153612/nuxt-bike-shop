<template>
  <div class="layout">
    <TheHeader class="layout__header" />
    <div class="layout__content">
      <slot />
    </div>
    <TheFooter class="layout__footer" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
button {
  background-color: $primary;
  color: $secondary;
  padding: 10px;
  font-weight: 600;
  margin: 100px;
  border-radius: 6px;
  @include transition(color, background-color);
  &:hover {
    background-color: $secondary;
    color: $primary;
  }
}
.layout {
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 100vh;
  &__header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: $header-z-index;
  }

  &__content {
    display: grid;
    padding-top: $header-height;
    width: 100%;
    @media #{$lg-screen} {
      padding-top: $header-height-lg;
    }
  }
}
</style>
