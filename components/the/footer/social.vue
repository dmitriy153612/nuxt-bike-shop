<template>
  <div class="social">
    <ul class="social__list">
      <li
        v-for="(link, index) in linkList"
        :key="index"
        class="social__item"
      >
        <NuxtLink
          class="social__link"
          :href="link.href"
          :aria-label="link.name"
        >
          <component :is="icons[index]" />
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  linkList: {
    name: string
    href: string
    iconName: string
  }[]
}>()

const icons = props.linkList.map((link) => {
  return defineAsyncComponent(() => import(`@/components/icon/${link.iconName}.vue`))
})
</script>

<style scoped lang="scss">
.social {
  &__list {
    display: flex;
    column-gap: 4px;
  }
  &__link {
    display: flex;
    padding: 6px;
    border-radius: 50%;
    border: 2px solid transparent;
    width: 40px;
    height: 40px;
    outline: none;
    @include transition(border-color);
    &:focus-visible {
      border-color: $primary;
    }
  }
}
</style>
