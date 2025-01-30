<template>
  <component
    :is="component"
    v-bind="disabled ? {} : { to }"
    class="button"
    :class="btnClass"
    :disabled="showSpinner || disabled"
    :type="typeAttrs"
  >
    <span class="button__inner">
      <span
        v-if="$slots.default"
        class="button__text"
      >
        <slot />
      </span>
      <span
        v-if="iconName"
        class="button__icon-wrapper"
      >
        <component :is="icon" />
        <span
          v-if="count !== undefined"
          class="button__badge"
        >
          {{ count }}
        </span>
      </span>
    </span>
    <Spinner
      v-if="showSpinner"
      class="button__spinner"
    />
  </component>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    to?: string
    iconName?: string
    count?: number
    appearance?: 'nav' | 'submit' | 'icon'
    showSpinner?: boolean
    type?: 'submit' | 'button'
    disabled?: boolean
  }>(),
  {
    appearance: 'submit',
    type: 'button',
  },
)

const typeAttrs = computed(() => (props.to ? null : props.type))
const component = computed(() =>
  props.to ? resolveComponent('NuxtLink') : 'button',
)
const icon = computed(() => {
  if (!props.iconName) return null
  return defineAsyncComponent(
    () => import(`@/components/icon/${props.iconName}.vue`),
  )
})

const btnClass = ref({
  'button--nav': props.appearance === 'nav',
  'button--submit': props.appearance === 'submit',
  'button--icon': props.appearance === 'icon',
})
</script>

<style scoped lang="scss">
.button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid transparent;
  border-radius: 6px;
  outline: none;
  background-color: $secondary;
  color: $primary;
  @include transition(border-color, opacity);
  &:disabled {
    pointer-events: none;
    opacity: 0.7;
  }

  &:focus-visible {
    border-color: $primary;
  }
  @media #{$xl-screen} {
    &:hover & {
      &__inner {
        color: $alert;
      }
      &__badge {
        background-color: $alert;
      }
    }
  }

  &:active {
    opacity: 0.9;
  }
  &:active & {
    &__inner {
      color: $alert;
    }
    &__badge {
      background-color: $alert;
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
  &--nav {
    background-color: transparent;
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
  &--icon & {
    &__inner {
      padding: 0;
    }
    &__icon-wrapper {
      height: 28px;
      width: 28px;
    }
    &__text {
      display: none;
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
    display: flex;
    font-size: 0;
  }

  &__badge {
    position: absolute;
    top: -5%;
    right: 0;
    padding: 2px 4px;
    background-color: $primary;
    border-radius: 50%;
    font-size: 14px;
    font-weight: 500;
    color: $secondary;
    line-height: 1;
    transform: translateX(50%);
    @include transition(background-color);
  }
}
</style>
