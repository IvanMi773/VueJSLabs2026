const formatter = new Intl.DateTimeFormat('uk-UA', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

export function formatDate(isoString) {
  const date = new Date(isoString)
  return Number.isNaN(date.getTime()) ? '—' : formatter.format(date)
}
