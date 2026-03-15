<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'de' }
})

useSeoMeta({
  title: 'Solvr',
  description: 'Lernplattform für WDS124 – Lösungen teilen, gemeinsam verstehen.',
  ogTitle: 'Solvr',
  ogDescription: 'Lernplattform für WDS124 – Lösungen teilen, gemeinsam verstehen.'
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
