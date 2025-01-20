<template>
  <div
    class="overlay"
    :class="overlayClass"
    @mousedown.self="emitClose"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  contentPosition?: 'center' | 'left'
}>(), {
  contentPosition: 'center',
})
const emit = defineEmits<{
  (e: 'close'): void
}>()

function emitClose() {
  emit('close')
}

const overlayClass = ref({
  'overlay--center': props.contentPosition === 'center',
  'overlay--left': props.contentPosition === 'left',
})
</script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  inset: 0;
  z-index: $overlay-z-index;
  background-color: $overlay;
  display: flex;

  &--center {
    justify-content: center;
    align-items: center;
  }
  &--left {
    justify-content: flex-start;
    @media #{$lg-screen} {
      position: static;
      z-index: 0;
      background-color: transparent;
    }
  }
}
</style>
