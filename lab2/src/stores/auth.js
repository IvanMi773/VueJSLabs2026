import { computed, reactive, watch } from 'vue'
import { users } from '@/data/users'

const SESSION_KEY = 'vuejs-labs-2026:lab2:session'

function loadUser() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed.email === 'string' && typeof parsed.name === 'string'
      ? parsed
      : null
  } catch {
    return null
  }
}

const state = reactive({
  user: loadUser(),
})

watch(
  () => state.user,
  (user) => {
    if (user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(SESSION_KEY)
    }
  },
  { deep: true },
)

const isAuthenticated = computed(() => state.user !== null)

function login({ email }) {
  const knownUser = users.find((user) => user.email.toLowerCase() === email.toLowerCase())

  state.user = {
    name: knownUser ? knownUser.name : email.split('@')[0],
    email,
    role: knownUser ? knownUser.role : 'Користувач',
    loggedInAt: new Date().toISOString(),
  }
}

function register({ name, email }) {
  state.user = {
    name,
    email,
    role: 'Користувач',
    loggedInAt: new Date().toISOString(),
  }
}

function logout() {
  state.user = null
}

export const auth = {
  state,
  isAuthenticated,
  login,
  register,
  logout,
}
