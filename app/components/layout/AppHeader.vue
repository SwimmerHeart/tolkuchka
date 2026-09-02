<template>
  <UHeader
    title="Толкучка"
    to="/"
    :toggle="false"
    :ui="{
      left: 'lg:flex-none',
      right: 'lg:flex-none',
      center: 'flex-1',
    }"
  >
    <template #left>
      <div class="flex items-center gap-2">
        <ULink to="/" class="flex items-center gap-2 text-lg font-bold">
          <UIcon name="i-heroicons-shopping-bag" class="text-primary" />
          <span>Толкучка</span>
        </ULink>
        <UDropdownMenu :items="categoryItems">
          <UButton color="neutral" variant="soft">
            <span class="inline-flex items-center gap-1.5">
              <UIcon name="i-heroicons-squares-2x2" />
              <span class="hidden sm:inline">Каталог</span>
              <UIcon name="i-heroicons-chevron-down-16" class="hidden sm:inline" />
            </span>
          </UButton>
        </UDropdownMenu>
      </div>
    </template>

    <div class="flex min-w-0 flex-1 items-center justify-center px-4">
      <AppSearch />
    </div>

    <template #right>
      <div class="flex items-center gap-2">
        <UButton to="/auth/login" color="neutral" variant="ghost" size="sm">
          <span class="hidden sm:inline">Войти</span>
          <UIcon name="i-heroicons-user" class="sm:hidden" />
        </UButton>
        <UButton to="/seller" color="primary" variant="solid" size="sm" class="hidden sm:inline-flex">
          Стать продавцом
        </UButton>
        <ThemeToggle />
      </div>
    </template>

    <template #bottom>
      <div class="border-t border-default px-4 py-2 sm:px-6 lg:hidden">
        <div class="flex items-center gap-2">
          <AppSearch />
        </div>
      </div>
    </template>
  </UHeader>
</template>

<script setup lang="ts">
  const store = useProductStore();

  const categoryItems = computed(() =>
    store.categories.map((c) => ({ label: c.name, to: `/categories/${c.slug}` })),
  );

  if (!store.loaded) await store.fetch();
</script>
