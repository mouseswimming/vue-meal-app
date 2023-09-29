<script lang="ts" setup>
import { useAreaStore } from '@/stores/areaSore'
import { computed, onMounted } from 'vue'

const areaStore = useAreaStore()

const areas = computed(() => {
  return areaStore.areas
})

onMounted(() => {
  areaStore.getAreaList()
})
</script>

<template>
  <main>
    <h1 class="text-4xl font-bold mb-12">Areas A-Z</h1>

    <section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-4">
      <router-link
        v-for="(area, index) in areas"
        :key="index"
        :to="{ name: 'byArea', params: { area: area.strArea } }"
        class="pt-4 border-t border-gray-400"
      >
        <span>{{ area.strArea }}</span>
      </router-link>
    </section>
  </main>
</template>
