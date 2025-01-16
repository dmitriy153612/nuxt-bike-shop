<template>
  <component
    :is="component"
    v-bind="{ to }"
    class="button"
    :class="btnClass"
    :disabled="showSpinner"
    :type="typeAttrs"
  >
    <span class="button__inner">
      <span class="button__text" v-if="$slots.default">
        <slot />
      </span>
      <span class="button__icon-wrapper" v-if="iconName">
        <component :is="icon" />
        <span class="button__badge" v-if="count !== undefined">
          {{ count }}
        </span>
      </span>
    </span>
    <Spinner class="button__spinner" v-if="showSpinner" />
  </component>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    to?: string;
    iconName?: string;
    count?: number;
    appearance?: 'nav' | 'submit' | 'cyrcle';
    showSpinner?: boolean;
    type?: 'submit' | 'button';
  }>(),
  {
    appearance: 'submit',
    showSpinner: false,
    type: 'button',
  }
);

const typeAttrs = computed(() => (props.to ? null : props.type));
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
  'button--cyrcle': props.appearance === 'cyrcle',
});
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
  @include transition(border-color);

  &:focus-visible {
    border-color: $primary;
  }
  @media #{$md-screen} {
    &:hover & {
      &__inner {
        color: $alert;
      }
      &__badge {
        background-color: $alert;
      }
    }
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
  &--nav & {
    &__inner {
      padding: 2px 4px;
    }
    &__icon-wrapper {
      height: 34px;
      width: 34px;
    }
  }
  &--cyrcle {
    border-radius: 50%;
    width: 30px;
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
