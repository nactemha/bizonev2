import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useToolbarStore = defineStore('toolbar', () => {
    const requireSearch = ref(false)
    const searchKeyword = ref('')

    return { requireSearch, searchKeyword }
})