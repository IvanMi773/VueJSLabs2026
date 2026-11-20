<script setup>
import { computed } from 'vue'
import { users } from '@/data/users'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const user = computed(() => users.find((item) => item.id === props.id))
</script>

<template>
  <section>
    <RouterLink class="back-link" :to="{ name: 'users' }">← До списку користувачів</RouterLink>

    <template v-if="user">
      <h1>{{ user.name }}</h1>
      <p class="page-lead">Профіль користувача {{ user.id }}.</p>

      <dl class="details">
        <div>
          <dt>Email</dt>
          <dd>{{ user.email }}</dd>
        </div>
        <div>
          <dt>Роль</dt>
          <dd>{{ user.role }}</dd>
        </div>
        <div>
          <dt>Відділ</dt>
          <dd>{{ user.department }}</dd>
        </div>
        <div>
          <dt>Статус</dt>
          <dd>
            <span class="status" :class="`status--${user.status}`">
              {{ user.status === 'active' ? 'Активний' : 'Заблокований' }}
            </span>
          </dd>
        </div>
        <div>
          <dt>Зареєстрований</dt>
          <dd>{{ user.registeredAt }}</dd>
        </div>
        <div>
          <dt>Останній вхід</dt>
          <dd>{{ user.lastLogin }}</dd>
        </div>
      </dl>
    </template>

    <div v-else class="empty-note">
      <h1>Користувача не знайдено</h1>
      <p>Можливо, посилання застаріле. Поверніться до списку користувачів.</p>
    </div>
  </section>
</template>

<style scoped>
h1 {
  margin-top: 0.75rem;
  font-size: 1.5rem;
}

.back-link {
  font-size: 0.9rem;
}

.details {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1.25rem;
}

.details div {
  padding: 0.75rem 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.details dt {
  color: var(--muted);
  font-size: 0.8rem;
}

.details dd {
  margin: 0;
  font-size: 0.95rem;
  overflow-wrap: anywhere;
}

.empty-note h1 {
  margin-top: 0;
  font-size: 1.25rem;
}

@media (max-width: 640px) {
  .details {
    grid-template-columns: 1fr;
  }
}
</style>
