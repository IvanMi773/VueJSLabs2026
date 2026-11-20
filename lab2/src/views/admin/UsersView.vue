<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '@/components/BaseInput.vue'
import UserTable from '@/components/users/UserTable.vue'
import { users } from '@/data/users'

const router = useRouter()
const query = ref('')

const filteredUsers = computed(() => {
  const search = query.value.trim().toLowerCase()
  if (!search) return users

  return users.filter(
    (user) => user.name.toLowerCase().includes(search) || user.email.toLowerCase().includes(search),
  )
})

function openUser(id) {
  router.push({ name: 'user-detail', params: { id } })
}
</script>

<template>
  <section>
    <h1>Користувачі</h1>
    <p class="page-lead">Натисніть «Деталі», щоб перейти на сторінку окремого користувача.</p>

    <div class="toolbar">
      <BaseInput
        id="user-search"
        v-model="query"
        label="Пошук"
        type="search"
        placeholder="Ім’я або email"
      />
      <span class="toolbar__count">{{ filteredUsers.length }} з {{ users.length }}</span>
    </div>

    <UserTable :users="filteredUsers" @open="openUser" />
  </section>
</template>

<style scoped>
h1 {
  font-size: 1.5rem;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 1rem;
  margin: 1rem 0;
}

.toolbar .field {
  width: 280px;
  max-width: 100%;
}

.toolbar__count {
  margin-left: auto;
  color: var(--muted);
  font-size: 0.85rem;
}
</style>
