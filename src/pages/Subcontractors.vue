<template>
  <div class="card-margin">
    <q-layout view="lHh lpr lFf" container style="height: 780px; margin-top: 10px;" class=" rounded-borders">
      <q-header bordered class="bg-grey-3 text-primary">
        <q-toolbar>
          <q-toolbar-title class="text-center">
            <q-avatar color="blue" text-color="white" icon="fa-solid fa-tower-observation" />
            Alt İşverenler
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>


        <!-- Data Table Start -->
        <div class="q-pa-md">


          <!-- Add button start -->
          <div class="q-pa-md q-gutter-sm">
            <q-btn label="Ekle" color="primary" icon="fa-solid fa-plus" />
          </div>
          <!-- Add button end -->

          <q-table :grid="$q.screen.xs" flat bordered title="Alt İşveren Listesi" :rows="data" :columns="columns"
            row-key="name" :filter="filter">
            <template v-slot:top-right>

              <div class="q-pa-md">
                <div class="q-gutter-y-md">
                  <q-btn-toggle v-model="status" spread no-caps toggle-color="blue" color="white" text-color="black"
                    :options="[
                      { label: 'Aktif', value: 'true' },
                      { label: 'Pasif', value: 'false' }
                    ]" />
                </div>
              </div>


              <q-input borderless filled dense debounce="300" v-model="filter" placeholder="Arama Yapınız">
              </q-input>
              <q-btn icon="search" outline style="color: gray; margin-left: 3px;" @click="GetListData(filter)" />

            </template>


            <template v-slot:body-cell-settings="props">

              <q-td :props="props">


                <button class="btn" title="Pdf">
                  <i class="fa-solid fa-file-pdf fa-xl"></i>
                </button>

                <button class="btn" title="Excel">
                  <i class="fa-solid fa-file-excel fa-xl"></i>
                </button>

                <button class="btn" title="Csv">
                  <i class="fa-solid fa-file-csv fa-xl"></i>
                </button>
              </q-td>

            </template>

          </q-table>
        </div>
        <!-- Data Table End -->


      </q-page-container>

    </q-layout>
  </div>
</template>

<script setup>
import { ref } from "vue";
import data from "src/data/subcontractors.json"


/* Data Table Start */
const filter = ref('')
const columns = [

  { name: 'settings', field: 'settings', align: "left", sortable: true },
  { name: 'id', align: 'left', label: '#', field: 'id', sortable: true },
  { name: 'WorkplaceTitle', label: 'İş Yeri Ünvanı', align: 'left', field: 'WorkplaceTitle', sortable: true },
  { name: 'WorkplaceConnected', label: 'Bağlı Olduğu İş Yeri', align: 'left', field: 'WorkplaceConnected', sortable: true },
  { name: 'DangerClass', label: 'Tehlike Sınıfı', align: 'left', field: 'DangerClass', sortable: true },
  { name: 'RegistrationNumber', label: 'Sgk Sicil No', align: 'left', field: 'RegistrationNumber', sortable: true },
  { name: 'Nace', label: 'Nace', align: 'left', field: 'Nace', sortable: true },
  {
    name: 'Status', label: 'Durum', align: 'left', field: 'Status', sortable: true,
    format: val => val ? 'Aktif' : 'Pasif',
    style: val => val.Status ? 'color:green;' : 'color:red'

  },

]
var status = ref("true")
/* Data Table end */


</script>

<style scoped>
.btn {
  background: transparent;
  border: none;
  cursor: pointer;
}

.my-custom-toggle {

  border: 1px solid #027be3;
}
</style>
