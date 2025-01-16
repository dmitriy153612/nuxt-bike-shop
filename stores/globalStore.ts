export const useGlobalStore = defineStore('globalStore', () => {
  const isPageSpinnerShown = ref(false)
  const isFilterOpened = ref(false)
  const isLoginModalOpened = ref(false)
  const isRegistrationModalOpened = ref(false)

  function showRegistrationModal(show: boolean) {
    isRegistrationModalOpened.value = show
  }

  function showLoginModal(show: boolean) {
    isLoginModalOpened.value = show
  }
  function showPageSpinner(show: boolean) {
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

    showLoginModal,
    isLoginModalOpened,

    showRegistrationModal,
    isRegistrationModalOpened,
  }
})
