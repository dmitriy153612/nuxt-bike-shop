<template>
  <component :is="component" v-bind="{ to }" class="button">
    <div class="button__inner">
      <template v-if="$slots.default">
        <slot />
      </template>
      <span class="button__icon-wrapper">
        <component :is="icon" />
      </span>
    </div>
    <div class="button__badge" v-if="count !== undefined">
      {{ count }}
    </div>
  </component>
</template>

<script setup lang="ts">
const props = defineProps<{
  to?: string;
  iconName: string;
  count?: number;
}>();

const component = computed(() =>
  props.to ? resolveComponent('NuxtLink') : 'button'
);
const icon = computed(() => {
  if (!props.iconName) return null;
  return defineAsyncComponent(
    () => import(`@/components/icon/${props.iconName}.vue`)
  );
});
</script>

<style scoped lang="scss">
.button {
  position: relative;
  display: flex;
  padding: 2px 4px;
  border: 1px solid transparent;
  outline: none;
  @include transition(border-color);

  &:focus-visible {
    border-color: $font-color-header;
  }
  @media #{$md-screen} {
    &:hover & {
      &__inner {
        color: $hover-color-header;
      }
      &__badge {
        background-color: $hover-color-header;
      }
    }
  }

  &:active & {
    &__inner {
      color: $active-color-header;
    }
    &__badge {
      background-color: $active-color-header;
    }
  }

  &__inner {
    display: flex;
    column-gap: 8px;
    align-items: center;
    justify-content: center;
    outline: none;
    @include transition(color);
  }

  &__icon-wrapper {
    height: 34px;
    width: 34px;
  }

  &__badge {
    position: absolute;
    top: -5%;
    right: 0;
    padding: 2px 4px;
    background-color: $font-color-header;
    border-radius: 50%;
    font-size: 14px;
    font-weight: 500;
    color: $bg-color-header;
    line-height: 1;
    transform: translateX(50%);
    @include transition(background-color);
  }
}
</style>
