<template>
  <UDashboardGroup>
    <UDashboardSidebar collapsible>
      <template #header="{ collapsed }">
        <ULink to="/" class="flex items-center gap-2 text-lg font-bold">
          <UIcon name="i-heroicons-shopping-bag" class="text-primary" />
          <span v-if="!collapsed">Толкучка</span>
        </ULink>
      </template>

      <UNavigationMenu orientation="vertical" :items="items" />

      <template #footer="{ collapsed }">
        <UButton
          to="/"
          icon="i-heroicons-arrow-left"
          color="neutral"
          variant="ghost"
          class="w-full"
          :class="!collapsed ? 'justify-start' : 'justify-center'"
        >
          <span v-if="!collapsed">На витрину</span>
        </UButton>
      </template>
    </UDashboardSidebar>

    <UDashboardPanel>
      <template #header>
        <UDashboardNavbar>
          <template #leading>
            <UDashboardSidebarCollapse />
          </template>
          <template #right>
            <ThemeToggle />
          </template>
        </UDashboardNavbar>
      </template>

      <template #body>
        <slot />
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>

<script setup lang="ts">
  const items = [
    { label: 'Дашборд', icon: 'i-heroicons-chart-bar', to: '/seller/dashboard' },
    { label: 'Товары', icon: 'i-heroicons-cube', to: '/seller/products' },
    { label: 'Заказы', icon: 'i-heroicons-receipt-percent', to: '/seller/orders' },
  ];
</script>
