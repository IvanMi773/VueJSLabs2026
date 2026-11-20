<script setup>
import { ref } from 'vue'
import TodoApp from '@/components/TodoApp.vue'

const counter = ref(0)
const showCounterDemo = ref(false)

function increment() {
  counter.value += 1
}
</script>

<template>
  <div class="app-shell">
    <header class="page-header">
      <h1>Список справ</h1>
      <p class="page-header__subtitle">Лабораторна робота №1 — Vue.js 3, Composition API</p>
      <p class="page-header__intro">
        Додавайте справи, змінюйте пріоритети, позначайте виконані та знаходьте потрібне за
        фільтрами. Дані зберігаються у LocalStorage.
      </p>
    </header>

    <main>
      <TodoApp />
    </main>

    <footer class="demo">
      <div class="demo__head">
        <h2 id="demo-title">Лічильник для Vue DevTools</h2>
        <button
          class="btn btn--small"
          type="button"
          :aria-expanded="showCounterDemo"
          aria-controls="counter-demo"
          @click="showCounterDemo = !showCounterDemo"
        >
          {{ showCounterDemo ? 'Сховати' : 'Показати' }}
        </button>
      </div>

      <div v-show="showCounterDemo" id="counter-demo" class="demo__panel">
        <p class="demo__value">{{ counter }}</p>
        <button class="btn btn--primary btn--small" type="button" @click="increment">
          increment()
        </button>
        <p class="demo__note">
          Відкрийте Vue DevTools → Components → <code>App</code>: у розділі <code>setup</code> видно
          <code>counter</code> (Ref) та <code>increment</code>.
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.page-header {
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--border);
}

.page-header h1 {
  font-size: 1.75rem;
}

.page-header__subtitle {
  margin-top: 0.2rem;
  color: var(--muted);
  font-size: 0.9rem;
}

.page-header__intro {
  max-width: 60ch;
  margin-top: 0.75rem;
}

.demo {
  margin-top: 2.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border);
}

.demo__head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.demo h2 {
  font-size: 1.05rem;
}

.demo__panel {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1rem;
  margin-top: 0.75rem;
  padding: 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.demo__value {
  min-width: 2ch;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1;
}

.demo__note {
  flex: 1 1 100%;
  color: var(--muted);
  font-size: 0.85rem;
}

.demo code {
  padding: 0.05em 0.3em;
  border-radius: 3px;
  background: #eeeeee;
  font-family: ui-monospace, Consolas, monospace;
  font-size: 0.9em;
}
</style>
