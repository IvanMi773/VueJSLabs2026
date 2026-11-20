<script setup>
import { provide } from 'vue'
import { auth } from '@/stores/auth'
import { authKey } from '@/keys'

provide(authKey, auth)
</script>

<template>
  <div class="app-shell app-shell--wide">
    <RouterView />
  </div>
</template>
