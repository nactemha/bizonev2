
<template>
    <v-layout class="rounded rounded-md">

        <v-navigation-drawer v-model="drawer" :rail="rail && !display.smAndDown" @click="rail = true"
            :expand-on-hover="!display.smAndDown">
            <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" title="John Leider" nav>
                <template v-slot:append>
                    <v-btn variant="text" class="hidden-md-and-down" :icon="rail ? 'mdi-menu' : 'mdi-backburger'"
                        @click.stop="rail = !rail"></v-btn>
                </template>
            </v-list-item>

            <v-divider></v-divider>

            <v-list density="compact" nav>
                <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
                <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
                <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar color="primary" prominent>
            <v-app-bar-nav-icon class="hidden-lg-and-up" variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>Bizone Dashboard</v-toolbar-title>

            <v-spacer></v-spacer>
            <p>{{ display.smAndDown ? "Mobil" : "Desktop" }} </p>

            <v-btn variant="text" icon="mdi-magnify"></v-btn>

            <v-btn variant="text" icon="mdi-filter"></v-btn>

            <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
        </v-app-bar>
        <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
            <v-list lines="one">
                <v-list-item v-for="n in todos.value" :key="n.userId" :title="n.title"></v-list-item>
            </v-list>
        </v-main>

    </v-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import { useTodosStore } from '~/store/todos'
import { storeToRefs } from 'pinia'

const display = ref(useDisplay())
const drawer = ref(true)
const rail = ref(true)

const todosStore = useTodosStore()
const { fetch } = todosStore
const { todos } = storeToRefs(todosStore)
await fetch();
</script>