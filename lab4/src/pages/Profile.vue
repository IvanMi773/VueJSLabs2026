<script setup>
import { onBeforeUnmount, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useSettingsStore } from '@/stores/settings'

const { t } = useI18n()
const settings = useSettingsStore()

const form = reactive({
  name: settings.profile.name,
  email: settings.profile.email,
  password: '',
  phone: settings.profile.phone,
})

const errors = reactive({
  name: '',
  email: '',
  password: '',
  phone: '',
})

const toast = ref('')
let toastTimer = null

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const phonePattern = /^(?:\+?380|0)\d{9}$/

function clearError(field) {
  errors[field] = ''
}

function validate() {
  const name = form.name.trim()
  const email = form.email.trim()
  const phone = form.phone.replace(/[\s()-]/g, '')

  if (!name) {
    errors.name = 'profile.errors.nameRequired'
  } else if (name.length < 2) {
    errors.name = 'profile.errors.nameShort'
  } else {
    errors.name = ''
  }

  if (!email) {
    errors.email = 'profile.errors.emailRequired'
  } else if (!emailPattern.test(email)) {
    errors.email = 'profile.errors.emailInvalid'
  } else {
    errors.email = ''
  }

  if (!form.password) {
    errors.password = 'profile.errors.passwordRequired'
  } else if (form.password.length < 8) {
    errors.password = 'profile.errors.passwordShort'
  } else {
    errors.password = ''
  }

  if (!phone) {
    errors.phone = 'profile.errors.phoneRequired'
  } else if (!phonePattern.test(phone)) {
    errors.phone = 'profile.errors.phoneInvalid'
  } else {
    errors.phone = ''
  }

  return !errors.name && !errors.email && !errors.password && !errors.phone
}

function showToast(messageKey) {
  toast.value = messageKey
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toast.value = ''
    toastTimer = null
  }, 3500)
}

function submit() {
  if (!validate()) return

  settings.saveProfile({
    name: form.name.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
  })
  form.password = ''
  errors.password = ''
  showToast('profile.saved')
}

onBeforeUnmount(() => {
  if (toastTimer) clearTimeout(toastTimer)
})
</script>

<template>
  <section class="profile" aria-labelledby="profile-title">
    <header class="profile__head">
      <h2 id="profile-title">{{ t('profile.title') }}</h2>
      <p class="profile__subtitle">{{ t('profile.subtitle') }}</p>
    </header>

    <form class="profile-card" novalidate @submit.prevent="submit">
      <div class="profile-card__grid">
        <div class="field">
          <label for="profile-name">{{ t('profile.name') }}</label>
          <input
            id="profile-name"
            v-model="form.name"
            type="text"
            autocomplete="name"
            :placeholder="t('profile.namePlaceholder')"
            :aria-invalid="Boolean(errors.name)"
            :aria-describedby="errors.name ? 'profile-name-error' : undefined"
            @input="clearError('name')"
          />
          <p v-if="errors.name" id="profile-name-error" class="form-error" role="alert">
            {{ t(errors.name) }}
          </p>
        </div>

        <div class="field">
          <label for="profile-email">{{ t('profile.email') }}</label>
          <input
            id="profile-email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            :placeholder="t('profile.emailPlaceholder')"
            :aria-invalid="Boolean(errors.email)"
            :aria-describedby="errors.email ? 'profile-email-error' : undefined"
            @input="clearError('email')"
          />
          <p v-if="errors.email" id="profile-email-error" class="form-error" role="alert">
            {{ t(errors.email) }}
          </p>
        </div>

        <div class="field">
          <label for="profile-phone">{{ t('profile.phone') }}</label>
          <input
            id="profile-phone"
            v-model="form.phone"
            type="tel"
            autocomplete="tel"
            :placeholder="t('profile.phonePlaceholder')"
            :aria-invalid="Boolean(errors.phone)"
            :aria-describedby="errors.phone ? 'profile-phone-error' : undefined"
            @input="clearError('phone')"
          />
          <p v-if="errors.phone" id="profile-phone-error" class="form-error" role="alert">
            {{ t(errors.phone) }}
          </p>
        </div>

        <div class="field">
          <label for="profile-password">{{ t('profile.password') }}</label>
          <input
            id="profile-password"
            v-model="form.password"
            type="password"
            autocomplete="new-password"
            :placeholder="t('profile.passwordPlaceholder')"
            :aria-invalid="Boolean(errors.password)"
            :aria-describedby="errors.password ? 'profile-password-error' : undefined"
            @input="clearError('password')"
          />
          <p v-if="errors.password" id="profile-password-error" class="form-error" role="alert">
            {{ t(errors.password) }}
          </p>
        </div>
      </div>

      <p class="hint">{{ t('profile.passwordHint') }}</p>

      <div class="profile-card__actions">
        <p class="hint">{{ t('profile.storageHint') }}</p>
        <button class="btn btn--primary" type="submit">{{ t('profile.submit') }}</button>
      </div>
    </form>

    <Transition name="toast">
      <p v-if="toast" class="toast" role="status">{{ t(toast) }}</p>
    </Transition>
  </section>
</template>

<style scoped>
.profile {
  margin-top: 1.75rem;
}

.profile__head {
  margin-bottom: 1.25rem;
}

.profile__head h2 {
  font-size: 1.35rem;
}

.profile__subtitle {
  max-width: 60ch;
  margin-top: 0.25rem;
  color: var(--muted);
  font-size: 0.9rem;
}

.profile-card {
  display: grid;
  gap: 1rem;
  max-width: 760px;
  padding: 1.25rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.profile-card__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.profile-card__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

.profile-card__actions .hint {
  max-width: 40ch;
}

.toast {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  z-index: 10;
  padding: 0.75rem 1rem;
  border: 1px solid #b9e0c9;
  border-left: 4px solid var(--success);
  border-radius: var(--radius);
  background: #f1fbf5;
  color: #14532d;
  font-size: 0.9rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.toast-enter-active,
.toast-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 640px) {
  .profile-card__grid {
    grid-template-columns: 1fr;
  }

  .toast {
    right: 0.75rem;
    bottom: 0.75rem;
    left: 0.75rem;
  }
}
</style>
