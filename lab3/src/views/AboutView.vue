<script setup>
import AdSlot from '@/components/AdSlot.vue'
</script>

<template>
  <section class="about">
    <header class="about__head">
      <p class="about__eyebrow">Про видання</p>
      <h1>Новини, які зручно читати</h1>
      <p class="about__lead">
        «Вісник» — онлайн-видання про технології, інструменти та людей, які будують веб. Ми збираємо
        короткі новини й практичні матеріали, щоб важливе було зручно читати.
      </p>
    </header>

    <section class="about__content" aria-labelledby="about-pages">
      <h2 id="about-pages">Що всередині</h2>
      <p class="about__intro">Сайт складається з кількох простих сторінок.</p>

      <ul class="about__pages">
        <li>
          <h3>Головна</h3>
          <p>Стрічка новин із великою публікацією та картками матеріалів.</p>
        </li>
        <li>
          <h3>Новина</h3>
          <p>Повний текст матеріалу з датою, ілюстрацією та рекламним банером.</p>
        </li>
        <li>
          <h3>Про нас</h3>
          <p>Коротка розповідь про видання та сторінки, які на ньому є.</p>
        </li>
        <li>
          <h3>Сторінку не знайдено</h3>
          <p>Підказка, що робити, якщо адреса виявилася хибною.</p>
        </li>
      </ul>
    </section>

    <AdSlot
      title="Підпишіться на «Вісник»"
      text="Щотижнева добірка головних новин про веб — прямо на вашу пошту. Без спаму, лише найважливіше."
      note="Лист щоп’ятниці · безкоштовно"
    />
  </section>
</template>

<style scoped>
.about {
  max-width: 940px;
  margin-inline: auto;
}

.about__head {
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--border);
}

.about__eyebrow {
  color: var(--accent);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.about__head h1 {
  margin-top: 0.35rem;
  font-size: clamp(1.9rem, 3.5vw, 2.4rem);
  letter-spacing: -0.02em;
}

.about__lead {
  max-width: 65ch;
  margin-top: 0.6rem;
  color: var(--muted);
}

.about__content {
  margin-top: 1.75rem;
}

.about__content h2 {
  font-size: 1.1rem;
}

.about__intro {
  margin-top: 0.5rem;
  color: var(--muted);
}

.about__pages {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.85rem;
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
}

.about__pages li {
  padding: 1rem 1.1rem;
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent);
  border-radius: var(--radius);
  background: var(--surface);
}

.about__pages h3 {
  font-size: 0.98rem;
}

.about__pages p {
  margin-top: 0.3rem;
  color: var(--muted);
  font-size: 0.88rem;
}

@media (max-width: 640px) {
  .about__pages {
    grid-template-columns: 1fr;
  }
}
</style>
