<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { uk } from 'date-fns/locale'

import TodoForm from './TodoForm.vue'
import TodoItem from './TodoItem.vue'

const STORAGE_KEY = 'vuejs-labs-2026:lab1:todos'
const PAGE_SIZE = 5

const statusOptions = [
  { value: 'all', label: 'Усі' },
  { value: 'active', label: 'Активні' },
  { value: 'done', label: 'Виконані' },
]

const priorityOptions = [
  { value: 'all', label: 'Будь-який' },
  { value: 'low', label: 'Низький' },
  { value: 'medium', label: 'Середній' },
  { value: 'high', label: 'Високий' },
]

const allowedStatuses = ['active', 'done']
const allowedPriorities = ['low', 'medium', 'high']

function startOfDay(date) {
  const value = new Date(date)
  value.setHours(0, 0, 0, 0)
  return value.getTime()
}

function endOfDay(date) {
  const value = new Date(date)
  value.setHours(23, 59, 59, 999)
  return value.getTime()
}

function isValidTodo(todo) {
  return (
    todo !== null &&
    typeof todo === 'object' &&
    typeof todo.id === 'string' &&
    typeof todo.title === 'string' &&
    todo.title.trim() !== '' &&
    typeof todo.description === 'string' &&
    allowedStatuses.includes(todo.status) &&
    allowedPriorities.includes(todo.priority) &&
    !Number.isNaN(Date.parse(todo.createdAt))
  )
}

function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter(isValidTodo) : []
  } catch {
    return []
  }
}

const todos = ref(loadTodos())

const filters = reactive({
  title: '',
  description: '',
  status: 'all',
  priority: 'all',
  dateFrom: null,
  dateTo: null,
})

const page = ref(1)

const totalCount = computed(() => todos.value.length)
const activeCount = computed(() => todos.value.filter((todo) => todo.status === 'active').length)
const doneCount = computed(() => todos.value.filter((todo) => todo.status === 'done').length)

const filteredTodos = computed(() => {
  const titleQuery = filters.title.trim().toLowerCase()
  const descriptionQuery = filters.description.trim().toLowerCase()
  const from = filters.dateFrom ? startOfDay(filters.dateFrom) : null
  const to = filters.dateTo ? endOfDay(filters.dateTo) : null

  return todos.value.filter((todo) => {
    if (titleQuery && !todo.title.toLowerCase().includes(titleQuery)) return false
    if (descriptionQuery && !todo.description.toLowerCase().includes(descriptionQuery)) return false
    if (filters.status !== 'all' && todo.status !== filters.status) return false
    if (filters.priority !== 'all' && todo.priority !== filters.priority) return false

    const createdAt = new Date(todo.createdAt).getTime()
    if (from !== null && createdAt < from) return false
    if (to !== null && createdAt > to) return false

    return true
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredTodos.value.length / PAGE_SIZE)))

const pagedTodos = computed(() => {
  const start = (page.value - 1) * PAGE_SIZE
  return filteredTodos.value.slice(start, start + PAGE_SIZE)
})

const pageNumbers = computed(() =>
  Array.from({ length: totalPages.value }, (_, index) => index + 1),
)

const hasActiveFilters = computed(
  () =>
    filters.title.trim() !== '' ||
    filters.description.trim() !== '' ||
    filters.status !== 'all' ||
    filters.priority !== 'all' ||
    filters.dateFrom !== null ||
    filters.dateTo !== null,
)

function addTodo(payload) {
  todos.value.unshift({
    id: crypto.randomUUID(),
    title: payload.title,
    description: payload.description,
    status: 'active',
    createdAt: new Date().toISOString(),
    priority: payload.priority,
  })
  page.value = 1
}

function toggleTodo(id) {
  const todo = todos.value.find((item) => item.id === id)
  if (!todo) return
  todo.status = todo.status === 'active' ? 'done' : 'active'
}

function removeTodo(id) {
  todos.value = todos.value.filter((item) => item.id !== id)
}

function updateTodo({ id, title, description, priority }) {
  const todo = todos.value.find((item) => item.id === id)
  if (!todo) return
  todo.title = title
  todo.description = description
  todo.priority = priority
}

function resetFilters() {
  filters.title = ''
  filters.description = ''
  filters.status = 'all'
  filters.priority = 'all'
  filters.dateFrom = null
  filters.dateTo = null
}

watch(
  todos,
  (value) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  },
  { deep: true },
)

