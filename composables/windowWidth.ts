export function useWindowWidth(): Ref<number> {
  const windowWidth = ref<number>(0)

  const updateWidth = () => {
    if (import.meta.client) {
      windowWidth.value = window.innerWidth
    }
  }

  onMounted(() => {
    updateWidth()
    window.addEventListener('resize', updateWidth)
  })

  onUnmounted(() => {
    if (import.meta.client) {
      window.removeEventListener('resize', updateWidth)
    }
  })

  return windowWidth
}
