<script lang="ts" setup>
import { useMealStore } from '@/stores/mealStore'
import { useIngredientStore } from '@/stores/ingredientStore'
import type { Meal } from '@/types/Meal'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import MealsGrid from '@/components/MealsGrid.vue'

const mealStore = useMealStore()
const ingredientStore = useIngredientStore()
const route = useRoute()
const ingredient = route.params.ingredient.toString()
const meals = ref(new Array<Meal>())
const ingredientDescription = ref('')

onMounted(async () => {
  meals.value = await mealStore.getMealByIngredient(ingredient)
  ingredientDescription.value = ingredientStore.getIngredientDescription(ingredient)
})
</script>

<template>
  <main>
    <h1 class="text-4xl font-bold mb-8">Meals use {{ ingredient }}</h1>
    <blockquote class="bg-white border border-gray-200 p-8 rounded-lg mb-8 shadow-inner">
      {{ ingredientDescription }}
    </blockquote>
    <MealsGrid v-if="meals.length > 0" :meals="meals" />
  </main>
</template>
