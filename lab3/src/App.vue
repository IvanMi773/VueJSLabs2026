<script setup>
import { useRoute } from 'vue-router'

import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

const route = useRoute()
</script>

<template>
  <div class="app">
    <a class="skip-link" href="#main">Перейти до вмісту</a>

    <AppHeader />

    <main id="main" class="app__main">
      <div class="container">
        <RouterView v-slot="{ Component }">
          <Transition name="page" mode="out-in">
            <component :is="Component" :key="route.fullPath" />
          </Transition>
        </RouterView>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app__main {
  flex: 1;
  padding-block: 2.25rem 3.5rem;
}

@media (max-width: 640px) {
  .app__main {
    padding-block: 1.5rem 2.5rem;
  }
}
</style>
