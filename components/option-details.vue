<template>
  <dl
    class="option"
    :class="{
      'option--small': size === 'small',
      'option--big': size === 'big',
    }"
  >
    <dt class="option__name">
      {{ optionName }}:
    </dt>
    <dd class="option__value">
      {{ optionValue }}
      <slot />
    </dd>
  </dl>
</template>

<script setup lang="ts">
defineProps<{
  optionName: string
  optionValue?: string | number
  size?: 'small' | 'big'
}>()
</script>

<style scoped lang="scss">
  .option {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0;
    column-gap: 8px;
    line-height: 1;
    color: $secondary;
    &--small & {
      &__name {
        font-size: 14px;
      }
      &__value {
        font-size: 16px;
      }
    }
    &--big & {
      &__name {
        font-size: 20px;
      }
      &__value {
        font-size: 22px;
      }
    }
    &__name {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
    }
    &__value {
      margin: 0;
      font-size: 20px;
    }
  }
</style>
