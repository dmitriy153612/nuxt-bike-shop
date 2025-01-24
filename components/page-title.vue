<template>
  <h2 class="title">
    <slot />
  </h2>
</template>

<style scoped lang="scss">
.title {
  font-size: 26px;
  font-weight: 700;
  color: $secondary;
  text-shadow: 1px 1px 2px rgba($secondary, 0.5);
}
</style>
