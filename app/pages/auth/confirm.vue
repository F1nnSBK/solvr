<script setup lang="ts">
definePageMeta({ layout: false })

// @nuxtjs/supabase handled the token exchange automatically.
// This page is just shown briefly during the redirect.
const user = useSupabaseUser()
const router = useRouter()

watchEffect(() => {
  if (user.value) {
    router.push('/')
  }
})
</script>

<template>
  <UApp>
    <div class="min-h-screen bg-gray-950 flex items-center justify-center">
      <div class="text-center">
        <UIcon
          name="i-lucide-loader-circle"
          class="w-8 h-8 text-gray-400 mx-auto animate-spin mb-3"
        />
        <p class="text-gray-400 text-sm">
          Anmeldung wird bestätigt…
        </p>
      </div>
    </div>
  </UApp>
</template>
