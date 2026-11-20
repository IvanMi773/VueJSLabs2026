<script setup>
defineProps({
  users: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['open'])
</script>

<template>
  <div v-if="users.length" class="table-wrap">
    <table class="table">
      <thead>
        <tr>
          <th>Ім’я</th>
          <th>Email</th>
          <th>Роль</th>
          <th>Статус</th>
          <th class="table__actions">Дії</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>
            <span class="status" :class="`status--${user.status}`">
              {{ user.status === 'active' ? 'Активний' : 'Заблокований' }}
            </span>
          </td>
          <td class="table__actions">
            <button class="link-btn" type="button" @click="emit('open', user.id)">Деталі</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <p v-else class="empty-note">Нічого не знайдено.</p>
</template>
