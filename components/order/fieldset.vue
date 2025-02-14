<template>
  <div
    class="order-fieldset"
    :class="{ 'order-fieldset--legend': legend }"
  >
    <fieldset class="order-fieldset__fieldset">
      <legend
        v-if="legend"
        class="order-fieldset__legend"
      >
        {{ legend }}
      </legend>
      <div class="order-fieldset__content">
        <slot />
        <Transition>
          <Spinner
            v-if="showSpinner"
            type="card"
          />
        </Transition>
      </div>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  showSpinner?: boolean
  legend?: string
}>()
</script>

<style scoped lang="scss">
$legendFontSize: 18px;
$legendPaddingTop: $legendFontSize + calc($legendFontSize * 0.4);

.order-fieldset {
  &--legend {
    padding-top: $legendPaddingTop;
  }
  &__fieldset {
    position: relative;
    display: flex;
    margin: 0;
    padding: 0;
    border: none;
    border-radius: 14px;
    box-shadow: $boxShadow;
    font-size: $legendFontSize;
    color: $secondary;
  }
  &__legend {
    position: absolute;
    top: -$legendPaddingTop;
    line-height: 1;
    white-space: nowrap;
  }
  &__content {
    position: relative;
    padding: 16px;
    width: 100%;
    overflow: hidden;
    border-radius: 14px
  }
}
.v-enter-active,
.v-leave-active {
  @include transition(opacity);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