watch(
  filters,
  () => {
    page.value = 1
  },
  { deep: true },
)

watch(totalPages, (value) => {
  if (page.value > value) page.value = value
})
</script>

<template>
  <section class="board" aria-labelledby="board-title">
    <header class="board__head">
      <div>
        <h2 id="board-title">Робочий стіл</h2>
        <p class="board__hint">
          {{ filteredTodos.length }} із {{ totalCount }} справ за поточним фільтром
        </p>
      </div>

      <dl class="counters">
        <div class="counters__item">
          <dt>Всього</dt>
          <dd>{{ totalCount }}</dd>
        </div>
        <div class="counters__item">
          <dt>Активні</dt>
          <dd>{{ activeCount }}</dd>
        </div>
        <div class="counters__item">
          <dt>Виконані</dt>
          <dd>{{ doneCount }}</dd>
        </div>
      </dl>
    </header>

    <TodoForm @add="addTodo" />

    <div class="workspace">
      <aside class="filters" aria-labelledby="filters-title">
        <div class="filters__head">
          <h3 id="filters-title">Фільтри</h3>
          <button v-if="hasActiveFilters" class="link-btn" type="button" @click="resetFilters">
            Очистити
          </button>
        </div>

        <div class="field">
          <label for="filter-title">Заголовок</label>
          <input
            id="filter-title"
            v-model="filters.title"
            type="search"
            placeholder="Пошук у назві"
          />
        </div>

        <div class="field">
          <label for="filter-description">Опис</label>
          <input
            id="filter-description"
            v-model="filters.description"
            type="search"
            placeholder="Пошук в описі"
          />
        </div>

        <fieldset class="filters__group">
          <legend>Статус</legend>
          <div class="segmented">
            <button
              v-for="option in statusOptions"
              :key="option.value"
              class="segmented__btn"
              :class="{ 'is-active': filters.status === option.value }"
              type="button"
              :aria-pressed="filters.status === option.value"
              @click="filters.status = option.value"
            >
              {{ option.label }}
            </button>
          </div>
        </fieldset>

        <div class="field">
          <label for="filter-priority">Пріоритет</label>
          <select id="filter-priority" v-model="filters.priority">
            <option v-for="option in priorityOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <fieldset class="filters__group">
          <legend>Дата створення</legend>
          <div class="filters__dates">
            <div class="field">
              <label for="filter-date-from">Від</label>
              <VueDatePicker
                v-model="filters.dateFrom"
                :max-date="filters.dateTo || undefined"
                :locale="uk"
                :formats="{ input: 'dd.MM.yyyy' }"
                :input-attrs="{ id: 'filter-date-from' }"
                :time-config="{ enableTimePicker: false }"
                auto-apply
                placeholder="—"
              />
            </div>
            <div class="field">
              <label for="filter-date-to">До</label>
              <VueDatePicker
                v-model="filters.dateTo"
                :min-date="filters.dateFrom || undefined"
                :locale="uk"
                :formats="{ input: 'dd.MM.yyyy' }"
                :input-attrs="{ id: 'filter-date-to' }"
                :time-config="{ enableTimePicker: false }"
                auto-apply
                placeholder="—"
              />
            </div>
          </div>
        </fieldset>

        <p class="filters__note">Зміни автоматично зберігаються у LocalStorage.</p>
      </aside>

      <div class="tasks">
        <TransitionGroup v-if="pagedTodos.length" name="task" tag="ol" class="task-list">
          <TodoItem
            v-for="todo in pagedTodos"
            :key="todo.id"
            :todo="todo"
            @toggle="toggleTodo"
            @remove="removeTodo"
            @update="updateTodo"
          />
        </TransitionGroup>

        <div v-else class="empty">
          <template v-if="!totalCount">
            <h3>Список порожній</h3>
            <p>Запишіть першу справу у формі вище — вона одразу з’явиться тут.</p>
          </template>
          <template v-else>
            <h3>Нічого не знайдено</h3>
            <p>Жодна справа не відповідає фільтрам. Спробуйте змінити умови.</p>
            <button class="link-btn" type="button" @click="resetFilters">Скинути фільтри</button>
          </template>
        </div>

        <nav v-if="totalPages > 1" class="pagination" aria-label="Пагінація">
          <button
            class="page-btn"
            type="button"
            :disabled="page === 1"
            aria-label="Попередня сторінка"
            @click="page -= 1"
          >
            ‹
          </button>
          <button
            v-for="number in pageNumbers"
            :key="number"
            class="page-btn"
            :class="{ 'is-active': number === page }"
            type="button"
            :aria-current="number === page ? 'page' : undefined"
            :aria-label="`Сторінка ${number}`"
            @click="page = number"
          >
            {{ number }}
          </button>
          <button
            class="page-btn"
            type="button"
            :disabled="page === totalPages"
            aria-label="Наступна сторінка"
            @click="page += 1"
          >
            ›
          </button>
          <span class="pagination__label">Сторінка {{ page }} з {{ totalPages }}</span>
        </nav>
      </div>
    </div>
  </section>
