import { useI18n } from 'vue-i18n'
import data from "src/data/medicines.json"
import { ref } from 'vue'
export function useMedicineFetch() {
    const response = ref(data)
    const fetch = () => {
        return data
    }

    return { fetch }
}
