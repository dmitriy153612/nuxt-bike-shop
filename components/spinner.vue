<template>
  <div
    class="overlay"
    :class="config.class"
  >
    <ProgressSpinner
      :stroke-width="config.strokeWidth"
      :style="config.style"
      class="overlay__spinner"
    />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: 'page' | 'btn' | 'card'
  }>(),
  {
    type: 'btn',
  },
)

const config = computed(() => {
  if (props.type === 'page') {
    return {
      strokeWidth: '6',
      class: 'overlay--page',
      style: { height: '100px', width: '100px' },
    }
  }
  else if (props.type === 'card') {
    return {
      strokeWidth: '4',
      class: 'overlay--card',
      style: { height: '80px', width: '80px' },
    }
  }
  return {
    strokeWidth: '4',
    class: 'overlay--btn',
    style: { height: '1.5em', width: '1.5em' },
  }
})
</script>

<style scoped lang="scss">
.overlay {
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $spinnerScreenOverlay;
  &--page {
    position: fixed;
    z-index: $spinner-z-index;
  }
  &--btn {
    position: absolute;
    inset: 0;
    z-index: 1;
    background-color: $secondary;
  }
  &--card {
    position: absolute;
    inset: 0;
    z-index: 1;
    background-color: rgba($secondary, 0.5);
  }
}
</style>
