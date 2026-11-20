<template>
  <section class="not-found">
    <p class="not-found__code">404</p>
    <h1>Сторінку не знайдено</h1>
    <p class="not-found__text">Такої адреси не існує або її було змінено.</p>

    <div class="not-found__actions">
      <RouterLink class="btn btn--primary" to="/">На головну</RouterLink>
      <RouterLink class="btn" :to="{ name: 'login' }">До входу</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.not-found {
  max-width: 480px;
  margin: 4rem auto;
  text-align: center;
}

.not-found__code {
  color: var(--accent);
  font-size: 2rem;
  font-weight: 700;
}

.not-found h1 {
  font-size: 1.5rem;
}

.not-found__text {
  margin-top: 0.5rem;
  color: var(--muted);
}

.not-found__actions {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
}
</style>
