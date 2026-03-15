<script setup lang="ts">
const isMobileOpen = ref(false)
const route = useRoute()

watch(() => route.path, () => {
  isMobileOpen.value = false
})

const mainNav = [
  { label: 'Übersicht', to: '/', icon: 'i-lucide-home' },
  { label: 'Aufgabe der Woche', to: '/weekly', icon: 'i-lucide-trophy' }
]

const modules = [
  { label: 'Diskrete Mathematik', to: '/modules/diskrete-mathematik', num: '01' },
  { label: 'Analysis Grundlagen', to: '/modules/analysis-grundlagen', num: '02' },
  { label: 'Lineare Algebra', to: '/modules/lineare-algebra', num: '03' },
  { label: 'Fortg. Lineare Algebra', to: '/modules/fortgeschrittene-lineare-algebra', num: '04' },
  { label: 'Optimierungsverfahren', to: '/modules/optimierungsverfahren', num: '05' },
  { label: 'Fortg. Analysis & DGLs', to: '/modules/fortgeschrittene-analysis', num: '06' },
  { label: 'Numerik', to: '/modules/numerik', num: '07' }
]
</script>

<template>
  <UApp>
    <!-- Mobile Top Nav -->
    <header class="lg:hidden flex items-center justify-between px-4 h-14 border-b border-white/10 bg-gray-950 sticky top-0 z-40">
      <NuxtLink
        to="/"
        class="font-semibold text-white text-lg tracking-tight"
      >
        Solvr
      </NuxtLink>
      <div class="flex items-center gap-2">
        <UColorModeButton />
        <UButton
          icon="i-lucide-menu"
          color="neutral"
          variant="ghost"
          @click="isMobileOpen = true"
        />
      </div>
    </header>

    <!-- Mobile Slideover -->
    <USlideover
      v-model:open="isMobileOpen"
      side="left"
      class="lg:hidden"
    >
      <template #content>
        <div class="flex flex-col h-full bg-gray-950 p-4">
          <div class="flex items-center justify-between mb-6">
            <span class="font-semibold text-white text-lg">Solvr</span>
            <UButton
              icon="i-lucide-x"
              color="neutral"
              variant="ghost"
              @click="isMobileOpen = false"
            />
          </div>
          <SidebarContent
            :main-nav="mainNav"
            :modules="modules"
          />
        </div>
      </template>
    </USlideover>

    <div class="flex min-h-screen">
      <!-- Desktop Sidebar -->
      <aside class="hidden lg:flex flex-col w-64 shrink-0 bg-gray-950 border-r border-white/10 sticky top-0 h-screen overflow-y-auto">
        <div class="px-5 py-6 border-b border-white/10">
          <NuxtLink
            to="/"
            class="font-semibold text-white text-xl tracking-tight"
          >
            Solvr
          </NuxtLink>
          <p class="text-xs text-gray-500 mt-1">
            WDS124 Lernplattform
          </p>
        </div>
        <div class="flex-1 overflow-y-auto p-4">
          <SidebarContent
            :main-nav="mainNav"
            :modules="modules"
          />
        </div>
        <div class="p-4 border-t border-white/10 flex items-center justify-between">
          <UColorModeButton />
          <UButton
            to="/auth/login"
            label="Login"
            size="sm"
            color="neutral"
            variant="soft"
          />
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 min-w-0">
        <NuxtPage />
      </main>
    </div>
  </UApp>
</template>
