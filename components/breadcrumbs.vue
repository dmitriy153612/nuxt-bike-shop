<template>
  <nav class="breadcrumbs">
    <ul class="breadcrumbs__list">
      <li
        v-for="(item, index) in breadcrumbs"
        :key="index"
        class="breadcrumbs__item"
      >
        <NuxtLink
          :to="item.path"
          class="breadcrumbs__link"
        >
          {{ item.label }}
        </NuxtLink>
        <span
          v-if="index !== breadcrumbs.length - 1"
          class="breadcrumbs__separator"
        >
          /
        </span>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  breadcrumbs: Array<{ label: string, path: string }>
}>()
</script>

<style scoped lang="scss">
.breadcrumbs {
  padding-top: 8px;
  &__list {
    display: flex;
  }
  &__item {
    display: flex;
    align-items: center;
    font-size: 18px;
    line-height: 1;
  }
  &__item:not(:last-child) &__link:focus-visible {
      border-bottom-color: inherit;
      outline: none;
  }
  &__item:not(:last-child) &__link:hover {
      @media #{$md-screen} {
      border-bottom-color: inherit;
    }
  }
  &__item:last-child &__link {
    opacity: 0.6;
    cursor: default;
  }
  &__link {
    border: 1px solid transparent;
    @include transition(border-color)
  }
  &__separator {
    padding-inline: 4px;
    cursor: default;
  }
}
</style>
