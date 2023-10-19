<template>
    <q-page>
        <div class="absolute-center  full-width" style="max-width: 550px; background-color: red;">
            <div class="q-pa-md">
                <div class="q-gutter-md">
                    <div class="rounded-borders bg-primary text-white flex flex-center">
                        Ratio 1:1
                    </div>
                    <button @click="update()">
                        {{ state.count }}
                    </button>
                    <input v-model="state.count" />
                </div>
            </div>
        </div>
    </q-page>
</template>
  
<script setup>
import { reactive } from 'vue'

const state = reactive({})
function update() {
    console.log(state);
    Object.assign(state, { count: 1000 })
}
</script>
  
<style>
body.body--dark {
    background: #333333;
}
</style>
  