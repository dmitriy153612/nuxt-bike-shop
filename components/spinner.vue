<template>
    <div class="overlay" :class="config.class">
    <ProgressSpinner :strokeWidth="config.strokeWidth" :style="config.style"  class="overlay__spinner"/>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: 'page' | 'btn'
  }>(),
  {
    type: 'btn'
  }
)

const config = computed(() => {
  if (props.type === 'page') {
    return {
      strokeWidth: '4',
      class: 'overlay--page',
      style: { height: '100px', width: '100px'}
    }
  }
  return {
      strokeWidth: '2',
      class: 'overlay--btn',
      style: { height: '0.5em', width: '0.5em'}
    }
})
</script>

<style scoped lang="scss">
.overlay {
  --p-progressspinner-color-1: var(--primary);
  --p-progressspinner-color-2: var(--secondary);
  --p-progressspinner-color-3: var(--primary);
  --p-progressspinner-color-4: var(--secondary);

  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--spinner-overlay);
  &--page {
    position: fixed;
    z-index: 100;
  }
}
</style>