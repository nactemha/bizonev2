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
          <div class="col-12 col-md-6  q-ma-md">
            <q-btn color="blue" text-color="white" unelevated icon="fa-solid fa-plus" label="Ekle" />
          </div>
          <!-- <div class="col q-ma-md">
            <q-input outlined v-model="text" label="İlaç arayınız" />
          </div> -->
        </div>


        <div class="q-pa-md">
          <q-table :grid="$q.screen.xs" flat bordered title="İlaç Listesi" :rows="data" :columns="columns" row-key="name"
            :filter="filter">
            <template v-slot:top-right>
              <q-input borderless filled dense debounce="300" v-model="filter" placeholder="Arama Yapınız">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>


            <template v-slot:body-cell-settings="props">
              <q-td :props="props">
                <button class="btn" style="border:none;" title="Düzenle">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>

                <button class="btn" style="border:none;" title="Durumu">
                  <i class="fa-solid fa-trash-can"></i>
                </button>

                <button class="btn" style="border:none;" title="Detay">
                  <i class="fa-solid fa-eye"></i>
                </button>

                <button class="btn" style="border:none;" title="Favori">
                  <i class="fa-regular fa-heart"></i>
                </button>
              </q-td>
            </template>

          </q-table>
        </div>


        <!--     <div class="q-ma-md">

          <div class="row">
            <div class="col "></div>
            <div class="col text-bold">#</div>
            <div class="col text-bold">Barkod</div>
            <div class="col text-bold">İlaç Adı</div>
            <div class="col text-bold">Firma Adı</div>
            <div class="col text-bold">Durum</div>
            <div class="col text-bold">Sisteme İlacı Ekleyen </div>
          </div>




          <div class="row" v-for="item in data" :key="item" :class="GetRowClass(i)">
            <div class=" col text-left active-btn ">
              <button class="btn" style="border:none;" title="Düzenle">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>

              <button class="btn" style="border:none;" title="Durumu">
                <i class="fa-solid fa-trash-can"></i>
              </button>

              <button class="btn" style="border:none;" title="Detay">
                <i class="fa-solid fa-eye"></i>
              </button>

              <button class="btn" style="border:none;" title="Favori">
                <i class="fa-regular fa-heart"></i>
              </button>

            </div>
            <div class=" col text-left ">{{ item.barcode }}</div>
            <div class=" col text-left">{{ item.medicineName }}</div>
            <div class=" col text-left">{{ item.brand }}</div>
            <div class=" col text-left">{{ item.status ? "Active" : "Passive" }}</div>
            <div class=" col text-left">{{ item.user }}</div>
          </div>
        </div> -->

        <!--  <q-markup-table>
          <thead>
            <tr>
              <td class="text-left" style="width: 5px;"></td>
              <th class="text-left">#</th>
              <th class="text-left">Barkod</th>
              <th class="text-left text-bold">İlaç Adı</th>
              <th class="text-left text-bold">Firma Adı</th>
              <th class="text-left text-bold">Durum</th>
              <th class="text-left text-bold">Sisteme İlacı Ekleyen</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in 8" :key="i" :class="GetRowClass(i)">
              <td class="text-left active-btn ">
                <button class="btn" style="border:none;" title="Düzenle">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>

                <button class="btn" style="border:none;" title="Durumu">
                  <i class="fa-solid fa-trash-can"></i>
                </button>

                <button class="btn" style="border:none;" title="Detay">
                  <i class="fa-solid fa-eye"></i>
                </button>

                <button class="btn" style="border:none;" title="Favori">
                  <i class="fa-regular fa-heart"></i>
                </button>

              </td>

              <td class="text-left">3</td>
              <td class="text-left ">5645643645543</td>
              <td class="text-left">aspirin</td>
              <td class="text-left">Budotekno</td>
              <td class="text-left">Aktif</td>
              <td class="text-left">4</td>
            </tr>


          </tbody>
        </q-markup-table> -->






      </q-page-container>

    </q-layout>
  </div>
</template>


<script setup>


import { onMounted, ref } from 'vue'
import { useMedicineFetch } from "src/composables/medicine"
const { fetch } = useMedicineFetch();


const columns = [

  { name: 'settings', field: 'settings', align: "left", sortable: true },
  { name: 'id', align: 'left', label: '#', field: 'id', sortable: true },
  { name: 'barcode', label: 'Barkod', align: 'left', field: 'barcode', sortable: true },
  { name: 'medicineName', label: 'İlaç Adı', align: 'left', field: 'medicineName', sortable: true },
  { name: 'brand', label: 'Firma Adı', align: 'left', field: 'brand', sortable: true },
  { name: 'status', label: 'Durum', align: 'left', field: 'status', sortable: true },
  { name: 'user', label: 'Sisteme İlacı Ekleyen', align: 'left', field: 'user', sortable: true },
]

const filter = ref('')


const data = ref()
onMounted(() => {
  data.value = fetch();
})






/*
const GetRowClass = (i) => {
  if (i % 2 == 1) {
    return 'light-row';
  } else {
    return '';
  }
}
const blueModel = ref(true)
const pinkModel = ref('Aktif')

const rows = [

  {
    settings: "s",
    id: 1,
    barcode: "123456789",
    medicineName: "Metaplex",
    brand: "Biontec",
    status: true,
    user: "buğra"
  },
  {
    settings: "s",
    id: 1,
    barcode: "123456789",
    medicineName: "Metaplex",
    brand: "Biontec",
    status: true,
    user: "buğra"
  }
  , {
    settings: "s",
    id: 1,
    barcode: "123456789",
    medicineName: "Metaplex",
    brand: "Biontec",
    status: true,
    user: "buğra"
  }

] */

</script>



<style scoped lang="scss">
@media (max-width: 1200px) {

  .q-td button {
    display: block;
    margin-bottom: 10px;
  }
}


.light-row {
  background-color: #eee;
  color: #000;
}

.btn {
  background-color: transparent;
}
</style>
