<template>
  <div class="card-margin">
    <q-layout view="lHh lpr lFf" container style="height: 780px; margin-top: 10px;" class=" rounded-borders">
      <q-header bordered class="bg-grey-3 text-primary">
        <q-toolbar>
          <q-toolbar-title class="text-center">
            <q-avatar color="blue" text-color="white" icon="fa-solid fa-capsules" />
            İlaç Listesi
          </q-toolbar-title>
        </q-toolbar>
      </q-header>



      <q-page-container>
        <div class="row">
          <div class="col q-ma-md">
            <q-btn color="blue" text-color="white" unelevated icon="fa-solid fa-plus" label="Ekle" />
          </div>
          <div class="col q-ma-md">
            <q-input outlined v-model="text" label="İlaç arayınız" />
          </div>
        </div>





      </q-page-container>

    </q-layout>
  </div>
</template>


<script setup>

import { ref } from 'vue'

const blueModel = ref(true)
const pinkModel = ref('Aktif')

</script>



<style scoped lang="scss"></style>
