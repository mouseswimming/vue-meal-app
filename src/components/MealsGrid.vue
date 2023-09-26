<script lang="ts" setup>
import type { Meal } from '@/types/Meal'

import MealItem from './MealItem.vue'

defineProps<{
  meals: Meal[]
  title: string
}>()
</script>

<template>
  <section class="p-4 my-2">
    <h2 class="section-title">{{ title }}</h2>
    <div v-if="meals.length === 0">There are no meals</div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <MealItem v-for="meal in meals" :key="meal.idMeal" :meal="meal" />
    </div>
  </section>
  <div v-if="meals.length === 0">There are no meals</div>
</template>
