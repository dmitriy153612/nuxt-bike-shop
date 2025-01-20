export const useGlobalStore = defineStore('globalStore', () => {
  const isPageSpinnerShown = ref(false)

  function showPageSpinner(show: boolean) {
    isPageSpinnerShown.value = show
  }

  return {
    showPageSpinner,
    isPageSpinnerShown,
  }
})
