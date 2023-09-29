<script lang="ts" setup>
import { useMealStore } from '@/stores/mealStore'
import type { Meal } from '@/types/Meal'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import MealsGrid from '@/components/MealsGrid.vue'

const mealStore = useMealStore()
const route = useRoute()
const catName = route.params.catName.toString()
const mealsInCategory = ref(new Array<Meal>())

onMounted(async () => {
  mealsInCategory.value = await mealStore.getMealByCategory(catName)
})
</script>

<template>
  <main>
    <h1 class="text-4xl font-bold mb-8">Meals in {{ $route.params.catName }}</h1>
    <MealsGrid :meals="mealsInCategory" />
  </main>
</template>
