<script setup>
import { formatDate } from '@/utils/formatDate'

import styles from './NewsCard.module.css'

defineProps({
  article: {
    type: Object,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <article :class="[styles.card, featured && styles.featured]">
    <div :class="styles.media">
      <img :src="article.image" alt="" :loading="featured ? 'eager' : 'lazy'" decoding="async" />
    </div>

    <div :class="styles.body">
      <p :class="styles.meta">
        <span :class="styles.category">{{ article.category }}</span>
        <span aria-hidden="true">·</span>
        <time :datetime="article.date">{{ formatDate(article.date) }}</time>
        <span aria-hidden="true">·</span>
        <span>{{ article.readTime }}</span>
      </p>

      <h2 :class="styles.title">
        <RouterLink :class="styles.titleLink" :to="{ name: 'article', params: { id: article.id } }">
          {{ article.title }}
        </RouterLink>
      </h2>

      <p :class="styles.excerpt">{{ article.excerpt }}</p>

      <div :class="styles.footer">
        <RouterLink :class="styles.more" :to="{ name: 'article', params: { id: article.id } }">
          Читати далі <span aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </div>
  </article>
</template>