</template>

<style scoped>
.board {
  margin-top: 1.75rem;
}

.board__head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem 2rem;
  margin-bottom: 1rem;
}

.board__head h2 {
  font-size: 1.2rem;
}

.board__hint {
  margin-top: 0.2rem;
  color: var(--muted);
  font-size: 0.85rem;
}

.counters {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.counters__item {
  display: flex;
  flex-direction: column;
}

.counters dt {
  font-size: 0.8rem;
  color: var(--muted);
}

.counters dd {
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.2;
}

.workspace {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 1.5rem;
  align-items: start;
  margin-top: 1.5rem;
}

.filters {
  position: sticky;
  top: 1rem;
  display: grid;
  gap: 1rem;
  padding: 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.filters__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem;
}

.filters__head h3 {
  font-size: 1rem;
}

.filters__group legend {
  margin-bottom: 0.35rem;
  font-size: 0.875rem;
  color: var(--muted);
}

.segmented {
  display: flex;
  gap: 0.25rem;
}

.segmented__btn {
  flex: 1;
  padding: 0.35rem 0.25rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--surface);
  color: var(--text);
  font-size: 0.8rem;
  cursor: pointer;
}

.segmented__btn:hover {
  background: #f0f0f0;
}

.segmented__btn.is-active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.filters__dates {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.filters__note {
  padding-top: 0.75rem;
  border-top: 1px solid var(--border);
  color: var(--muted);
  font-size: 0.75rem;
}

.tasks {
  min-width: 0;
}

.task-list {
  display: grid;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.empty {
  padding: 2.5rem 1.5rem;
  border: 1px dashed var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  text-align: center;
}

.empty h3 {
  font-size: 1rem;
}

.empty p {
  max-width: 40ch;
  margin: 0.25rem auto 0;
  color: var(--muted);
  font-size: 0.9rem;
}

.empty .link-btn {
  margin-top: 0.5rem;
}

.pagination {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem;
  margin-top: 1rem;
}

.page-btn {
  min-width: 32px;
  height: 32px;
  padding: 0 0.4rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--surface);
  color: var(--text);
  font-size: 0.85rem;
  cursor: pointer;
}

.page-btn:hover:not(:disabled) {
  background: #f0f0f0;
}

.page-btn.is-active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination__label {
  margin-left: auto;
  color: var(--muted);
  font-size: 0.8rem;
}

.task-enter-active,
.task-leave-active {
  transition: opacity 0.15s ease;
}

.task-enter-from,
.task-leave-to {
  opacity: 0;
}

@media (max-width: 920px) {
  .workspace {
    grid-template-columns: 1fr;
  }

  .filters {
    position: static;
  }
}

@media (max-height: 780px) {
  .filters {
    position: static;
  }
}

@media (max-width: 560px) {
  .counters {
    width: 100%;
    gap: 1rem;
  }

  .pagination__label {
    width: 100%;
    margin-left: 0;
  }
}
</style>
