<template>
    <q-page class="row items-center justify-evenly">
        test
        <q-btn @click="toggleDarkMode">Toggle dark mode</q-btn>
    </q-page>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
    name: 'PageIndex',
    setup() {
        const $q = useQuasar();
        return {
            toggleDarkMode() {
                $q.dark.toggle();
            },
        };
    },
});
</script>
  
<style>
body.body--dark {
    background: #333333;
}
</style>
  