<script setup>
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, RouterView, useRoute } from 'vue-router'

import { i18n } from '@/i18n'
import { useCartStore } from '@/stores/cart'
import { useSettingsStore } from '@/stores/settings'

const { t } = useI18n()
const route = useRoute()
const settings = useSettingsStore()
const cart = useCartStore()

const locales = [
  { value: 'ua', label: 'UA' },
  { value: 'en', label: 'EN' },
]

watch(
  () => settings.locale,
  (locale) => {
    i18n.global.locale.value = locale
    document.documentElement.lang = locale === 'ua' ? 'uk' : 'en'
  },
  { immediate: true },
)

watch(
  [() => settings.locale, () => route.name],
  () => {
    const page = route.name ? t(`nav.${route.name}`) : t('app.title')
    document.title = `${page} · ${t('app.title')} · Lab 4`
  },
  { immediate: true },
)
</script>

<template>
  <div class="app-shell">
    <header class="page-header">
      <div class="page-header__top">
        <h1>{{ t('app.title') }}</h1>

        <div class="lang-switch" role="group" :aria-label="t('app.language')">
          <button
            v-for="option in locales"
            :key="option.value"
            class="lang-switch__btn"
            :class="{ 'is-active': settings.locale === option.value }"
            type="button"
            :aria-pressed="settings.locale === option.value"
            @click="settings.setLocale(option.value)"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <nav class="site-nav" :aria-label="t('nav.label')">
        <RouterLink to="/" class="site-nav__link" exact-active-class="is-active">
          {{ t('nav.catalog') }}
        </RouterLink>
        <RouterLink to="/cart" class="site-nav__link" active-class="is-active">
          {{ t('nav.cart') }}
          <span v-if="cart.totalCount" class="site-nav__badge">{{ cart.totalCount }}</span>
        </RouterLink>
        <RouterLink to="/profile" class="site-nav__link" active-class="is-active">
          {{ t('nav.profile') }}
        </RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.page-header {
  border-bottom: 1px solid var(--border);
}

.page-header__top {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.page-header h1 {
  font-size: 1.75rem;
}

.lang-switch {
  display: flex;
  gap: 0.2rem;
  padding: 0.2rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.lang-switch__btn {
  padding: 0.3rem 0.6rem;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: var(--muted);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  cursor: pointer;
}

.lang-switch__btn:hover {
  background: #f0f0f0;
}

.lang-switch__btn.is-active {
  background: var(--accent);
  color: #fff;
}

.site-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 1.25rem;
}

.site-nav__link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: -1px;
  padding: 0.6rem 0;
  border-bottom: 2px solid transparent;
  color: var(--muted);
  font-size: 0.9rem;
  text-decoration: none;
}

.site-nav__link:hover {
  color: var(--text);
}

.site-nav__link.is-active {
  border-bottom-color: var(--accent);
  color: var(--text);
}

.site-nav__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.35rem;
  height: 1.35rem;
  padding: 0 0.35rem;
  border-radius: 999px;
  background: var(--accent);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 600;
  line-height: 1;
}

@media (max-width: 560px) {
  .page-header__top {
    align-items: flex-start;
  }

  .site-nav {
    gap: 1rem;
  }
}
</style>
