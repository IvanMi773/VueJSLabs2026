const shortFormatter = new Intl.DateTimeFormat('uk-UA', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

const longFormatter = new Intl.DateTimeFormat('uk-UA', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

function toDate(isoString) {
  const date = new Date(isoString)
  return Number.isNaN(date.getTime()) ? null : date
}

export function formatDate(isoString) {
  const date = toDate(isoString)
  return date ? shortFormatter.format(date) : '—'
}

export function formatLongDate(isoString) {
  const date = toDate(isoString)
  return date ? longFormatter.format(date) : '—'
}
