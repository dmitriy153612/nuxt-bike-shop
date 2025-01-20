<template>
  <div
    class="container"
    :class="containerClass"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: 'header' | 'section'
  }>(),
  {
    type: 'section',
  },
)

const containerClass = ref({
  'container--section': props.type === 'section',
  'container--header': props.type === 'section',
})
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

  &--section {
    padding-top: $container-padding-top;
    @media #{$sm-screen} {
      padding-top: $container-padding-top-sm;
    }
    @media #{$md-screen} {
      padding-top: $container-padding-top-md;
    }
    @media #{$lg-screen} {
      padding-top: $container-padding-top-lg;
    }
  }
}
</style>
