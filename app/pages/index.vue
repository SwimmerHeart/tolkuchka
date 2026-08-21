<script setup lang="ts">
  const nav = {
    products: '/products',
    seller: '/seller',
  };
</script>

<template>
  <div class="py-16 sm:py-24">
    <div class="mx-auto max-w-2xl text-center">
      <UBadge color="primary" variant="subtle" class="mb-6"> Препросмотр каркаса </UBadge>
      <h1 class="text-3xl font-bold sm:text-4xl">Толкучка</h1>
      <p class="mt-4 text-lg text-muted">
        Учебная площадка на Nuxt 4. Сейчас доступна страница регистрации — остальные в
        проектировании.
      </p>
      <div class="mt-8 flex items-center justify-center gap-3">
        <UButton to="/auth/register" color="primary" variant="solid" size="lg">
          Регистрация
        </UButton>
        <UButton to="/auth/login" color="neutral" variant="outline" size="lg"> Вход </UButton>
      </div>
      <div class="mt-4">
        <UButton to="/palettes" color="neutral" variant="ghost" size="sm">
          Смотреть варианты палитры
        </UButton>
      </div>
      <p class="mt-8 text-sm text-dimmed">
        Маршруты: {{ nav.products }}, {{ nav.seller }} — появятся после реализации каркасов.
      </p>
    </div>
  </div>
</template>
