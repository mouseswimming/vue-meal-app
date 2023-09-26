<script setup lang="ts">
import TheNav from './components/TheNav.vue'
</script>

<template>
  <TheNav />
  <div class="max-w-7xl m-auto">
    <router-view :key="$route.fullPath" />
  </div>
</template>

<style scoped></style>
