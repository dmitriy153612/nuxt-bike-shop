<template>
  <component
    :is="tag"
    class="container"
    :class="{ 'container--main': tag === 'main' }"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    tag?: 'div' | 'main'
  }>(),
  {
    tag: 'div',
  },
)
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  max-width: $container-max-width;
  margin-inline: auto;
  padding-inline: 16px;
  @media #{$md-screen} {
    padding-inline: 32px;
  }
  @media #{$xxl-screen} {
    padding-inline: 40px;
  }

  &--main {
    padding-top: 16px;
    padding-bottom: 24px;
    @media #{$sm-screen} {
      padding-top: 20px;
      padding-bottom: 32px;
    }
    @media #{$md-screen} {
      padding-top: 28px;
      padding-bottom: 40px;
    }
    @media #{$xxl-screen} {
      padding-top: 32px;
      padding-inline: 40px;
    }
  }
}
</style>
