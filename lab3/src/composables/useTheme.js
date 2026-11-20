import { computed, readonly, ref } from 'vue'

const STORAGE_KEY = 'vuejs-labs-2026:lab3:theme'

function currentTheme() {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

const theme = ref(currentTheme())

function setTheme(value) {
  theme.value = value === 'dark' ? 'dark' : 'light'
  document.documentElement.dataset.theme = theme.value
  localStorage.setItem(STORAGE_KEY, theme.value)
}

function toggleTheme() {
  setTheme(theme.value === 'dark' ? 'light' : 'dark')
}

export function useTheme() {
  return {
    theme: readonly(theme),
    isDark: computed(() => theme.value === 'dark'),
    setTheme,
    toggleTheme,
  }
}
