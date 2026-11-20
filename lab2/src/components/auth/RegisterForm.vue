<script setup>
import { reactive } from 'vue'
import BaseInput from '@/components/BaseInput.vue'

defineProps({
  submitting: { type: Boolean, default: false },
})

const emit = defineEmits(['submit'])

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const errors = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

function validate() {
  const name = form.name.trim()
  const email = form.email.trim()

  errors.name = name.length < 2 ? 'Введіть ім’я (щонайменше 2 символи).' : ''
  errors.email = !email
    ? 'Введіть email.'
    : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? ''
      : 'Email має бути у форматі name@example.com.'
  errors.password = form.password.length < 6 ? 'Пароль має містити щонайменше 6 символів.' : ''
  errors.confirmPassword = form.confirmPassword !== form.password ? 'Паролі не збігаються.' : ''

  return !errors.name && !errors.email && !errors.password && !errors.confirmPassword
}

function submit() {
  if (!validate()) return

  emit('submit', {
    name: form.name.trim(),
    email: form.email.trim(),
    password: form.password,
  })
}
</script>

<template>
  <form class="auth-form" novalidate @submit.prevent="submit">
    <BaseInput
      id="register-name"
      v-model="form.name"
      label="Ім’я"
      placeholder="Олена Ковальчук"
      autocomplete="name"
      :error="errors.name"
    />

    <BaseInput
      id="register-email"
      v-model="form.email"
      label="Email"
      type="email"
      placeholder="name@example.com"
      autocomplete="email"
      :error="errors.email"
    />

    <BaseInput
      id="register-password"
      v-model="form.password"
      label="Пароль"
      type="password"
      autocomplete="new-password"
      :error="errors.password"
    />

    <BaseInput
      id="register-confirm-password"
      v-model="form.confirmPassword"
      label="Підтвердження пароля"
      type="password"
      autocomplete="new-password"
      :error="errors.confirmPassword"
    />

    <button class="btn btn--primary" type="submit" :disabled="submitting">
      {{ submitting ? 'Створюємо акаунт…' : 'Зареєструватися' }}
    </button>
  </form>
</template>

<style scoped>
.auth-form {
  display: grid;
  gap: 0.8rem;
}
</style>
