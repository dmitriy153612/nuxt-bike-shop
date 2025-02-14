<template>
  <nav class="breadcrumbs">
    <ul class="breadcrumbs__list">
      <li
        v-for="(item, index) in breadcrumbs"
        :key="index"
        class="breadcrumbs__item"
      >
        <NuxtLink
          class="breadcrumbs__link"
          active-class="breadcrumbs__link--active"
          :to="item.path"
          :tabindex="index === breadcrumbs.length - 1 ? -1 : 0"
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
    flex-wrap: wrap;
  }
  &__item {
    display: flex;
    align-items: center;
    font-size: 18px;
    line-height: 1;
  }
  &__link {
    border: 1px solid transparent;
    color: $secondary;
    @include transition(border-color);
    &:focus-visible {
      border-bottom-color: inherit;
      outline: none;
    }
    &:hover {
        @media #{$xl-screen} {
        border-bottom-color: $secondary;
      }
    }
    &--active {
      opacity: 0.7;
      cursor: default;
      pointer-events: none;
    }
  }
  &__separator {
    padding-inline: 4px;
    color: $secondary;
    cursor: default;
  }
}
</style>
