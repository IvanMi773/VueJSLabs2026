<script setup>
import { useI18n } from 'vue-i18n'

import ProductCard from '@/components/ProductCard.vue'
import { products } from '@/data/products'
import { useCartStore } from '@/stores/cart'

const { t } = useI18n()
const cart = useCartStore()

function qtyOf(product) {
  return cart.items.find((item) => item.id === product.id)?.qty ?? 0
}
</script>

<template>
  <section class="catalog" aria-labelledby="catalog-title">
    <header class="catalog__head">
      <div>
        <h2 id="catalog-title">{{ t('catalog.title') }}</h2>
        <p class="catalog__subtitle">{{ t('catalog.subtitle') }}</p>
      </div>
      <p class="catalog__count">
        {{ t('catalog.itemsCount', products.length, { count: products.length }) }}
      </p>
    </header>

    <ul class="product-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        :qty="qtyOf(product)"
        @add="cart.add(product)"
      />
    </ul>
  </section>
</template>

<style scoped>
.catalog {
  margin-top: 1.75rem;
}

.catalog__head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.75rem 2rem;
  margin-bottom: 1.25rem;
}

.catalog__head h2 {
  font-size: 1.35rem;
}

.catalog__subtitle {
  max-width: 60ch;
  margin-top: 0.25rem;
  color: var(--muted);
  font-size: 0.9rem;
}

.catalog__count {
  padding: 0.3rem 0.65rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
  color: var(--muted);
  font-size: 0.8rem;
  white-space: nowrap;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(215px, 1fr));
  gap: 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
