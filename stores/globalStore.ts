export const useGlobalStore = defineStore('globalStore', () => {
  const isPageSpinnerShown = ref(false)
  const isFilterOpened = ref(false)

  function showPageSpinner(show: boolean): void {
    isPageSpinnerShown.value = show
  }

  function openFilter(open?: boolean) {
    if (open !== undefined) {
      isFilterOpened.value = open
    } else {
      isFilterOpened.value = !isFilterOpened.value
    }
  }

  return {
    showPageSpinner,
    isPageSpinnerShown,

    openFilter,
    isFilterOpened,
  }
})
