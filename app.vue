<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>



  <teleport to="body">
    <Transition>
      <Spinner type="page" v-if="globalStore.isPageSpinnerShown" />
    </Transition>
  </teleport>
</template>

<script setup lang="ts">
const globalStore = useGlobalStore();
</script>

<style lang="scss" scoped>
.aa {
  padding-top: 100px;
}
.v-enter-active,
.v-leave-active {
  @include transition(opacity);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
