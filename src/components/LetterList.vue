<script lang="ts" setup>
import { ref, watch } from 'vue'

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const selectedLetter = ref('')

const props = defineProps<{ letter: string }>()

const emit = defineEmits(['select-letter'])
const selecteLetter = (letter: string) => {
  selectedLetter.value = letter
  emit('select-letter', letter)
}

watch(props, () => {
  selectedLetter.value = props.letter
})
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <span
      v-for="letter in letters"
      :key="letter"
      @click="selecteLetter(letter)"
      class="w-8 h-8 border border-orange-500 inline-flex items-center justify-center cursor-pointer transition-all"
      :class="{ letterOnHover: letter === selectedLetter }"
    >
      {{ letter }}
    </span>
  </div>
</template>

<style lang="css" scoped>
.letterOnHover,
span:hover {
  @apply bg-orange-500 text-white scale-150;
}
</style>
