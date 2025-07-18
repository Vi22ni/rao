<script setup lang="ts">
import Header from './components/Header.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <Header />

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
</style>
