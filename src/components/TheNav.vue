<script lang="ts" setup></script>

<template>
  <header class="bg-white shadow-md flex place-content-between h-20">
    <router-link
      :to="{ name: 'home' }"
      class="inline-flex items-center h-full px-5 text-orange-500 font-bold"
    >
      Home
    </router-link>
    <div class="menus flex gap-x-2">
      <router-link :to="{ name: 'home' }" class="menu-item"> Meals by Name </router-link>
      <router-link :to="{ name: 'home' }" class="menu-item"> Meals by Ingredients </router-link>
      <router-link :to="{ name: 'home' }" class="menu-item"> Meals by Areas </router-link>
    </div>
  </header>
</template>

<style lang="css" scoped>
.menu-item {
  @apply inline-flex items-center h-full px-5 text-orange-500 font-bold hover:bg-orange-500 hover:text-white transition-colors;
}
</style>
