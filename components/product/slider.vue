<template>
  <Carousel
    :value="slides"
    :num-visible="1"
    :num-scroll="1"
    orientation="horizontal"
    class="slider"
  >
    <template #item="slotProps">
      <div class="slider__img-wrapper">
        <NuxtImg
          loading="lazy"
          alt="фотография велосипеда"
          :src="slotProps.data"
          class="slider__img"
        />
      </div>
    </template>
  </Carousel>
</template>

<script setup lang="ts">
const props = defineProps<{
  slides: string[]
}>()

const emit = defineEmits<{
  (e: 'load'): void
}>()

onMounted(() => emit('load'))
</script>

<style scoped lang="scss">
.slider {
  width: 100%;
  &__img-wrapper {
    font-size: 0;
    aspect-ratio: 288 / 160;
  }
  &__img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
  :deep(.p-carousel-prev-button),
  :deep(.p-carousel-next-button) {
    display: none;
    @media #{$sm-screen} {
      display: block;
    }
  }
}
</style>
