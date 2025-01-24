<template>
  <div
    class="container"
    :class="containerClass"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  type?: 'content' | 'box'
}>(), {
  type: 'content',
})

const containerClass = ref({
  'container--content': props.type === 'content',
  'container--box': props.type === 'box',
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

  &--content {
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
