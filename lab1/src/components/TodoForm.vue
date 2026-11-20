<script setup>
import { reactive, ref } from 'vue'

const emit = defineEmits(['add'])

const priorities = [
  { value: 'low', label: 'Низький' },
  { value: 'medium', label: 'Середній' },
  { value: 'high', label: 'Високий' },
]

const draft = reactive({
  title: '',
  description: '',
  priority: 'medium',
})
const error = ref('')

function submit() {
  const title = draft.title.trim()

  if (!title) {
    error.value = 'Додайте назву справи — порожні записи не зберігаються.'
    return
  }

  emit('add', {
    title,
    description: draft.description.trim(),
    priority: draft.priority,
  })

  draft.title = ''
  draft.description = ''
  draft.priority = 'medium'
  error.value = ''
}
</script>

<template>
  <form class="new-task" novalidate @submit.prevent="submit">
    <div class="new-task__top">
      <div class="field">
        <label for="new-title">Нова справа</label>
        <input
          id="new-title"
          v-model="draft.title"
          type="text"
          placeholder="Наприклад: здати лабораторну №1"
          autocomplete="off"
          :aria-invalid="Boolean(error)"
          :aria-describedby="error ? 'new-title-error' : undefined"
          @input="error = ''"
        />
      </div>

      <div class="field">
        <label for="new-priority">Пріоритет</label>
        <select id="new-priority" v-model="draft.priority">
          <option v-for="priority in priorities" :key="priority.value" :value="priority.value">
            {{ priority.label }}
          </option>
        </select>
      </div>

      <button class="btn btn--primary" type="submit">Додати</button>
    </div>

    <div class="field">
      <label for="new-description"> Опис <span class="field__optional">необов’язково</span> </label>
      <input
        id="new-description"
        v-model="draft.description"
        type="text"
        placeholder="Деталі, дедлайн, посилання"
        autocomplete="off"
      />
    </div>

    <p v-if="error" id="new-title-error" class="form-error" role="alert">{{ error }}</p>
  </form>
</template>

<style scoped>
.new-task {
  display: grid;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.new-task__top {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 150px auto;
  gap: 0.75rem;
  align-items: end;
}

@media (max-width: 720px) {
  .new-task__top {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }

  .new-task__top .btn {
    grid-column: 1 / -1;
  }
}
</style>
