<script lang="ts" setup>
import { useIngredientStore } from '@/stores/ingredientStore'
import { computed, onMounted } from 'vue'

const ingredientStore = useIngredientStore()

const ingredientMap = computed(() => {
  return ingredientStore.ingredientsMap
})

const orderedKeys = computed(() => {
  return Object.keys(ingredientMap.value).sort()
})

onMounted(() => {
  ingredientStore.getIngredientList()
})
</script>

<template>
  <main>
    <h1 class="text-4xl font-bold mb-12">Ingredients A-Z</h1>

    <section class="grid gap-y-6">
      <div v-for="item in orderedKeys" :key="item">
        <div
          class="inline-flex bg-black w-10 h-10 rounded mb-6 text-lg text-center text-white items-center justify-center"
        >
          {{ item }}
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-4">
          <router-link
            v-for="(ingredient, index) in ingredientMap[item]"
            :key="index"
            :to="{ name: 'byIngredient', params: { ingredient: ingredient } }"
            class="pt-4 border-t border-gray-400"
          >
            <span>
              {{ ingredient }}
            </span>
          </router-link>
        </div>
      </div>
    </section>
  </main>
</template>
