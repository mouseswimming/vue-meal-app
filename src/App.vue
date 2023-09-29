<script setup lang="ts">
import TheNav from './components/TheNav.vue'
</script>

<template>
  <TheNav />
  <div class="max-w-7xl m-auto">
    <!-- <router-view :key="$route.fullPath" /> -->
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" :key="$route.fullPath" />
      </keep-alive>
    </router-view>
  </div>
</template>

<style scoped></style>
