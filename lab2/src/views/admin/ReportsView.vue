<script setup>
import { computed } from 'vue'

const reports = [
  { month: 'Липень', newUsers: 12, activeSessions: 46, requests: 1480 },
  { month: 'Серпень', newUsers: 18, activeSessions: 52, requests: 1735 },
  { month: 'Вересень', newUsers: 24, activeSessions: 61, requests: 2104 },
  { month: 'Жовтень', newUsers: 16, activeSessions: 58, requests: 1962 },
  { month: 'Листопад', newUsers: 21, activeSessions: 64, requests: 2218 },
]

const totals = computed(() =>
  reports.reduce(
    (acc, report) => ({
      newUsers: acc.newUsers + report.newUsers,
      activeSessions: acc.activeSessions + report.activeSessions,
      requests: acc.requests + report.requests,
    }),
    { newUsers: 0, activeSessions: 0, requests: 0 },
  ),
)
</script>

<template>
  <section>
    <h1>Звіти</h1>
    <p class="page-lead">Демонстраційні агреговані показники за останні п’ять місяців.</p>

    <div class="table-wrap reports__table">
      <table class="table">
        <thead>
          <tr>
            <th>Місяць</th>
            <th>Нові користувачі</th>
            <th>Активні сесії</th>
            <th>Запити</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="report in reports" :key="report.month">
            <td>{{ report.month }}</td>
            <td>{{ report.newUsers }}</td>
            <td>{{ report.activeSessions }}</td>
            <td>{{ report.requests }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>Разом</th>
            <th>{{ totals.newUsers }}</th>
            <th>{{ totals.activeSessions }}</th>
            <th>{{ totals.requests }}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  </section>
</template>

<style scoped>
h1 {
  font-size: 1.5rem;
}

.reports__table {
  margin-top: 1.25rem;
}

.reports__table tfoot th {
  background: var(--surface);
  border-bottom: 0;
  border-top: 1px solid var(--border);
  color: var(--text);
}
</style>
