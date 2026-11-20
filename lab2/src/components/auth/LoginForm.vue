<script setup>
import { reactive } from 'vue'
import BaseInput from '@/components/BaseInput.vue'

defineProps({
  submitting: { type: Boolean, default: false },
})

const emit = defineEmits(['submit'])

const form = reactive({
  email: '',
  password: '',
})

const errors = reactive({
  email: '',
  password: '',
})

function validate() {
  const email = form.email.trim()

  errors.email = !email
    ? 'Введіть email.'
    : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? ''
      : 'Email має бути у форматі name@example.com.'
  errors.password = form.password.length < 6 ? 'Пароль має містити щонайменше 6 символів.' : ''

  return !errors.email && !errors.password
}

function submit() {
  if (!validate()) return

  emit('submit', {
    email: form.email.trim(),
    password: form.password,
  })
}
</script>

<template>
  <form class="auth-form" novalidate @submit.prevent="submit">
    <BaseInput
      id="login-email"
      v-model="form.email"
      label="Email"
      type="email"
      placeholder="name@example.com"
      autocomplete="email"
      :error="errors.email"
    />

    <BaseInput
      id="login-password"
      v-model="form.password"
      label="Пароль"
      type="password"
      autocomplete="current-password"
      :error="errors.password"
    />

    <button class="btn btn--primary" type="submit" :disabled="submitting">
      {{ submitting ? 'Входимо…' : 'Увійти' }}
    </button>
  </form>
</template>

<style scoped>
.auth-form {
  display: grid;
  gap: 0.8rem;
}
</style>
