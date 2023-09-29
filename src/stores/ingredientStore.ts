import { ref } from 'vue'
import { defineStore } from 'pinia'
import axiosClient from '../../axiosClient.js'

import type { Ingredient, IngredeintMap } from '@/types/Ingredient'

// type ingredientMapItem = {
//   [key: string]: string[]
// }

const mapIngredients = (ingredients: Ingredient[]) => {
  const ingredientMap = <IngredeintMap>{}

  ingredients.forEach((ingredient) => {
    const firstLetter = ingredient.strIngredient[0]

    if (ingredientMap[firstLetter]) {
      ingredientMap[firstLetter].push(ingredient.strIngredient)
    } else {
      ingredientMap[firstLetter] = [ingredient.strIngredient]
    }
  })
  return ingredientMap
}

export const useIngredientStore = defineStore('ingredientStore', () => {
  const ingredients = ref(new Array<Ingredient>())

  const ingredientsMap = ref(<IngredeintMap>{})

  const getIngredientList = async () => {
    const res = await axiosClient.get('list.php?i=list')

    ingredients.value = res.data?.meals || []

    ingredients.value = ingredients.value.filter((ingredient) => ingredient.strDescription !== null)

    ingredientsMap.value = mapIngredients(ingredients.value)

    return ingredients.value
  }

  const getIngredientDescription = (ingredeintName: string) => {
    const ingredient = ingredients.value.find(
      (ingredient) => ingredient.strIngredient === ingredeintName
    )

    return ingredient?.strDescription || ''
  }

  return { ingredients, ingredientsMap, getIngredientList, getIngredientDescription }
})
