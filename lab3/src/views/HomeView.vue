<script setup>
import AdSlot from '@/components/AdSlot.vue'
import NewsCard from '@/components/NewsCard.vue'
import { news } from '@/data/news'

const [featured, ...rest] = news
</script>

<template>
  <section class="home">
    <header class="home__head">
      <p class="home__eyebrow">Стрічка · {{ news.length }} матеріалів</p>
      <h1>Останні новини</h1>
      <p class="home__lead">
        Коротко про Vue, інструменти та людей, які будують веб. Оновлюємо стрічку щотижня.
      </p>
    </header>

    <NewsCard :article="featured" featured class="home__featured" />

    <div class="news-grid">
      <NewsCard v-for="article in rest" :key="article.id" :article="article" />
    </div>

    <AdSlot
      title="Практикум з Vue: від компонентів до анімацій"
      text="Вісім вечірніх воркшопів із розбором реальних проєктів. Формат — онлайн, із записом і домашніми завданнями."
      note="Набір триває до 30 листопада"
    />
  </section>
</template>

<style scoped>
.home__head {
  max-width: 720px;
  margin-bottom: 1.5rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--border);
}

.home__eyebrow {
  color: var(--accent);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.home__head h1 {
  margin-top: 0.35rem;
  font-size: clamp(1.9rem, 3.5vw, 2.4rem);
  letter-spacing: -0.02em;
}

.home__lead {
  max-width: 60ch;
  margin-top: 0.6rem;
  color: var(--muted);
}

.home__featured {
  margin-bottom: 1.5rem;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
}

@media (max-width: 960px) {
  .news-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .news-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
