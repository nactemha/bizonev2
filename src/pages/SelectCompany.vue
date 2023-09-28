<template>
    <q-page class="container row items-start justify-center">
        <q-card v-for="company in companies" class="company cursor-pointer" @click="router.replace('/')">
            <q-icon :name="fasBuilding" class="text-green-10 q-pa-sm"
                style="border-radius:100px;background:#fff;font-size:50px;margin:-15px 0 0 0px;border:solid #fff 2px;"></q-icon>
            <q-card-section>
                <div class="text-h6">{{ company.title }}</div>
            </q-card-section>
        </q-card>
    </q-page>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter();
import { fasBuilding, fasSearch } from '@quasar/extras/fontawesome-v5'
import data from 'src/data/company.json'
import { storeToRefs } from 'pinia';
import { useToolbarStore } from 'src/stores/toolbar';
const { requireSearch, searchKeyword } = storeToRefs(useToolbarStore());
requireSearch.value = true;
const companies = computed(() => {
    return data.filter((company) => {
        console.log("searchKeyword.value.toLowerCase() : ", searchKeyword.value === '');
        return company.title.toLowerCase().includes(searchKeyword.value.toLowerCase())
    })
})
</script>
<style  lang="scss" scoped>
.container {
    width: 100%;
    padding: 0px;
    margin: 0;

}

.company {
    max-width: 370px;
    min-width: 300px;
    width: 100%;
    max-height: 200px;
    margin: 0px auto 20px auto;
    padding: 5px;


}
</style>
