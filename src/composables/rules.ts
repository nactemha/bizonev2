import { useI18n } from 'vue-i18n'
export function useRules() {
    const { t } = useI18n()
    
    const required = (v: string) => !!v || t('rules_required')
    const min=(length:number)=>  (v: string) => (v && v.length >= length ) || t('rules_min', {length}) 
    const max=(length:number)=>  (v: string) => (v && v.length <= length ) || t('rules_max', {length}) 
    const email = (v: string) => /.+@.+\..+/.test(v) || t('rules_email')
    
    const username= [min(5),max(20)]
    const password= [min(8),max(20)]

    return {required,min,max,email,username,password}
}
