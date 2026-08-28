<template>
  <div>
    <h1 class="text-2xl font-bold">Дашборд</h1>
    <p class="mt-2 text-sm text-muted">Заглушка seller/dashboard</p>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'dashboard',
    auth: true,
  });
</script>
