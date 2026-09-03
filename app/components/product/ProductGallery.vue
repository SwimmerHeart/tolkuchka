<template>
  <div>
    <div class="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800/60">
      <img
        v-if="currentImage"
        :src="currentImage"
        :alt="alt"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <UIcon
        v-else
        name="i-heroicons-photo"
        class="absolute inset-0 m-auto h-10 w-10 text-primary/30"
      />
    </div>

    <div v-if="images.length > 1" class="mt-3 flex flex-wrap justify-center gap-2">
      <button
        v-for="(img, index) in images"
        :key="index"
        type="button"
        class="relative aspect-[3/4] w-10 overflow-hidden rounded-md border-2 bg-gray-100 transition sm:w-14 md:w-20 dark:bg-gray-800/60"
        :class="index === active ? 'border-primary' : 'border-transparent'"
        @click="active = index"
      >
        <img :src="img" :alt="`${alt} — фото ${index + 1}`" class="absolute inset-0 h-full w-full object-cover" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{ images: string[]; alt: string }>();

  const active = ref(0);

  const currentImage = computed(() => props.images[active.value] || undefined);
</script>