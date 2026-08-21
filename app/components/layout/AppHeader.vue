<template>
  <UHeader title="Толкучка" to="/" :toggle="false">
    <template #left>
      <ULink to="/" class="flex items-center gap-2 text-lg font-bold">
        <UIcon name="i-heroicons-shopping-bag" class="text-primary" />
        <span>Толкучка</span>
      </ULink>
    </template>
    <template #right>
      <div class="flex items-center gap-2">
        <UButton to="/seller" color="primary" variant="solid" size="sm"> Стать продавцом </UButton>
        <UButton
          :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
          color="neutral"
          variant="ghost"
          size="sm"
          aria-label="Переключить тему"
          @click="toggleTheme"
        />
      </div>
    </template>
  </UHeader>
</template>

<script setup lang="ts">
  const colorMode = useColorMode();

  const isDark = computed(() => colorMode.value === 'dark');

  function toggleTheme() {
    colorMode.preference = isDark.value ? 'light' : 'dark';
  }
</script>
