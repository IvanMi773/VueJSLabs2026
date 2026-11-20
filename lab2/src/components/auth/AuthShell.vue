<script setup>
defineProps({
  title: { type: String, default: '' },
})
</script>

<template>
  <div class="auth-shell">
    <div class="auth-shell__card">
      <header class="auth-shell__head">
        <slot name="title">
          <h1>{{ title }}</h1>
        </slot>
      </header>

      <slot />

      <footer class="auth-shell__footer">
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>

<style scoped>
.auth-shell {
  max-width: 440px;
  margin: 2.5rem auto;
}

.auth-shell__card {
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.auth-shell__head h1 {
  font-size: 1.35rem;
}

.auth-shell__footer {
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  color: var(--muted);
  font-size: 0.9rem;
}
</style>
