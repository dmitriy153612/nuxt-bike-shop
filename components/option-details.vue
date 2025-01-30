<template>
  <dl
    class="option"
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
  big?: boolean
}>()
</script>

<style scoped lang="scss">
  .option {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0;
    column-gap: 8px;

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
