<script lang="ts" setup>
import { ref, watch } from 'vue'
import { refDebounced } from '@vueuse/core'
import { useMealStore } from '@/stores/mealStore'
import type { Meal } from '@/types/Meal'
import MealsGrid from '@/components/MealsGrid.vue'

const mealStore = useMealStore()

const keyword = ref('')
const debouncedKeyword = refDebounced(keyword, 700)

const meals = ref(new Array<Meal>())

watch(debouncedKeyword, async () => {
  meals.value = await mealStore.getMealByName(debouncedKeyword.value)
})
</script>

<template>
  <main>
    <h1 class="text-4xl font-bold mb-4">Search Meals by Name</h1>

    <div class="mb-8">
      <input
        v-model="keyword"
        type="search"
        name="search meals by name"
        placeholder="search by meal"
        class="w-full lg:w-1/2 p-4 border border-gray-400 focus:outline-orange-500 focus:outline-offset-4"
      />
    </div>

    <MealsGrid v-if="meals.length > 0" :meals="meals" />
  </main>
</template>
