<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container">
      <p class="site-footer__copy">© {{ year }} Вісник</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--border);
  background: var(--surface);
}

.site-footer__copy {
  padding-block: 1.4rem 1.6rem;
  color: var(--muted);
  font-size: 0.85rem;
  text-align: center;
}
</style>
