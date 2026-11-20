<script setup>
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthShell from '@/components/auth/AuthShell.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import { authKey } from '@/keys'

const { register } = inject(authKey)
const router = useRouter()

const submitting = ref(false)

async function handleSubmit(payload) {
  submitting.value = true
  await new Promise((resolve) => setTimeout(resolve, 300))
  register(payload)
  submitting.value = false
  router.push({ name: 'dashboard' })
}
</script>

<template>
  <AuthShell title="Реєстрація">
    <RegisterForm :submitting="submitting" @submit="handleSubmit" />

    <template #footer>
      Уже маєте акаунт?
      <RouterLink :to="{ name: 'login' }">Увійти</RouterLink>
    </template>
  </AuthShell>
</template>
