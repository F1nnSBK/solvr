<script setup lang="ts">
definePageMeta({ layout: false })

const supabase = useSupabaseClient()
const email = ref('')
const loading = ref(false)
const sent = ref(false)
const error = ref('')

async function login() {
  loading.value = true
  error.value = ''
  const { error: err } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: { emailRedirectTo: `${window.location.origin}/auth/confirm` }
  })
  if (err) error.value = err.message
  else sent.value = true
  loading.value = false
}
</script>

<template>
  <UApp>
    <div class="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div class="w-full max-w-sm">
        <div class="mb-8 text-center">
          <NuxtLink
            to="/"
            class="text-2xl font-semibold text-white tracking-tight"
          >Solvr</NuxtLink>
          <p class="text-gray-400 text-sm mt-2">
            Anmelden mit Magic Link
          </p>
        </div>

        <div
          v-if="sent"
          class="text-center p-6 rounded-xl border border-white/10 bg-white/5"
        >
          <UIcon
            name="i-lucide-mail-check"
            class="w-8 h-8 text-green-400 mx-auto mb-3"
          />
          <p class="text-white font-medium">
            Check deine E-Mails
          </p>
          <p class="text-gray-400 text-sm mt-1">
            Wir haben dir einen Login-Link geschickt.
          </p>
        </div>

        <form
          v-else
          class="flex flex-col gap-4"
          @submit.prevent="login"
        >
          <UFormField
            label="E-Mail"
            name="email"
          >
            <UInput
              v-model="email"
              type="email"
              placeholder="deine@email.de"
              required
              class="w-full"
            />
          </UFormField>
          <p
            v-if="error"
            class="text-red-400 text-sm"
          >
            {{ error }}
          </p>
          <UButton
            type="submit"
            label="Magic Link senden"
            :loading="loading"
            class="w-full justify-center"
          />
        </form>
      </div>
    </div>
  </UApp>
</template>
