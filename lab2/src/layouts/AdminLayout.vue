<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'
import { authKey } from '@/keys'

const { state: session, isAuthenticated, logout } = inject(authKey)
const router = useRouter()

const links = [
  { name: 'dashboard', label: 'Dashboard' },
  { name: 'users', label: 'Користувачі' },
  { name: 'reports', label: 'Звіти' },
]

function handleLogout() {
  logout()
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="admin">
    <aside class="admin__sidebar">
      <RouterLink class="admin__brand" :to="{ name: 'dashboard' }">Lab 2 · Адмін</RouterLink>

      <nav class="admin__nav" aria-label="Адмін-навігація">
        <RouterLink
          v-for="link in links"
          :key="link.name"
          class="admin__link"
          :to="{ name: link.name }"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <div class="admin__sidebar-footer">
        <RouterLink class="admin__link" to="/">На головну</RouterLink>
      </div>
    </aside>

    <div class="admin__main">
      <header class="admin__header">
        <div v-if="isAuthenticated" class="admin__user">
          <span class="admin__user-name">{{ session.user.name }}</span>
          <span class="admin__user-email">{{ session.user.email }}</span>
        </div>
        <button class="btn btn--small" type="button" @click="handleLogout">Вийти</button>
      </header>

      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.admin {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 1.5rem;
  align-items: start;
}

.admin__sidebar {
  position: sticky;
  top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.admin__brand {
  font-weight: 600;
  color: var(--text);
  text-decoration: none;
}

.admin__nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.admin__link {
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  color: var(--text);
  font-size: 0.9rem;
  text-decoration: none;
}

.admin__link:hover {
  background: #f0f0f0;
}

.admin__link.is-active {
  background: var(--accent);
  color: #fff;
}

.admin__sidebar-footer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

.admin__main {
  min-width: 0;
}

.admin__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}

.admin__user {
  display: flex;
  flex-direction: column;
}

.admin__user-name {
  font-size: 0.9rem;
  font-weight: 600;
}

.admin__user-email {
  font-size: 0.8rem;
  color: var(--muted);
}

@media (max-width: 900px) {
  .admin {
    grid-template-columns: 1fr;
  }

  .admin__sidebar {
    position: static;
  }

  .admin__nav {
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>
