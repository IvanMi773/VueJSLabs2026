import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  getters: {
    totalCount: (state) => state.items.reduce((sum, item) => sum + item.qty, 0),
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price * item.qty, 0),
  },
  actions: {
    add(product) {
      const existing = this.items.find((item) => item.id === product.id)

      if (existing) {
        existing.qty += 1
        return
      }

      this.items.push({
        id: product.id,
        // The i18n key lets cart items follow the selected language.
        title: `products.${product.id}.name`,
        price: product.price,
        qty: 1,
      })
    },
    decrement(id) {
      const existing = this.items.find((item) => item.id === id)
      if (!existing) return

      if (existing.qty > 1) {
        existing.qty -= 1
      } else {
        this.remove(id)
      }
    },
    remove(id) {
      this.items = this.items.filter((item) => item.id !== id)
    },
    clear() {
      this.items = []
    },
  },
  persist: true,
})
