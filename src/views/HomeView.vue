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
  <CategoryGrids />
  <MealsGrid :meals="randomMeals" title="Popular Meals" />
</template>
