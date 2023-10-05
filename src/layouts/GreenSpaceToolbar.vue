<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="bg-primary text-white">
            <q-toolbar>
                <q-toolbar-title>
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
                    </q-avatar>
                    Title
                </q-toolbar-title>
                <div class="row justify-center items-center">
                    <q-input v-if="requireSearch && searhBarVisible" dark dense standout bg-color="white"
                        v-model="searchKeyword" input-class="text-right" class=" search">
                        <template v-slot:append>
                            <q-icon name="clear" class="cursor-pointer"
                                @click="searchKeyword = ''; searhBarVisible = false" />
                        </template>
                    </q-input>
                    <q-btn round v-if="requireSearch && !searhBarVisible" class=" searchicon" :icon="fasSearch"
                        style="font-size: 15px;" @click.stop="searhBarVisible = !searhBarVisible" />

                </div>
            </q-toolbar>
        </q-header>

        <q-page-container style="margin-top: 10px;">
            <router-view />
        </q-page-container>

    </q-layout>
</template>

<style lang="scss">
html {
    height: 100%
}

body {
    background: #fff url(/images/background.png) no-repeat center center fixed;
    background-size: cover;
    height: 100%;
}

.searchicon {
    margin-left: 10px;

    @media(min-width: $breakpoint-xs) {}
}

.search {
    width: 200px;
    margin: 0;
    position: absolute;
    right: 10px;

    @media(min-width: $breakpoint-xs) {
        max-width: 500px;
        margin: 0;
    }
}
</style>
<script setup>
import { fasSearch } from '@quasar/extras/fontawesome-v5'
import { useToolbarStore } from 'src/stores/toolbar';
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';

const { requireSearch, searchKeyword } = storeToRefs(useToolbarStore());
const searhBarVisible = ref(false);
</script>
