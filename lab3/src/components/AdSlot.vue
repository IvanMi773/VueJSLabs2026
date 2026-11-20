<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <aside class="ad" aria-label="Рекламний блок">
    <p class="ad__label">Реклама</p>

    <div class="ad__content">
      <p class="ad__title">{{ title }}</p>
      <p class="ad__text">{{ text }}</p>
    </div>

    <p v-if="note" class="ad__note">{{ note }}</p>
  </aside>
</template>

<style scoped>
.ad {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1.5rem;
  margin-top: 2rem;
  padding: 1.1rem 1.25rem;
  border: 1px dashed var(--border-strong);
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, var(--accent-soft), var(--surface) 70%);
}

.ad__label {
  align-self: flex-start;
  padding: 0.15rem 0.5rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
  color: var(--muted);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.ad__content {
  flex: 1 1 260px;
  min-width: 0;
}

.ad__title {
  font-weight: 600;
}

.ad__text {
  margin-top: 0.15rem;
  color: var(--muted);
  font-size: 0.9rem;
}

.ad__note {
  color: var(--muted);
  font-size: 0.8rem;
}

@media (max-width: 640px) {
  .ad {
    align-items: flex-start;
  }
}
</style>
