<template>
  <div class="p-8 max-w-4xl">
    <div class="mb-8">
      <h1 class="text-3xl font-semibold text-white mb-2">
        Willkommen bei Solvr
      </h1>
      <p class="text-gray-400">
        Deine Lernplattform für WDS124 – Lösungen teilen, gemeinsam verstehen.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink
        v-for="mod in modules"
        :key="mod.to"
        :to="mod.to"
        class="group p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all"
      >
        <div class="text-xs font-mono text-gray-500 mb-2">{{ mod.num }}</div>
        <div class="text-white font-medium text-sm leading-snug">{{ mod.label }}</div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
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
