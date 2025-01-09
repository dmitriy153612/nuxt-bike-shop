export const useGlobalStore = defineStore('globalStore', () => {
  const isPageSpinnerShown = ref(false)

  function showPageSpinner(show: boolean): void {
    isPageSpinnerShown.value = show
  }
  return {
    showPageSpinner,
    isPageSpinnerShown,
  }
})
