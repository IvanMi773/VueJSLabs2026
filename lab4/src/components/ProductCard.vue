<script setup>
import { useI18n } from 'vue-i18n'

import { useMoney } from '@/composables/useMoney'

defineProps({
  product: {
    type: Object,
    required: true,
  },
  qty: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['add'])

const { t } = useI18n()
const { money } = useMoney()
</script>

<template>
  <li class="product">
    <div class="product__media" :style="{ background: product.tint }" aria-hidden="true">
      {{ product.emoji }}
    </div>

    <div class="product__body">
      <h3 class="product__title">{{ t(`products.${product.id}.name`) }}</h3>
      <p class="product__description">{{ t(`products.${product.id}.description`) }}</p>

      <p v-if="qty" class="product__qty">{{ t('catalog.inCart', { count: qty }) }}</p>

      <div class="product__footer">
        <span class="product__price">{{ money(product.price) }}</span>
        <button class="btn btn--primary btn--small" type="button" @click="emit('add')">
          {{ t('catalog.addToCart') }}
        </button>
      </div>
    </div>
  </li>
</template>

<style scoped>
.product {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.product__media {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 112px;
  font-size: 2.75rem;
  line-height: 1;
}

.product__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1rem;
}

.product__title {
  font-size: 1rem;
}

.product__description {
  color: var(--muted);
  font-size: 0.85rem;
}

.product__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 0.75rem;
}

.product__footer .btn {
  padding: 0.28rem 0.6rem;
  font-size: 0.8rem;
}

.product__price {
  font-size: 1.02rem;
  font-weight: 600;
  white-space: nowrap;
}

.product__qty {
  align-self: flex-start;
  padding: 0.12rem 0.5rem;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent);
  font-size: 0.75rem;
}
</style>
