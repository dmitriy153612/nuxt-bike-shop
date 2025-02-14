<template>
  <aside
    class="aside"
    :class="{
      'aside--order': page === 'order',
      'aside--basket': page === 'basket',
    }"
  >
    <div class="aside__sticky">
      <slot />
    </div>
  </aside>
</template>

<script setup lang="ts">
defineProps<{
  page: 'order' | 'basket'
}>()
</script>

<style scope lang="scss">
.aside {
  justify-self: center;

  @media #{$xl-screen} {
    position: relative;
    justify-self: stretch;
    &--basket {
      padding-top: 86px;
    }
    &--order {
      padding-top: 76px;
    }
  }

  &__sticky {
    @media #{$xl-screen} {
      position: sticky;
      z-index: 1;
      top: $header-height + 16px;
    }

    @media #{$xxl-screen} {
      top: $header-height-xxl + 16px;
    }
  }
}
</style>
