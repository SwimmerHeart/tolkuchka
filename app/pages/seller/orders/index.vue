<template>
  <div>
    <h1 class="text-2xl font-bold">Заказы</h1>
    <p class="mt-2 text-sm text-muted">Заглушка seller/orders</p>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'dashboard',
    middleware: ['seller'],
  });
</script>
