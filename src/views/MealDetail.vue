<script lang="ts" setup>
import { useMealStore } from '@/stores/mealStore'
import type { Meal } from '@/types/Meal'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import MealsGrid from '@/components/MealsGrid.vue'
import MealItem from '@/components/MealItem.vue'

const route = useRoute()
const mealStore = useMealStore()
const meal = ref(<Meal>{})
const mealsInSameCategory = ref(new Array<Meal>())

onMounted(async () => {
  const mealId = route.params.id
  meal.value = await mealStore.getMealById(mealId)

  mealsInSameCategory.value = await mealStore.getMealByCategory(meal.value.strCategory, 4, mealId)
})
</script>

<template>
  <main class="py-12 px-8">
    <h1 class="text-4xl font-bold mb-4">{{ meal.strMeal }}</h1>
    <div class="uppercase text-xs text-orange-600 flex gap-x-8 mb-4 font-semibold">
      <div><span class="label">Category:</span> {{ meal.strCategory }}</div>
      <div><span class="label">Area:</span> {{ meal.strArea }}</div>
    </div>
    <section class="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-x-12">
      <div>
        <img
          :src="meal.strMealThumb"
          :alt="meal.strMeal"
          class="bg-white p-4 rounded-lg shadow-md block mb-8 w-full"
        />

        <h2 class="text-2xl font-semibold mb-6">Ingredients</h2>

        <ul
          class="list-disc marker:text-orange-600 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 mb-8"
        >
          <li v-for="(ingredeint, index) in meal.ingredients" :key="index" class="my-2 ml-4">
            {{ ingredeint }}
          </li>
        </ul>

        <template v-if="meal.strYoutube !== ''">
          <h2 class="text-2xl font-semibold mb-6">Video Tutorial</h2>
          <!-- <iframe width="100%" :src="meal.strYoutube" frameborder="0" allowfullscreen></iframe> -->
          <iframe
            :src="meal.strYoutube"
            :title="`How to make ${meal.strMeal}`"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="w-full aspect-video mb-8"
          ></iframe>
        </template>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-6">Instructions</h2>
        <p class="mb-8 leading-relaxed">
          {{ meal.strInstructions }}
        </p>
        <h2 class="text-2xl font-semibold mb-6">More {{ meal.strCategory }} meals</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-8">
          <MealItem v-for="meal in mealsInSameCategory" :key="meal.idMeal" :meal="meal" />
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="css" scoped>
.label {
  @apply font-normal text-gray-600;
}
</style>
