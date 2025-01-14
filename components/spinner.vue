<template>
  <div class="overlay" :class="config.class">
    <ProgressSpinner
      :strokeWidth="config.strokeWidth"
      :style="config.style"
      class="overlay__spinner"
    />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: 'page' | 'btn';
  }>(),
  {
    type: 'btn',
  }
);

const config = computed(() => {
  if (props.type === 'page') {
    return {
      strokeWidth: '4',
      class: 'overlay--page',
      style: { height: '100px', width: '100px' },
    };
  }
  return {
    strokeWidth: '2',
    class: 'overlay--btn',
    style: { height: '0.5em', width: '0.5em' },
  };
});
</script>

<style scoped lang="scss">
.overlay {
  z-index: $spinner-z-index;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $spinnerScreenOverlay;
  &--page {
    position: fixed;
  }
}
</style>
