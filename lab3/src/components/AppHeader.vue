<script setup>
import { useTheme } from '@/composables/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <header class="site-header">
    <div class="container site-header__inner">
      <RouterLink class="brand" to="/" aria-label="Вісник — на головну">
        <svg class="brand__mark" viewBox="0 0 64 64" aria-hidden="true">
          <rect width="64" height="64" rx="14" fill="var(--accent)" />
          <rect x="15" y="17" width="34" height="6" rx="3" fill="var(--on-accent)" />
          <rect
            x="15"
            y="29"
            width="20"
            height="5"
            rx="2.5"
            fill="var(--on-accent)"
            opacity="0.85"
          />
          <rect
            x="15"
            y="39"
            width="34"
            height="5"
            rx="2.5"
            fill="var(--on-accent)"
            opacity="0.85"
          />
          <rect
            x="39"
            y="29"
            width="10"
            height="5"
            rx="2.5"
            fill="var(--on-accent)"
            opacity="0.55"
          />
        </svg>
        <span class="brand__text">
          <span class="brand__name">Вісник</span>
          <span class="brand__tagline">новини про веб</span>
        </span>
      </RouterLink>

      <div class="site-header__actions">
        <nav class="nav" aria-label="Головна навігація">
          <RouterLink class="nav__link nav__link--home" to="/">Новини</RouterLink>
          <RouterLink class="nav__link" to="/about">Про нас</RouterLink>
        </nav>

        <button
          class="theme-toggle"
          type="button"
          :aria-pressed="isDark"
          :aria-label="isDark ? 'Увімкнути світлу тему' : 'Увімкнути темну тему'"
          :title="isDark ? 'Увімкнути світлу тему' : 'Увімкнути темну тему'"
          @click="toggleTheme"
        >
          <svg
            v-if="isDark"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41" />
            <path d="M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
          </svg>
          <svg
            v-else
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid var(--border);
  background: var(--bg);
  background: color-mix(in srgb, var(--bg) 88%, transparent);
  backdrop-filter: blur(10px);
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 68px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  color: var(--text);
  text-decoration: none;
}

.brand__mark {
  width: 34px;
  height: 34px;
  flex: none;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
}

.brand__text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}

.brand__name {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.brand__tagline {
  margin-top: 0.1rem;
  color: var(--muted);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.site-header__actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.nav {
  display: flex;
  align-items: center;
  gap: 0.15rem;
}

.nav__link {
  padding: 0.4rem 0.7rem;
  border-radius: var(--radius);
  color: var(--muted);
  font-size: 0.92rem;
  font-weight: 500;
  text-decoration: none;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.nav__link:hover {
  background: var(--surface-2);
  color: var(--text);
}

.nav__link.is-active,
.nav__link.is-exact-active {
  background: var(--accent-soft);
  color: var(--accent);
}

/* "/" is a prefix of every route, so the news link is highlighted only on Home. */
.nav__link--home.is-active:not(.is-exact-active) {
  background: transparent;
  color: var(--muted);
}

.nav__link--home.is-active:not(.is-exact-active):hover {
  background: var(--surface-2);
  color: var(--text);
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--muted);
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;
}

.theme-toggle:hover {
  border-color: var(--accent);
  color: var(--accent);
}

@media (max-width: 620px) {
  .brand__tagline {
    display: none;
  }

  .site-header__inner {
    min-height: 60px;
  }

  .nav__link {
    padding: 0.35rem 0.5rem;
    font-size: 0.85rem;
  }
}
</style>
