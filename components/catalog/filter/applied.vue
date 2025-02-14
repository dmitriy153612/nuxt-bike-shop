<template>
  <div class="applied-filter">
    <ul class="applied-filter__list">
      <li
        v-for="filter in appliedFilters"
        :key="filter.id"
        class="applied-filter__item"
      >
        <button
          class="applied-filter__btn"
          :aria-label="`удалить фильтр ${filter.name}`"
          @click="(e: Event) => removeFilter(filter, e)"
        >
          <span class="applied-filter__btn-icon">
            <IconCross />
          </span>
          <span class="applied-filter__btn-name">
            {{ filter.name }}
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { IFilterOption } from '@/types/catalog'

interface IFilterItem {
  key: string
  id: string
  name: string
}

const filterStore = useFilterStore()
const route = useRoute()
const router = useRouter()

const brands = computed<IFilterOption[]>(() => filterStore.brands)
const colors = computed<IFilterOption[]>(() => filterStore.colors)
const sizes = computed<IFilterOption[]>(() => filterStore.sizes)

const appliedBrands = computed<IFilterItem[]>(() =>
  getAppliedFilter('brandId', brands.value),
)
const appliedColors = computed<IFilterItem[]>(() =>
  getAppliedFilter('colorId', colors.value),
)
const appliedSizes = computed<IFilterItem[]>(() =>
  getAppliedFilter('sizeId', sizes.value),
)
const appliedMinPrice = computed<IFilterItem[]>(() =>
  getAppliedPriceFilter('minPrice', 'от'),
)
const appliedMaxPrice = computed<IFilterItem[]>(() =>
  getAppliedPriceFilter('maxPrice', 'до'),
)

const appliedFilters = computed<IFilterItem[]>(() => [
  ...appliedBrands.value,
  ...appliedColors.value,
  ...appliedSizes.value,
  ...appliedMinPrice.value,
  ...appliedMaxPrice.value,
])

function getAppliedFilter(
  key: string,
  options: IFilterOption[],
): IFilterItem[] {
  const routeQueryValues = getStringArray(route.query[key])
  return routeQueryValues.map(id => ({
    key,
    id,
    name: getFilterName(id, options),
  }))
}

function getAppliedPriceFilter(key: string, firstWord: string): IFilterItem[] {
  const value = route.query[key]
  if (!value) return []
  return [
    {
      key,
      id: String(value),
      name: `${firstWord} ${formatCurrency(String(value))}`,
    },
  ]
}

function getFilterName(id: string, options: IFilterOption[]): string {
  const obj: IFilterOption | undefined = options.find(
    option => option._id === id,
  )
  return obj?.name || ''
}

function removeFilter(filterItem: IFilterItem, event: Event) {
  const { key, id } = filterItem
  const updatedQueryValue = getStringArray(route.query[key]).filter(
    queryId => queryId !== id,
  )
  router.replace({
    query: {
      ...route.query,
      [key]: updatedQueryValue.length ? updatedQueryValue : undefined,
      page: 1,
    },
  })
  setFocus(event)
}

function setFocus(event: Event) {
  const button = (event.target as HTMLElement).closest('button')

  if (!button) return

  const listItem = button.closest('li')
  const list = listItem?.parentElement

  if (listItem && list) {
    const allButtons = Array.from(list.querySelectorAll('button'))
    const currentIndex = allButtons.indexOf(button)

    const nextButton = allButtons[currentIndex + 1]
    const prevButton = allButtons[currentIndex - 1]

    if (nextButton) {
      nextButton.focus()
    }
    else if (prevButton) {
      prevButton.focus()
    }
  }
}
</script>

<style scoped lang="scss">
.applied-filter {
  &__inner {
    padding-top: 16px;
  }
  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }
  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 4px;
    padding: 2px 4px;
    min-width: 48px;
    border: 2px solid $primary;
    border-radius: 8px;
    outline: none;
    @include transition(border-color);
    &:focus-visible {
      border-color: $alert;
    }
    &:hover {
      @media #{$xl-screen} {
        border-color: $alert;
      }
    }
    &-icon {
      display: flex;
      height: 12px;
      width: 12px;
      color: $alert;
    }
    &-name {
      font-size: 16px;
      line-height: 1;
      color: $secondary;
    }
  }
}
</style>
