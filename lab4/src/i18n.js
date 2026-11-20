import { createI18n } from 'vue-i18n'

import en from './locales/en'
import ua from './locales/ua'

export const DEFAULT_LOCALE = 'ua'
export const SUPPORTED_LOCALES = ['ua', 'en']

// Intl uses "uk" for Ukrainian, while the app keeps the short "ua" code.
const INTL_LOCALES = {
  ua: 'uk',
  en: 'en',
}

const currencyFormat = {
  style: 'currency',
  currency: 'UAH',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
}

function ukPluralizationRule(choice, choicesLength) {
  const value = Math.abs(choice)

  if (choicesLength === 3) {
    const mod10 = value % 10
    const mod100 = value % 100

    if (mod10 === 1 && mod100 !== 11) return 0
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 1
    return 2
  }

  return value === 1 ? 0 : 1
}

export const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages: { ua, en },
  numberFormats: {
    uk: { currency: currencyFormat },
    en: { currency: currencyFormat },
  },
  pluralRules: {
    ua: ukPluralizationRule,
  },
})

export function intlLocaleFor(locale) {
  return INTL_LOCALES[locale] ?? INTL_LOCALES[DEFAULT_LOCALE]
}
