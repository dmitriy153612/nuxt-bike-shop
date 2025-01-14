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
  padding-inline: $container-inline-padding;

  @media #{$sm-screen} {
    padding-inline: $container-inline-padding-sm;
  }
  @media #{$lg-screen} {
    padding-inline: $container-inline-padding-lg;
  }
}
</style>