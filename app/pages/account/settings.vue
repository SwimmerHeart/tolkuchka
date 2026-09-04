<template>
  <div class="mx-auto w-full max-w-lg space-y-12 py-8">
    <section>
      <h1 class="text-2xl font-bold">Настройки</h1>
      <p class="mt-1 text-sm text-muted">Профиль и безопасность аккаунта</p>
    </section>

    <section class="space-y-6">
      <h2 class="text-lg font-semibold">Профиль</h2>

      <div class="flex items-center gap-4">
        <UAvatar :src="profileState.avatarUrl || undefined" :alt="profileState.name" size="xl" />
        <p class="text-sm text-muted">Аватар подхватит ссылку ниже; пока её нет — инициалы.</p>
      </div>

      <UForm
        :state="profileState"
        :schema="updateProfileSchema"
        class="space-y-4"
        @submit="onProfileSubmit"
      >
        <UFormField name="name" label="Имя">
          <UInput v-model="profileState.name" class="w-full" />
        </UFormField>
        <!-- TODO: URL-поле вместо загрузки файла. Когда появится /api/upload,
      заменить UInput на компонент-аплоадер — он запишет сюда тот же URL -->
        <UFormField name="avatarUrl" label="Ссылка на аватар">
          <UInput v-model="profileState.avatarUrl" placeholder="https://…" class="w-full" />
        </UFormField>

        <UFormField label="Email" description="Смена email пока недоступна">
          <UInput :model-value="MOCK_USER.email" disabled class="w-full" />
        </UFormField>

        <UButton type="submit" :loading="savingProfile" :disabled="!isProfileDirty">
          Сохранить
        </UButton>
      </UForm>
    </section>

    <section class="space-y-4">
      <h2 class="text-lg font-semibold">Смена пароля</h2>

      <UForm
        :state="passwordState"
        :schema="updatePasswordSchema"
        class="space-y-4"
        @submit="onPasswordSubmit"
      >
        <UFormField name="oldPassword" label="Текущий пароль">
          <UInput v-model="passwordState.oldPassword" type="password" class="w-full" />
        </UFormField>
        <UFormField name="newPassword" label="Новый пароль">
          <UInput v-model="passwordState.newPassword" type="password" class="w-full" />
        </UFormField>
        <UFormField name="confirm" label="Повторите новый пароль">
          <UInput v-model="passwordState.confirm" type="password" class="w-full" />
        </UFormField>

        <UButton type="submit" :loading="savingPassword" :disabled="!isPasswordFilled">
          Сохранить
        </UButton>
      </UForm>
    </section>

    <section class="space-y-2">
      <h2 class="text-lg font-semibold">Роль</h2>
      <div class="flex items-center gap-3">
        <UBadge :color="MOCK_USER.role === 'seller' ? 'primary' : 'neutral'">
          {{ MOCK_USER.role === 'seller' ? 'Продавец' : 'Покупатель' }}
        </UBadge>
        <UButton v-if="MOCK_USER.role === 'buyer'" to="/seller" size="sm" variant="subtle">
          Стать продавцом
        </UButton>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import type { FormSubmitEvent } from '@nuxt/ui';
  import {
    updatePasswordSchema,
    updateProfileSchema,
    type UpdatePasswordSchema,
    type UpdateProfileSchema,
  } from '#shared/schemas/user.schema';

  definePageMeta({
    middleware: ['sidebase-auth'],
    auth: true,
  });
  
  useSeoMeta({
    title: 'Настройки аккаунта',
    robots: 'noindex',
  });

  type MockRole = 'buyer' | 'seller';

  const MOCK_USER = {
    name: 'Сергей Петров',
    email: 'sergey@example.com',
    avatarUrl: '',
    role: 'buyer' as MockRole,
  };

  // TODO: убрать при реальном API
  const MOCK_SAVE_DELAY_MS = 800;

  const toast = useToast();

  const profileState = reactive<UpdateProfileSchema>(MOCK_USER);

  const profileSnapshot = ref<UpdateProfileSchema>({ ...profileState });
  const isProfileDirty = computed(
    () =>
      profileState.name !== profileSnapshot.value.name ||
      profileState.avatarUrl !== profileSnapshot.value.avatarUrl,
  );
  const savingProfile = ref(false);

  async function onProfileSubmit(event: FormSubmitEvent<UpdateProfileSchema>) {
    savingProfile.value = true;
    // TODO: убрать при замене на реальную реализацию + добавить обработку ошибок
    await new Promise((resolve) => setTimeout(resolve, MOCK_SAVE_DELAY_MS));
    console.warn('PATCH /api/user (заглушка):', event.data);
    toast.add({
      title: 'Успешно',
      description: 'Данные сохранены',
      color: 'success',
    });
    profileSnapshot.value = { ...profileState };
    savingProfile.value = false;
  }

  const passwordState = reactive<UpdatePasswordSchema>({
    oldPassword: '',
    newPassword: '',
    confirm: '',
  });

  const isPasswordFilled = computed(
    () => passwordState.oldPassword && passwordState.newPassword && passwordState.confirm,
  );
  const savingPassword = ref(false);

  async function onPasswordSubmit(event: FormSubmitEvent<UpdatePasswordSchema>) {
    savingPassword.value = true;
    // TODO: убрать при замене на реальную реализацию + добавить обработку ошибок
    await new Promise((resolve) => setTimeout(resolve, MOCK_SAVE_DELAY_MS));
    console.warn('POST /api/user/password (заглушка):', event.data);
    toast.add({
      title: 'Успешно',
      description: 'Пароль изменен',
      color: 'success',
    });
    Object.assign(passwordState, { oldPassword: '', newPassword: '', confirm: '' });
    savingPassword.value = false;
  }
</script>
