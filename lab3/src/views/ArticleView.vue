<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import AdModal from '@/components/AdModal.vue'
import AdSlot from '@/components/AdSlot.vue'
import { news } from '@/data/news'
import { formatLongDate } from '@/utils/formatDate'

const route = useRoute()
const article = computed(() => news.find((item) => item.id === route.params.id))
const isAdOpen = ref(false)
</script>

<template>
  <article v-if="article" class="article">
    <RouterLink class="article__back" to="/">← Усі новини</RouterLink>

    <header class="article__head">
      <p class="article__meta">
        <span class="article__category">{{ article.category }}</span>
        <time :datetime="article.date">{{ formatLongDate(article.date) }}</time>
        <span>{{ article.readTime }} читання</span>
      </p>
      <h1>{{ article.title }}</h1>
      <p class="article__lead">{{ article.excerpt }}</p>
    </header>

    <figure class="article__cover">
      <img :src="article.image" :alt="`Ілюстрація до новини «${article.title}»`" />
    </figure>

    <div class="article__body">
      <p v-for="(paragraph, index) in article.content" :key="index">{{ paragraph }}</p>
    </div>

    <button class="promo" type="button" aria-haspopup="dialog" @click="isAdOpen = true">
      <img class="promo__image" src="/ads/vue-course.svg" alt="" />
      <span class="promo__content">
        <span class="promo__label">Реклама</span>
        <span class="promo__title">Курс «Vue.js: від SFC до продакшену»</span>
        <span class="promo__text">
          Практичний курс про компоненти, стилі та анімації. Натисніть, щоб дізнатися більше.
        </span>
      </span>
      <span class="promo__cta" aria-hidden="true">Детальніше →</span>
    </button>

    <AdSlot
      title="Шукаєте менторську підтримку?"
      text="Розбір домашніх проєктів, код-рев’ю та підготовка до співбесіди у форматі один на один."
      note="Перша консультація безкоштовна"
    />

    <AdModal :open="isAdOpen" @close="isAdOpen = false" />
  </article>

  <section v-else class="missing">
    <p class="missing__code">404</p>
    <h1>Новину не знайдено</h1>
    <p class="missing__text">Можливо, посилання застаріло або матеріал переміщено.</p>
    <RouterLink class="btn btn--primary" to="/">Повернутися до стрічки</RouterLink>
  </section>
</template>

<style scoped>
.article {
  max-width: 780px;
  margin-inline: auto;
}

.article__back {
  display: inline-block;
  margin-bottom: 1.25rem;
  color: var(--muted);
  font-size: 0.88rem;
  text-decoration: none;
}

.article__back:hover {
  color: var(--accent);
  text-decoration: underline;
}

.article__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem 0.85rem;
  color: var(--muted);
  font-size: 0.82rem;
}

.article__category {
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.article__head h1 {
  margin-top: 0.7rem;
  font-size: clamp(1.9rem, 4vw, 2.45rem);
  letter-spacing: -0.02em;
}

.article__lead {
  margin-top: 0.75rem;
  color: var(--muted);
  font-size: 1.05rem;
}

.article__cover {
  margin-top: 1.5rem;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface-2);
}

.article__cover img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.article__body {
  margin-top: 1.25rem;
  font-size: 1.03rem;
  line-height: 1.75;
}

.article__body p + p {
  margin-top: 1.05rem;
}

.promo {
  display: grid;
  grid-template-columns: 210px minmax(0, 1fr) auto;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
  color: var(--text);
  text-align: left;
  cursor: pointer;
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease;
}

.promo:hover {
  border-color: var(--accent);
  box-shadow: var(--shadow);
}

.promo__image {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.promo__content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.promo__label {
  color: var(--muted);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.promo__title {
  font-weight: 600;
}

.promo__text {
  color: var(--muted);
  font-size: 0.88rem;
}

.promo__cta {
  color: var(--accent);
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
}

.missing {
  max-width: 560px;
  margin: 3rem auto;
  text-align: center;
}

.missing__code {
  color: var(--accent);
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1;
}

.missing h1 {
  margin-top: 0.5rem;
  font-size: 1.6rem;
}

.missing__text {
  margin: 0.5rem 0 1.25rem;
  color: var(--muted);
}

@media (max-width: 720px) {
  .promo {
    grid-template-columns: 1fr;
    gap: 0.85rem;
  }

  .promo__image {
    aspect-ratio: 2 / 1;
  }

  .promo__cta {
    justify-self: start;
  }
}
</style>
