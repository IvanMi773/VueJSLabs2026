export const products = [
  { id: 'mug', price: 420, emoji: '☕', tint: '#fbe9df' },
  { id: 'notebook', price: 260, emoji: '📓', tint: '#e7ecfa' },
  { id: 'tote', price: 390, emoji: '👜', tint: '#e9f1e4' },
  { id: 'candle', price: 540, emoji: '🕯️', tint: '#f6e8f1' },
  { id: 'tea', price: 310, emoji: '🍵', tint: '#e4f2ee' },
  { id: 'poster', price: 450, emoji: '🖼️', tint: '#f3efe2' },
  { id: 'socks', price: 180, emoji: '🧦', tint: '#f7e6e6' },
  { id: 'plant', price: 620, emoji: '🌵', tint: '#e6f3e3' },
]

export function getProduct(id) {
  return products.find((product) => product.id === id)
}
