import { ref } from 'vue'
import type { Meal } from '@/types/Meal'
import { defineStore } from 'pinia'

import axiosClient from '../../axiosClient.js'

const formatIngredient = (ingredient: string, measure: string) => {
  return `${measure} ${ingredient}`
}

const youtubeEmbedTemplate = (link: string) => {
  const youtubeEmbedTemplate = 'https://www.youtube.com/embed/'
  const url = link.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/)

  const YId = undefined !== url[2] ? url[2].split(/[^0-9a-z_/\\-]/i)[0] : url[0]

  if (YId === url[0]) return ''

  return youtubeEmbedTemplate.concat(YId)
}

const getRandomElementsFromArray = (arr: Meal[], num: number, mealId: string) => {
  const shuffled = [...arr].filter((item) => item.idMeal !== mealId).sort(() => 0.5 - Math.random())
  return shuffled.slice(0, num)
}

type categroyMeal = {
  [key: string]: Array<Meal>
}

export const useMealStore = defineStore('mealStore', () => {
  const randomMealNum = 12
  const randomMeals = ref(new Array<Meal>())
  const categorizedMeals = ref<categroyMeal>({})

  const getRandomMeals = async () => {
    if (randomMeals.value.length === randomMealNum) return

    randomMeals.value = []
    for (let i = 0; i < randomMealNum; i++) {
      const res = await axiosClient.get('random.php')
      randomMeals.value.push(res.data.meals[0])
    }
  }

  const getMealById = async (mealId: string | string[]) => {
    const res = await axiosClient.get(`lookup.php?i=${mealId}`)
    const meal = res.data.meals[0]
    meal.ingredients = []
    Object.keys(meal).forEach((key) => {
      if (meal[key] !== '' && key.startsWith('strIngredient')) {
        meal.ingredients.push(
          formatIngredient(meal[key], meal[key.replace('strIngredient', 'strMeasure')])
        )
      }
    })

    if (meal.strYoutube) {
      meal.strYoutube = youtubeEmbedTemplate(meal.strYoutube)
    }

    return res.data.meals[0] as Meal
  }

  const getMealByCategory = async (category: string, num?: number, mealId?: string) => {
    mealId = mealId || ''
    if (categorizedMeals.value?.[category]) {
      return num
        ? getRandomElementsFromArray(categorizedMeals.value[category], num, mealId)
        : categorizedMeals.value[category]
    }
    console.log('categorizedMeals.value?.[category]', categorizedMeals.value[category])
    const res = await axiosClient.get(`filter.php?c=${category}`)
    const meals = res.data.meals as Array<Meal>

    Object.assign(categorizedMeals.value, { [category]: meals })

    if (num) {
      return getRandomElementsFromArray(meals, num, mealId)
    }
    return meals
  }

  return { randomMeals, getRandomMeals, getMealById, getMealByCategory }
})
