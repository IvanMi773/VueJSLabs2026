import { defineStore } from 'pinia'

const SUPPORTED_LOCALES = ['ua', 'en']

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    locale: 'ua',
    profile: {
      name: '',
      email: '',
      phone: '',
    },
  }),
  actions: {
    setLocale(locale) {
      if (SUPPORTED_LOCALES.includes(locale)) this.locale = locale
    },
    saveProfile({ name, email, phone }) {
      this.profile = { name, email, phone }
    },
  },
  persist: true,
})
