<script lang="ts" setup></script>

<template>
  <header class="bg-white shadow-md flex place-content-between h-20">
    <router-link
      :to="{ name: 'home' }"
      class="inline-flex items-center h-full px-5 text-orange-500 font-bold"
    >
      <img src="/public/logo.svg" class="w-12" alt="" />
      <span class="text-2xl pl-4">Vivian's Kitchen</span>
    </router-link>
    <div class="menus flex gap-x-2">
      <router-link :to="{ name: 'byName' }" class="menu-item"> Meals by Name </router-link>
      <router-link :to="{ name: 'ingredients-a-z' }" class="menu-item">
        Meals by Ingredients
      </router-link>
      <router-link :to="{ name: 'areas-a-z' }" class="menu-item"> Meals by Areas </router-link>
    </div>
  </header>
</template>

<style lang="css" scoped>
.menu-item {
  @apply inline-flex items-center h-full px-5 text-orange-500 font-bold hover:bg-orange-500 hover:text-white transition-colors;
}
</style>
