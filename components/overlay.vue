<template>
  <div class="overlay" @mousedown.self="emitClose">
    <slot />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'colse'): void;
}>();

function emitClose() {
  emit('colse');
}
</script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
