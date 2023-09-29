<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import SearchIcon from './SearchIcon.vue'
import { useRouter } from 'vue-router'

const isSearching = ref(false)
const keyword = ref('')
const router = useRouter()

const searchMeal = () => {
  if (keyword.value !== '') {
    console.log('keyword.value', keyword.value)
    isSearching.value = false
    const searchTerm = keyword.value
    keyword.value = ''

    router.push({ name: 'byName', query: { keyword: searchTerm } })
  }
}
const searchInput = ref<HTMLInputElement | null>(null)
const triggerSearchMode = () => {
  isSearching.value = true
  if (searchInput.value !== undefined) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
}
</script>

<template>
  <header class="bg-white shadow-md flex place-content-between h-20 sticky top-0 z-50">
    <router-link
      :to="{ name: 'home' }"
      class="inline-flex items-center h-full px-5 text-orange-500 font-bold"
    >
      <img src="/logo.svg" class="w-12" alt="" />
      <span class="text-2xl pl-4">Vivian's Kitchen</span>
    </router-link>
    <div class="menus flex gap-x-2" :class="{ 'is-searching': isSearching }">
      <router-link :to="{ name: 'byName' }" class="menu-item">by Name </router-link>
      <router-link :to="{ name: 'ingredients-a-z' }" class="menu-item">
        by Ingredients
      </router-link>
      <router-link :to="{ name: 'areas-a-z' }" class="menu-item">by Areas </router-link>
      <button type="button" class="px-3 search-icon-button mr-2" @click="triggerSearchMode">
        <SearchIcon class="text-orange-500 h-[24px]" />
      </button>
      <form @submit.prevent class="items-center h-full nav-search mr-4">
        <label for="search" class="pr-2">Search: </label>
        <input
          type="search"
          ref="searchInput"
          v-model="keyword"
          @keyup.enter="searchMeal"
          placeholder="search meal"
          class="border border-gray-500 h-[40px] px-4 outline-none focus-visible:shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] focus-visible:border-orange-500"
        />
        <button
          type="button"
          class="bg-orange-500 h-[40px] px-4 text-white text-lg"
          @click="searchMeal"
        >
          <SearchIcon class="scale-150" />
        </button>
        <button
          type="button"
          class="text-gray-500 h-[40px] px-2 ml-2 text-2xl hover:text-orange-600"
          @click="isSearching = false"
        >
          x
        </button>
      </form>
    </div>
  </header>
</template>

<style lang="css" scoped>
.menu-item {
  @apply inline-flex items-center h-full px-3 text-orange-500 font-bold hover:bg-orange-500 hover:text-white transition-colors;
}

.is-searching {
  & .search-icon-button,
  & .menu-item {
    /* display: none; */
    visibility: hidden;
  }

  & .nav-search {
    display: grid;
    grid-template-columns: auto 1fr auto auto;
    width: 100%;
  }
}

.nav-search {
  display: none;
}
</style>
