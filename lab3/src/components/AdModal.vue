<script setup>
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])

const closeButton = ref(null)
let previousOverflow = ''
let lastFocused = null

function close() {
  emit('close')
}

function onKeydown(event) {
  if (event.key === 'Escape') close()
}

watch(
  () => props.open,
  async (open) => {
    if (open) {
      lastFocused = document.activeElement
      previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onKeydown)
      await nextTick()
      closeButton.value?.focus()
      return
    }

    document.body.style.overflow = previousOverflow
    window.removeEventListener('keydown', onKeydown)
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus()
    lastFocused = null
  },
)

onBeforeUnmount(() => {
  document.body.style.overflow = previousOverflow
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="open"
        class="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ad-modal-title"
        aria-describedby="ad-modal-text"
        @click.self="close"
      >
        <div class="modal__panel">
          <button
            ref="closeButton"
            class="modal__close"
            type="button"
            aria-label="Закрити вікно"
            @click="close"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <img class="modal__image" src="/ads/vue-course.svg" alt="" />

          <div class="modal__body">
            <p class="modal__label">Реклама</p>
            <h2 id="ad-modal-title">Курс «Vue.js: від SFC до продакшену»</h2>
            <p id="ad-modal-text" class="modal__text">
              20 практичних занять про компоненти, стилі та анімації. Старт нового потоку — 1
              грудня.
            </p>

            <ul class="modal__list">
              <li>Scoped CSS і CSS Modules на практиці</li>
              <li>Переходи <code>&lt;Transition&gt;</code> у Vue Router</li>
              <li>Фінальний проєкт із code review</li>
            </ul>

            <button class="btn btn--primary modal__action" type="button" @click="close">
              Закрити
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: rgba(8, 11, 18, 0.62);
  backdrop-filter: blur(4px);
}

.modal__panel {
  position: relative;
  width: min(560px, 100%);
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: var(--shadow);
}

.modal__close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 50%;
  background: rgba(10, 14, 22, 0.65);
  color: #ffffff;
  cursor: pointer;
}

.modal__close:hover {
  background: rgba(10, 14, 22, 0.85);
}

.modal__image {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-bottom: 1px solid var(--border);
}

.modal__body {
  padding: 1.4rem 1.5rem 1.5rem;
}

.modal__label {
  color: var(--muted);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.modal__body h2 {
  margin-top: 0.35rem;
  font-size: 1.3rem;
}

.modal__text {
  margin-top: 0.5rem;
  color: var(--muted);
  font-size: 0.92rem;
}

.modal__list {
  margin: 0.75rem 0 0;
  padding-left: 1.1rem;
  color: var(--muted);
  font-size: 0.9rem;
}

.modal__list li + li {
  margin-top: 0.3rem;
}

.modal__list code {
  padding: 0.05em 0.3em;
  border-radius: 3px;
  background: var(--surface-2);
  font-family: var(--mono);
  font-size: 0.9em;
}

.modal__action {
  margin-top: 1.25rem;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.22s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal__panel {
  transition:
    transform 0.24s ease,
    opacity 0.24s ease;
}

.modal-leave-active .modal__panel {
  transition:
    transform 0.18s ease,
    opacity 0.18s ease;
}

.modal-enter-from .modal__panel,
.modal-leave-to .modal__panel {
  opacity: 0;
  transform: translateY(18px) scale(0.97);
}

@media (max-width: 520px) {
  .modal__body {
    padding: 1.1rem 1.1rem 1.25rem;
  }
}
</style>
