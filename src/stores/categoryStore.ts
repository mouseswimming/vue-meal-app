import { ref } from 'vue'
import { defineStore } from 'pinia'
import axiosClient from '../../axiosClient.js'

import type { Category } from '@/types/Category'

export const useCategoryStore = defineStore('categoryStore', () => {
  const categories = ref(new Array<Category>())

  const getCategoryList = async () => {
    const res = await axiosClient.get('categories.php')

    categories.value = res.data?.categories || []
    return categories.value
  }

  return { categories, getCategoryList }
})
