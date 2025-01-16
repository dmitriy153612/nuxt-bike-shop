<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <teleport to="body">
    <Transition>
      <Spinner type="page" v-if="globalStore.isPageSpinnerShown" />
    </Transition>

    <ModalLogin />
    <ModalRegistration />
    <Toast position="top-center"/>
  </teleport>
</template>

<script setup lang="ts">
const globalStore = useGlobalStore();
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
