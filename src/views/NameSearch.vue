<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { refDebounced } from '@vueuse/core'
import { useMealStore } from '@/stores/mealStore'
import type { Meal } from '@/types/Meal'
import MealsGrid from '@/components/MealsGrid.vue'
import LetterList from '@/components/LetterList.vue'
import { useRoute } from 'vue-router'

const mealStore = useMealStore()

const keyword = ref('')
const debouncedKeyword = refDebounced(keyword, 700)

const meals = ref(new Array<Meal>())

watch(debouncedKeyword, async () => {
  meals.value = await mealStore.getMealByName(debouncedKeyword.value)
  selectedLetter.value = ''
})

const route = useRoute()

onMounted(() => {
  if (route.query.keyword) {
    keyword.value = route.query.keyword.toString()
  }
})

const selectedLetter = ref('')
const searchByLetter = async (letter: string) => {
  selectedLetter.value = letter
  meals.value = await mealStore.getMealByLetter(letter)
}
</script>

<template>
  <main>
    <!-- by keyword -->
    <div class="mb-8">
      <h3 class="text-xl font-semibold mb-4">Search Meals by Name: {{ $route.query.keyword }}</h3>
      <input
        v-model="keyword"
        type="search"
        name="search meals by name"
        placeholder="search by meal"
        class="w-full lg:w-1/2 p-4 border border-gray-400 focus:outline-orange-500 focus:outline-offset-4"
      />
    </div>

    <!-- by first letter -->
    <div class="mb-8">
      <h3 class="text-xl font-semibold mb-4">Finds meal by its first letter:</h3>
      <LetterList @selectLetter="searchByLetter" :letter="selectedLetter" />
    </div>

    <MealsGrid v-if="meals.length > 0" :meals="meals" />
  </main>
</template>
