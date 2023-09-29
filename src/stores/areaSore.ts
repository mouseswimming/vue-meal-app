import { ref } from 'vue'
import { defineStore } from 'pinia'
import axiosClient from '../../axiosClient.js'

type Area = {
  strArea: string
}

export const useAreaStore = defineStore('areaStore', () => {
  const areas = ref(new Array<Area>())

  const getAreaList = async () => {
    const res = await axiosClient.get('list.php?a=list')

    areas.value = res.data?.meals || []
  }

  return { areas, getAreaList }
})
