<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <teleport to="body">
    <Transition>
      <Spinner
        v-if="globalStore.isPageSpinnerShown"
        type="page"
      />
    </Transition>

    <Toast
      position="top-center"
      :style="{ width: 'min(300px, 96%)' }"
    />
  </teleport>
</template>

<script setup lang="ts">
const globalStore = useGlobalStore()
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  @include transition(opacity);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
