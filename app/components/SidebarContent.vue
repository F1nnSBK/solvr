<script setup lang="ts">
defineProps<{
  mainNav: { label: string, to: string, icon: string }[]
  modules: { label: string, to: string, num: string }[]
}>()

const route = useRoute()
const isActive = (to: string) => route.path === to
</script>

<template>
  <div class="flex flex-col gap-6">
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
  </div>
</template>
