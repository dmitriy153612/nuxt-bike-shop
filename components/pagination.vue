<template>
  <div class="pagination">
    <div class="pagination__inner">
      <button
      :disabled="modelValue === 1"
        class="pagination__btn pagination__btn--change"
        @click="previousPage"
      >
        &#9668;
      </button>
      <ul class="pagination__list">
        <li class="pagination__item" v-for="page in totalPages">
          <button
            class="pagination__btn pagination__btn--num"
            :class="{ 'pagination__btn--checked': page === modelValue }"
            @click="() => emitPage(page)"
          >
            {{ page }}
          </button>
        </li>
      </ul>
      <button :disabled="modelValue === totalPages" class="pagination__btn pagination__btn--change" @click="nextPage">
        &#9658;
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: number): void;
}>();

function nextPage() {
  if (props.modelValue + 1 > props.totalPages) {
    return;
  }
  emitPage(props.modelValue + 1);
}

function previousPage() {
  if (props.modelValue - 1 < 1) {
    return;
  }
  emitPage(props.modelValue - 1);
}

function emitPage(newPage: number) {
  emit('update:modelValue', newPage);
}

</script>

<style scoped lang="scss">
.pagination {
  &__inner {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    column-gap: 4px;
    font-size: 24px;
    color: var(--secondary);
  }
  &__list {
    display: flex;
    column-gap: 4px;
    flex-wrap: wrap;
  }
  &__item {
    text-align: center;
  }
  &__btn {
    padding: 2px 6px;
    border: 2px solid transparent;
    border-radius: 6px;
    @include transition(border-color, color);
    &:focus-visible {
      border-color: var(--secondary);
    }
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    &--num {
      font-weight: 600;
    }
    &--checked {
      color: var(--hover);
    }
  }
}
</style>
