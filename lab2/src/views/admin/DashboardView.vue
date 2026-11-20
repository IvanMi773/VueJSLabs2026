<script setup>
import { computed } from 'vue'
import { users } from '@/data/users'

const total = computed(() => users.length)
const active = computed(() => users.filter((user) => user.status === 'active').length)
const admins = computed(() => users.filter((user) => user.role === 'Адміністратор').length)
const recent = computed(() => users.slice(0, 4))
</script>

<template>
  <section>
    <h1>Dashboard</h1>
    <p class="page-lead">Огляд демонстраційних даних адмін-панелі.</p>

    <div class="stats">
      <article class="stat">
        <p class="stat__label">Усього користувачів</p>
        <p class="stat__value">{{ total }}</p>
      </article>
      <article class="stat">
        <p class="stat__label">Активні</p>
        <p class="stat__value">{{ active }}</p>
      </article>
      <article class="stat">
        <p class="stat__label">Адміністратори</p>
        <p class="stat__value">{{ admins }}</p>
      </article>
    </div>

    <div class="dashboard__recent panel">
      <h2>Останні користувачі</h2>
      <ul class="simple-list">
        <li v-for="user in recent" :key="user.id">
          <RouterLink :to="{ name: 'user-detail', params: { id: user.id } }">
            {{ user.name }}
          </RouterLink>
          <span class="muted">{{ user.email }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
h1 {
  font-size: 1.5rem;
}

.dashboard__recent {
  margin-top: 1.5rem;
}

.dashboard__recent h2 {
  margin-bottom: 0.5rem;
  font-size: 1.05rem;
}

.simple-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.simple-list li {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.25rem 0.75rem;
  padding: 0.55rem 0;
  border-bottom: 1px solid var(--border);
  font-size: 0.9rem;
}

.simple-list li:last-child {
  border-bottom: 0;
}
</style>
