<script setup lang="ts">
import { useAuth } from '#imports'

defineProps<{
  mainNav: { label: string, to: string, icon: string }[]
  modules: { label: string, to: string, num: string }[]
}>()

const route = useRoute()
const { isLoggedIn, displayName, avatarLabel, logout } = useAuth()

const isActive = (to: string) => route.path === to
</script>

<template>
  <div class="flex flex-col gap-6 h-full">
    <div class="flex flex-col gap-1">
      <NuxtLink
        v-for="item in mainNav"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors"
        :class="isActive(item.to)
          ? 'bg-white/10 text-white font-medium'
          : 'text-gray-400 hover:text-white hover:bg-white/5'"
      >
        <UIcon
          :name="item.icon"
          class="w-4 h-4 shrink-0"
        />
        {{ item.label }}
      </NuxtLink>
    </div>

    <div>
      <p class="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 mb-2">
        Module
      </p>
      <div class="flex flex-col gap-1">
        <NuxtLink
          v-for="mod in modules"
          :key="mod.to"
          :to="mod.to"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors"
          :class="route.path.startsWith(mod.to)
            ? 'bg-white/10 text-white font-medium'
            : 'text-gray-400 hover:text-white hover:bg-white/5'"
        >
          <span class="text-xs font-mono text-gray-600 w-5 shrink-0">{{ mod.num }}</span>
          {{ mod.label }}
        </NuxtLink>
      </div>
    </div>

    <!-- User Section -->
    <div class="mt-auto pt-4 border-t border-white/10">
      <div
        v-if="isLoggedIn"
        class="flex items-center gap-3 px-3"
      >
        <div class="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-medium text-white shrink-0">
          {{ avatarLabel }}
        </div>
        <span class="text-sm text-gray-300 truncate flex-1">{{ displayName }}</span>
        <UButton
          icon="i-lucide-log-out"
          size="xs"
          color="neutral"
          variant="ghost"
          aria-label="Logout"
          @click="logout"
        />
      </div>
      <NuxtLink
        v-else
        to="/auth/login"
        class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
      >
        <UIcon
          name="i-lucide-log-in"
          class="w-4 h-4 shrink-0"
        />
        Anmelden
      </NuxtLink>
    </div>
  </div>
</template>
