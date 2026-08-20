<template>
  <div class="py-12 sm:py-16">
    <div class="mx-auto w-full max-w-md">
      <div class="mb-8 text-center">
        <h1 class="text-2xl font-bold">Создайте аккаунт</h1>
        <p class="mt-2 text-sm text-muted">Бесплатно, займёт минуту</p>
      </div>

      <UCard>
        <UForm :state="state" class="space-y-6">
          <UFormGroup label="Как вас зовут?" name="name">
            <UInput v-model="state.name" placeholder="Иван Иванов" autocomplete="name" />
          </UFormGroup>

          <UFormGroup label="Email" name="email">
            <UInput
              v-model="state.email"
              type="email"
              placeholder="you@example.com"
              autocomplete="email"
            />
          </UFormGroup>

          <UFormGroup label="Пароль" name="password">
            <UInput
              v-model="state.password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="new-password"
            >
              <template #trailing>
                <UButton
                  :icon="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                  color="neutral"
                  variant="ghost"
                  size="xs"
                  aria-label="Показать пароль"
                  @click="showPassword = !showPassword"
                />
              </template>
            </UInput>
          </UFormGroup>

          <UFormGroup label="Подтвердите пароль" name="confirm">
            <UInput
              v-model="state.confirm"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="new-password"
            />
          </UFormGroup>

          <UFormGroup label="Я регистрируюсь как">
            <URadioGroup v-model="state.role" :items="roleItems" class="w-full" />
            <p v-if="isSeller" class="mt-2 text-sm text-muted">
              Вы сможете размещать товары и управлять магазином. Ваши данные
              защищены, без скрытых комиссий.
            </p>
          </UFormGroup>

          <div class="space-y-3">
            <UButton type="submit" color="primary" variant="solid" size="lg" block>
              {{ ctaLabel }}
            </UButton>
            <p class="text-center text-xs text-dimmed">
              Регистрация бесплатна. Ваши данные защищены.
            </p>
          </div>
        </UForm>
      </UCard>

      <p class="mt-6 text-center text-sm text-muted">
        Уже есть аккаунт?
        <ULink to="/auth/login" class="font-medium text-primary">
          Войти
        </ULink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute()

  const state = reactive({
    name: '',
    email: '',
    password: '',
    confirm: '',
    role: route.query.role === 'seller' ? 'seller' : 'buyer',
  })

  const showPassword = ref(false)
  const isSeller = computed(() => state.role === 'seller')

  const ctaLabel = computed(() => (isSeller.value ? 'Стать продавцом' : 'Создать аккаунт'))

  const roleItems = [
    { label: 'Покупатель', value: 'buyer' },
    { label: 'Продавец', value: 'seller' },
  ]
</script>
