import { ref } from 'vue';
import { defineStore } from 'pinia';
import data from "src/data/medicines.json"

export const useMockDataStore = defineStore('mockData', () => {
    const medicines = ref(data)

    return { medicines }
})