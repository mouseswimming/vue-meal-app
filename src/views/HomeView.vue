<script lang="ts" setup>
import { useMealStore } from '@/stores/mealStore'
import { computed, onMounted } from 'vue'
import CategoryGrids from '@/components/CategoryGrids.vue'
import MealsGrid from '@/components/MealsGrid.vue'

const mealStore = useMealStore()
onMounted(() => {
  mealStore.getRandomMeals()
})
const randomMeals = computed(() => {
  return mealStore.randomMeals
})
</script>

<template>
  <main>
    <CategoryGrids />
    <div class="p-4 my-2">
      <MealsGrid :meals="randomMeals" title="Popular Meals" />
    </div>
  </main>
</template>
