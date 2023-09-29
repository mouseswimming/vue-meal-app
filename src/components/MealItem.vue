<script lang="ts" setup>
import type { Meal } from '@/types/Meal'

defineProps<{
  meal: Meal
}>()
</script>

<template>
  <div class="bg-white shadow rounded-xl hover:scale-105 hover:shadow-lg transition-all">
    <router-link :to="{ name: 'mealDetail', params: { id: meal.idMeal } }">
      <img :src="meal.strMealThumb" :alt="meal.strMeal" class="rounded-t-xl" />
    </router-link>
    <div class="p-4 grid gap-y-1">
      <p class="uppercase text-xs text-gray-600">
        {{ meal.strCategory }}
      </p>
      <router-link
        :to="{ name: 'mealDetail', params: { id: meal.idMeal } }"
        class="hover:text-orange-600 hover:underline"
      >
        <p class="text-base font-semibold line-clamp-2">{{ meal.strMeal }}</p>
      </router-link>
    </div>
  </div>
</template>
