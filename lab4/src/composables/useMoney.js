import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { intlLocaleFor } from '@/i18n'

export function useMoney() {
  const { n, locale } = useI18n()
  const intlLocale = computed(() => intlLocaleFor(locale.value))

  function money(value) {
    return n(value, 'currency', intlLocale.value)
  }

  return { money }
}
