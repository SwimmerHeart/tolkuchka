<template>
  <UButton
    :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
    color="neutral"
    variant="ghost"
    size="sm"
    aria-label="Переключить тему"
    @click="toggleTheme"
  />
</template>

<script setup lang="ts">
  const colorMode = useColorMode();

  const isDark = computed(() => colorMode.value === 'dark');

  function toggleTheme() {
    colorMode.preference = isDark.value ? 'light' : 'dark';
  }
</script>