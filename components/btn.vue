<template>
  <component :is="component" v-bind="{ to }" class="button" :class="btnClass">
    <div class="button__inner">
      <div class="button__text" v-if="$slots.default">
        <slot />
      </div>
      <span class="button__icon-wrapper">
        <component :is="icon" />
        <div class="button__badge" v-if="count !== undefined">
          {{ count }}
        </div>
      </span>
    </div>
  </component>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    to?: string;
    iconName: string;
    count?: number;
    appearance?: 'nav' | 'submit'
  }>(),
  {
    appearance: 'submit'
  }
);

const component = computed(() =>
  props.to ? resolveComponent('NuxtLink') : 'button'
);
const icon = computed(() => {
  if (!props.iconName) return null;
  return defineAsyncComponent(
    () => import(`@/components/icon/${props.iconName}.vue`)
  );
});

const btnClass = ref({
  'button--nav': props.appearance === 'nav',
  'button--submit': props.appearance === 'submit',
})
</script>

<style scoped lang="scss">
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: max-content;
  border: 2px solid transparent;
  border-radius: 6px;
  outline: none;
  background-color: var(--secondary);
  color: var(--primary);
  @include transition(border-color);

  &:focus-visible {
    border-color: var(--primary);
  }
  @media #{$md-screen} {
    &:hover & {
      &__inner {
        color: var(--hover);
      }
      &__badge {
        background-color: var(--hover);
      }
    }
  }

  &:active & {
    &__inner {
      color: var(--active);
    }
    &__badge {
      background-color: var(--active);
    }
  }

  &--submit & {
    &__inner {
      flex-direction: row-reverse;
      padding: 4px 20px;
    }
    &__icon-wrapper {
      height: 28px;
      width: 28px;
    }
  }
  &--nav & {
    &__inner {
      padding: 2px 4px;
    }
    &__icon-wrapper {
      height: 34px;
      width: 34px;
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
    position: relative;
  }

  &__badge {
    position: absolute;
    top: -5%;
    right: 0;
    padding: 2px 4px;
    background-color: var(--primary);
    border-radius: 50%;
    font-size: 14px;
    font-weight: 500;
    color: var(--secondary);
    line-height: 1;
    transform: translateX(50%);
    @include transition(background-color);
  }
}
</style>
