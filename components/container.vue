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
  padding-inline: 16px;

  @media #{$md-screen} {
    padding-inline: 32px;
  }

  @media #{$xxl-screen} {
    padding-inline: 40px;
  }

  &--content {
    padding-top: 16px;
    @media #{$md-screen} {
      padding-top: 20px;
    }
    @media #{$md-screen} {
      padding-top: 28px;
    }
    @media #{$xxl-screen} {
      padding-top: 32px;
    }
  }
}
</style>
