<template>
  <section class="not-found">
    <p class="not-found__code">404</p>
    <h1>Такої сторінки немає</h1>
    <p class="not-found__text">
      Можливо, посилання застаріло або в адресі є помилка. Стрічка новин завжди на головній.
    </p>
    <RouterLink class="btn btn--primary" to="/">На головну</RouterLink>
  </section>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 52vh;
  padding: 2rem 1rem;
  text-align: center;
}

.not-found__code {
  color: var(--accent);
  font-size: clamp(4rem, 12vw, 6rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
}

.not-found h1 {
  margin-top: 0.75rem;
  font-size: clamp(1.5rem, 3vw, 2rem);
}

.not-found__text {
  max-width: 46ch;
  margin: 0.6rem 0 1.5rem;
  color: var(--muted);
}
</style>
