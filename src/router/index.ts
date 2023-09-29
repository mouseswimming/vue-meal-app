import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/meal/:id',
      name: 'mealDetail',
      component: () => import('../views/MealDetail.vue')
    },
    {
      path: '/by-category/:catName',
      name: 'byCategory',
      component: () => import('../views/MealsByCategory.vue')
    },
    {
      path: '/ingredients-a-z',
      name: 'ingredients-a-z',
      component: () => import('../views/IngredientSearch.vue')
    },
    {
      path: '/by-ingredient/:ingredient',
      name: 'byIngredient',
      component: () => import('../views/MealsByIngredient.vue')
    },
    {
      path: '/areas-a-z',
      name: 'areas-a-z',
      component: () => import('../views/AreaSearch.vue')
    },
    {
      path: '/by-area/:area',
      name: 'byArea',
      component: () => import('../views/MealsByArea.vue')
    },
    {
      path: '/by-name',
      name: 'byName',
      component: () => import('../views/NameSearch.vue')
    }
  ]
})

export default router
