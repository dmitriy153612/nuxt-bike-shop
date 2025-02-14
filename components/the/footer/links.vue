<template>
  <div class="links">
    <ul class="links__list">
      <li
        v-for="(link, index) in linkList"
        :key="index"
        class="links__item"
      >
        <NuxtLink
          class="links__link"
          :to="link.href"
        >
          {{ link.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  linkList: { name: string, href: string }[]
}>()
</script>

<style scoped lang="scss">
.links {
  &__list {
    display: grid;
    row-gap: 4px;
  }
  &__link {
    display: flex;
    padding: 2px;
    max-width: max-content;
    border: 2px solid transparent;
    border-radius: 6px;
    font-size: 18px;
    color: $secondary300;
    outline: none;
    @include transition(border-color, color);
    &:visited {
      color: $secondary300;
    }
    &:focus-visible {
      border-color: $primary;
    }
    &:hover {
      color: $primary;
    }
  }
}
</style>
