<script setup>
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

import { useMoney } from '@/composables/useMoney'
import { getProduct } from '@/data/products'
import { useCartStore } from '@/stores/cart'

const { t } = useI18n()
const { money } = useMoney()
const cart = useCartStore()
const { items, totalCount, totalPrice } = storeToRefs(cart)

function increase(item) {
  const product = getProduct(item.id)
  if (product) cart.add(product)
}
</script>

<template>
  <section class="cart-page" aria-labelledby="cart-title">
    <header class="cart-page__head">
      <h2 id="cart-title">{{ t('cart.title') }}</h2>
      <p class="cart-page__subtitle">{{ t('cart.subtitle') }}</p>
    </header>

    <div v-if="items.length" class="cart-layout">
      <div class="cart-list">
        <div class="cart-list__head" aria-hidden="true">
          <span></span>
          <span>{{ t('cart.price') }}</span>
          <span>{{ t('cart.quantity') }}</span>
          <span>{{ t('cart.lineTotal') }}</span>
          <span></span>
        </div>

        <ul class="cart-rows">
          <li v-for="item in items" :key="item.id" class="cart-row">
            <div class="cart-row__product">
              <span
                class="cart-row__emoji"
                :style="{ background: getProduct(item.id)?.tint }"
                aria-hidden="true"
              >
                {{ getProduct(item.id)?.emoji }}
              </span>
              <h3 class="cart-row__title">{{ t(item.title) }}</h3>
            </div>

            <p class="cart-row__price">{{ money(item.price) }}</p>

            <div class="qty" role="group" :aria-label="t('cart.quantity')">
              <button
                class="qty__btn"
                type="button"
                :aria-label="t('cart.decrease')"
                @click="cart.decrement(item.id)"
              >
                −
              </button>
              <span class="qty__value">{{ item.qty }}</span>
              <button
                class="qty__btn"
                type="button"
                :aria-label="t('cart.increase')"
                @click="increase(item)"
              >
                +
              </button>
            </div>

            <p class="cart-row__sum">{{ money(item.price * item.qty) }}</p>

            <button class="link-btn link-btn--danger" type="button" @click="cart.remove(item.id)">
              {{ t('cart.remove') }}
            </button>
          </li>
        </ul>

        <button class="link-btn cart-list__clear" type="button" @click="cart.clear()">
          {{ t('cart.clear') }}
        </button>
      </div>

      <aside class="cart-summary" :aria-label="t('cart.summary')">
        <h3>{{ t('cart.summary') }}</h3>
        <dl class="cart-summary__rows">
          <div>
            <dt>{{ t('cart.totalCount') }}</dt>
            <dd>{{ t('cart.itemsCount', totalCount, { count: totalCount }) }}</dd>
          </div>
          <div class="cart-summary__total">
            <dt>{{ t('cart.totalPrice') }}</dt>
            <dd>{{ money(totalPrice) }}</dd>
          </div>
        </dl>
      </aside>
    </div>

    <div v-else class="cart-empty">
      <h3>{{ t('cart.emptyTitle') }}</h3>
      <p>{{ t('cart.emptyText') }}</p>
      <RouterLink class="btn btn--primary" to="/">{{ t('cart.emptyAction') }}</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.cart-page {
  margin-top: 1.75rem;
}

.cart-page__head {
  margin-bottom: 1.25rem;
}

.cart-page__head h2 {
  font-size: 1.35rem;
}

.cart-page__subtitle {
  max-width: 60ch;
  margin-top: 0.25rem;
  color: var(--muted);
  font-size: 0.9rem;
}

.cart-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  gap: 1.5rem;
  align-items: start;
}

.cart-list {
  min-width: 0;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.cart-list__head,
.cart-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 90px 112px 100px auto;
  gap: 1rem;
  align-items: center;
}

.cart-list__head {
  padding: 0.65rem 1rem;
  border-bottom: 1px solid var(--border);
  background: #fafafa;
  border-radius: var(--radius) var(--radius) 0 0;
  color: var(--muted);
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.cart-rows {
  margin: 0;
  padding: 0;
  list-style: none;
}

.cart-row {
  padding: 0.9rem 1rem;
}

.cart-row + .cart-row {
  border-top: 1px solid var(--border);
}

.cart-row__product {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
}

.cart-row__emoji {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius);
  font-size: 1.4rem;
  line-height: 1;
}

.cart-row__title {
  min-width: 0;
  font-size: 0.95rem;
  overflow-wrap: anywhere;
}

.cart-row__price,
.cart-row__sum {
  font-size: 0.9rem;
  font-variant-numeric: tabular-nums;
}

.cart-row__sum {
  font-weight: 600;
}

.qty {
  display: inline-flex;
  align-items: center;
  justify-self: start;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--surface);
}

.qty__btn {
  width: 30px;
  height: 30px;
  border: 0;
  background: transparent;
  color: var(--text);
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
}

.qty__btn:hover {
  background: #f0f0f0;
}

.qty__value {
  min-width: 2ch;
  text-align: center;
  font-size: 0.9rem;
  font-variant-numeric: tabular-nums;
}

.link-btn--danger {
  color: var(--danger);
  justify-self: start;
}

.cart-list__clear {
  margin: 0.25rem 1rem 1rem;
}

.cart-summary {
  position: sticky;
  top: 1rem;
  padding: 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.cart-summary h3 {
  font-size: 1rem;
}

.cart-summary__rows {
  display: grid;
  gap: 0.6rem;
  margin-top: 0.75rem;
}

.cart-summary__rows > div {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
}

.cart-summary dt {
  color: var(--muted);
  font-size: 0.85rem;
}

.cart-summary dd {
  font-weight: 600;
  text-align: right;
}

.cart-summary__total {
  padding-top: 0.75rem;
  border-top: 1px solid var(--border);
}

.cart-summary__total dd {
  font-size: 1.25rem;
}

.cart-empty {
  padding: 3rem 1.5rem;
  border: 1px dashed var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  text-align: center;
}

.cart-empty h3 {
  font-size: 1.05rem;
}

.cart-empty p {
  max-width: 40ch;
  margin: 0.35rem auto 1rem;
  color: var(--muted);
  font-size: 0.9rem;
}

@media (max-width: 860px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }

  .cart-summary {
    position: static;
  }
}

@media (max-width: 720px) {
  .cart-list__head {
    display: none;
  }

  .cart-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem 1rem;
  }

  .cart-row__product {
    flex: 1 1 100%;
  }

  .cart-row__price {
    display: none;
  }

  .cart-row__sum {
    margin-left: auto;
    font-size: 1rem;
  }

  .link-btn--danger {
    flex: 1 1 100%;
    text-align: left;
  }
}
</style>
