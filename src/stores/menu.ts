import { ref } from 'vue'
import { defineStore } from 'pinia'
import menuData from '~/data/menu.json'

export const useMenuStore = defineStore('menu', () => {
  const menu = ref([])
  
  async function fetch(){
    menu.value = menuData
  }
  return { fetch, menu }
})