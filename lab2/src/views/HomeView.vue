<script setup>
import { inject } from 'vue'
import { authKey } from '@/keys'

const { state: session, isAuthenticated } = inject(authKey)
</script>

<template>
  <section class="home">
    <h1>Адмін-панель</h1>

    <div v-if="isAuthenticated" class="home__session">
      <p>
        Ви увійшли як <strong>{{ session.user.name }}</strong> ({{ session.user.email }}), роль:
        {{ session.user.role }}.
      </p>
      <RouterLink class="btn btn--primary" :to="{ name: 'dashboard' }">
        Відкрити адмін-панель
      </RouterLink>
    </div>

    <div v-else class="home__actions">
      <RouterLink class="btn btn--primary" :to="{ name: 'login' }">Увійти</RouterLink>
      <RouterLink class="btn" :to="{ name: 'register' }">Зареєструватися</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.home {
  max-width: 640px;
  margin: 2rem auto;
}

.home h1 {
  font-size: 2rem;
}

.home__actions,
.home__session {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.home__session {
  flex-direction: column;
  align-items: flex-start;
}
</style>
