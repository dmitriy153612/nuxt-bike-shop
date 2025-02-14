<template>
  <OrderFieldset legend="Пункт выдачи">
    <OrderFormRadioList
      v-model="updatedModelValue"
      :list="list"
      :column="true"
    >
      <template #default="{ data }">
        <template v-if="isIPickupPoint(data)">
          <div class="point">
            <div
              class="point__icon"
              :style="{ color: data.lineColor }"
            >
              <IconMetro />
            </div>
            <div class="point__metro">
              {{ data.metro }}
            </div>
            <div class="point__schedule">
              <ul class="point__schedule-list">
                <li
                  v-for="item in data.workTime"
                  :key="item._id"
                  class="point__schedule-item"
                >
                  <div class="point__schedule-day">
                    {{ item.day }}:
                  </div>
                  <div class="point__schedule-time">
                    {{ item.time }}
                  </div>
                </li>
              </ul>
            </div>
            <div class="point__address">
              {{ data.address }}
            </div>
          </div>
        </template>
      </template>
    </OrderFormRadioList>
  </OrderFieldset>
</template>

<script setup lang="ts">
import { IconMetro } from '#components'
import { isIPickupPoint, type IPickupPoint } from '@/types/order'

const props = defineProps<{
  modelValue: string
  list: IPickupPoint[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>()

const updatedModelValue = computed({
  get: () => props.modelValue,
  set: newValue => emit('update:modelValue', newValue),
})
</script>

<style scoped lang="scss">
.point {
  display: grid;
  gap: 8px;
  align-items: center;
  grid-template-areas:
  'icon metro'
  'schedule schedule'
  'address address'
  ;
  grid-template-columns: auto 1fr;
  font-size: 16px;
  @media #{$md-screen} {
    grid-template-areas:
    'icon metro schedule'
    'icon address schedule'
    ;
    align-items: flex-start;
    grid-template-rows: auto 1fr;
  }
  &__icon {
    grid-area: icon;
    width: 24px;
    height: 24px;
  }
  &__metro {
    grid-area: metro;
    font-size: 16px;
    font-weight: 600;
  }
  &__schedule {
    grid-area: schedule;
    &-list {
      display: grid;
      row-gap: 4px;
    }
    &-item {
      display: flex;
      column-gap: 8px;
      @media #{$md-screen} {
        justify-content: space-between;
      }
    }
    &-day {
      font-weight: 500;
    }
  }
  &__address {
    grid-area: address;
  }
}
</style>
