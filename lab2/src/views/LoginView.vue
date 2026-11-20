<script setup>
import { inject, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthShell from '@/components/auth/AuthShell.vue'
import LoginForm from '@/components/auth/LoginForm.vue'
import { authKey } from '@/keys'

const { login } = inject(authKey)
const route = useRoute()
const router = useRouter()

const submitting = ref(false)

async function handleSubmit(credentials) {
  submitting.value = true
  await new Promise((resolve) => setTimeout(resolve, 300))
  login(credentials)
  submitting.value = false

  const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : null
  router.push(redirect || { name: 'dashboard' })
}
</script>

<template>
  <AuthShell title="Вхід в адмін-панель">
    <LoginForm :submitting="submitting" @submit="handleSubmit" />

    <template #footer>
      Немає акаунта?
      <RouterLink :to="{ name: 'register' }">Зареєструватися</RouterLink>
    </template>
  </AuthShell>
</template>
