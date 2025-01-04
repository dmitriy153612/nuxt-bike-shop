<template>
  <div class="layout">
    <TheHeader class="layout__header" />
    <main class="layout__main">
      <slot />
    </main>
    <TheFooter class="layout__footer"/>
  </div>
</template>

<script setup lang="ts">


</script>

<style scoped lang="scss">
button {
  background-color: $font-color-header;
  color: $bg-color-header;
  padding: 10px;
  font-weight: 600;
  margin: 100px;
  border-radius: 5px;
  @include transition(color, background-color);
  &:hover {
    background-color: $bg-color-header;
    color: $font-color-header;
  }
}
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  &__header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
  }

  &__main {
    flex-grow: 1;
    padding-top: $header-height;
    @media #{$lg-screen} {
      padding-top: $header-height-lg;
    }
  }

  &__footer {

  }
}
</style>