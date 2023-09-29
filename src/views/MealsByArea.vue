<script lang="ts" setup>
import { useMealStore } from '@/stores/mealStore'

import type { Meal } from '@/types/Meal'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import MealsGrid from '@/components/MealsGrid.vue'

const mealStore = useMealStore()
const route = useRoute()
const area = route.params.area.toString()
const meals = ref(new Array<Meal>())

onMounted(async () => {
  meals.value = await mealStore.getMealByArea(area)
})
</script>

<template>
  <main>
    <h1 class="text-4xl font-bold mb-8">Meals popular in {{ $route.params.area }}</h1>

    <MealsGrid v-if="meals.length > 0" :meals="meals" />
  </main>
</template>
