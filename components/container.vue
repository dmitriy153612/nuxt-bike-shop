<template>
  <div class="container">
    <slot />
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.container {
  width: 100%;
  max-width: $container-max-width;
  margin-inline: auto;
  padding-inline: 16px;

  @media #{$sm-screen} {
    padding-inline: 32px;
  }
  @media #{$lg-screen} {
    padding-inline: 48px;
  }
}
</style>