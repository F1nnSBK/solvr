<script setup lang="ts">
definePageMeta({ layout: false })
const router = useRouter()

onMounted(async () => {
  await router.push('/')
})
</script>

<template>
  <UApp>
    <div class="min-h-screen bg-gray-950 flex items-center justify-center">
      <div class="text-center">
        <UIcon
          name="i-lucide-loader-circle"
          class="w-8 h-8 text-gray-400 mx-auto animate-spin"
        />
        <p class="text-gray-400 mt-3 text-sm">
          Anmeldung wird bestätigt…
        </p>
      </div>
    </div>
  </UApp>
</template>
