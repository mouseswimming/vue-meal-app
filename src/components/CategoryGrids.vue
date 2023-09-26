<script lang="ts" setup>
import { useCategoryStore } from '@/stores/categoryStore'

import { computed, onMounted } from 'vue'

const categoryStore = useCategoryStore()
const categories = computed(() => {
  return categoryStore.categories
})

onMounted(() => {
  categoryStore.getCategoryList()
})
</script>

<template>
  <section class="p-4 my-2">
    <h2 class="section-title">Meals by Categories</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-6">
      <div v-for="category in categories" :key="category.idCategory">
        <img
          :src="category.strCategoryThumb"
          :alt="category.strCategory"
          class="w-full object-cover aspect-square rounded-full border-4 border-white hover:scale-105 shadow-sm hover:shadow-lg transition-all"
        />
        <p class="text-center py-2">{{ category.strCategory }}</p>
      </div>
    </div>
  </section>
</template>
