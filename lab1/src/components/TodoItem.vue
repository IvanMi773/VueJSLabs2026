<script setup>
import { reactive, ref } from 'vue'
import { formatDate } from '@/utils/formatDate'

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['toggle', 'remove', 'update'])

const priorityLabels = {
  low: 'низький',
  medium: 'середній',
  high: 'високий',
}

const priorities = ['low', 'medium', 'high']

const isEditing = ref(false)
const error = ref('')
const draft = reactive({
  title: '',
  description: '',
  priority: 'medium',
})

function startEdit() {
  draft.title = props.todo.title
  draft.description = props.todo.description
  draft.priority = props.todo.priority
  error.value = ''
  isEditing.value = true
}

function cancelEdit() {
  isEditing.value = false
  error.value = ''
}

function save() {
  const title = draft.title.trim()

  if (!title) {
    error.value = 'Назва не може бути порожньою.'
    return
  }

  emit('update', {
    id: props.todo.id,
    title,
    description: draft.description.trim(),
    priority: draft.priority,
  })
  isEditing.value = false
}
</script>

<template>
  <li class="task" :class="{ 'task--done': todo.status === 'done' }">
    <form
      v-if="isEditing"
      class="task__edit"
      novalidate
      @submit.prevent="save"
      @keydown.esc="cancelEdit"
    >
      <div class="field">
        <label :for="`edit-title-${todo.id}`">Заголовок</label>
        <input
          :id="`edit-title-${todo.id}`"
          v-model="draft.title"
          type="text"
          autocomplete="off"
          :aria-invalid="Boolean(error)"
        />
      </div>

      <div class="field">
        <label :for="`edit-description-${todo.id}`">Опис</label>
        <input
          :id="`edit-description-${todo.id}`"
          v-model="draft.description"
          type="text"
          autocomplete="off"
          placeholder="Опис справи"
        />
      </div>

      <div class="task__edit-bottom">
        <div class="field">
          <label :for="`edit-priority-${todo.id}`">Пріоритет</label>
          <select :id="`edit-priority-${todo.id}`" v-model="draft.priority">
            <option v-for="priority in priorities" :key="priority" :value="priority">
              {{ priorityLabels[priority] }}
            </option>
          </select>
        </div>

        <div class="task__edit-actions">
          <button class="btn btn--small" type="button" @click="cancelEdit">Скасувати</button>
          <button class="btn btn--primary btn--small" type="submit">Зберегти</button>
        </div>
      </div>

      <p v-if="error" class="form-error" role="alert">{{ error }}</p>
    </form>

    <template v-else>
      <div class="task__head">
        <input
          class="task__checkbox"
          type="checkbox"
          :checked="todo.status === 'done'"
          :aria-label="
            todo.status === 'done' ? 'Повернути справу в активні' : 'Позначити справу виконаною'
          "
          @change="emit('toggle', todo.id)"
        />
        <h3 class="task__title" :class="{ 'is-done': todo.status === 'done' }">
          {{ todo.title }}
        </h3>
      </div>

      <p v-if="todo.description" class="task__description">{{ todo.description }}</p>

      <div class="task__meta">
        <span>{{ todo.status === 'done' ? 'Виконана' : 'Активна' }}</span>
        <span>Пріоритет: {{ priorityLabels[todo.priority] }}</span>
        <span>Створено {{ formatDate(todo.createdAt) }}</span>

        <div class="task__actions">
          <button class="link-btn" type="button" @click="startEdit">Редагувати</button>
          <button class="link-btn link-btn--danger" type="button" @click="emit('remove', todo.id)">
            Видалити
          </button>
        </div>
      </div>
    </template>
  </li>
</template>

<style scoped>
.task {
  padding: 0.9rem 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.task--done {
  background: #fafafa;
}

.task__head {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
}

.task__checkbox {
  flex: none;
  width: 1rem;
  height: 1rem;
  margin-top: 0.25rem;
  accent-color: var(--accent);
  cursor: pointer;
}

.task__title {
  flex: 1;
  min-width: 0;
  font-size: 1rem;
  overflow-wrap: anywhere;
}

.task__title.is-done {
  color: var(--muted);
  text-decoration: line-through;
}

.task__description {
  margin-top: 0.35rem;
  margin-left: 1.6rem;
  color: var(--muted);
  font-size: 0.9rem;
  overflow-wrap: anywhere;
}

.task__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem 1rem;
  margin-top: 0.6rem;
  margin-left: 1.6rem;
  color: var(--muted);
  font-size: 0.8rem;
}

.task__actions {
  display: flex;
  gap: 0.75rem;
  margin-left: auto;
}

.link-btn--danger {
  color: var(--danger);
}

.task__edit {
  display: grid;
  gap: 0.7rem;
}

.task__edit-bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 0.7rem;
}

.task__edit-bottom .field {
  width: 150px;
}

.task__edit-actions {
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
}

@media (max-width: 640px) {
  .task__description,
  .task__meta {
    margin-left: 0;
  }

  .task__edit-bottom .field {
    width: 100%;
  }

  .task__edit-actions {
    width: 100%;
    margin-left: 0;
    justify-content: flex-end;
  }
}
</style>
