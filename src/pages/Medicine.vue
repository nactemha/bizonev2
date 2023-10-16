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

        <!-- Modal Start -->
        <div class="q-pa-md q-gutter-sm">
          <q-btn label="Ekle" color="primary" icon="fa-solid fa-plus" @click="addMedicineModal = true" />

          <q-dialog v-model="addMedicineModal">
            <q-card>

              <q-card-section>
                <div class="text-h6">İlaç Ekle</div>
              </q-card-section>

              <q-form @submit="onSubmit" class="q-gutter-md">

                <q-separator />

                <q-card-section style="max-height: 70vh; width: 450px;" class="scroll">



                  <div class="q-pa-md modal">




                    <div style="margin-bottom: 5px;">
                      <q-select class="select" filled :options="['Seçiniz', 'İlaç', 'Sarf Malzeme', 'Demirbaş']"
                        label="Tür" lazy-rules :rules="[val => val && val.length > 0 || 'Barkod boş geçilemez']" />
                    </div>


                    <div style="margin-bottom: 5px;">
                      <q-input class="txt" filled type="number" v-model="barkod" label="Barkod" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Barkod boş geçilemez']" />
                    </div>

                    <div style="margin-bottom: 5px;">
                      <q-input class="txt" filled label="İlaç Adı" lazy-rules
                        :rules="[val => val && val.length > 0 || 'İlaç adı boş geçilemez']" />
                    </div>

                    <div style="margin-bottom: 5px;">
                      <q-input class="txt" filled label="Firma Adı" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Firma adı boş geçilemez']" />
                    </div>


                  </div>

                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                  <q-btn flat label="Kapat" color="red" v-close-popup />
                  <q-btn flat label="Kaydet" type="submit" color="primary" />
                </q-card-actions>


              </q-form>

            </q-card>
          </q-dialog>
        </div>
        <!-- Modal End -->

        <!-- Data Table Start -->
        <div class="q-pa-md">
          <q-table :grid="$q.screen.xs" flat bordered title="İlaç Listesi" :rows="data" :columns="columns" row-key="name"
            :filter="filter">
            <template v-slot:top-right>
              <q-input borderless filled dense debounce="300" v-model="filter" placeholder="Arama Yapınız">
                <!--  <template v-slot:append>
                </template> -->
              </q-input>
              <q-btn icon="search" outline style="color: gray; margin-left: 3px;" @click="GetListData(filter)" />

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
        <!-- Data Table End -->


      </q-page-container>

    </q-layout>
  </div>
</template>


<script setup>


import { onMounted, ref } from 'vue'
import { useMedicineFetch } from "src/composables/medicine"
const { fetch } = useMedicineFetch();
import axios from 'axios';

const barkod = "123"

const addMedicineModal = ref(false)

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

const pagination = ref({
  page: 1, // Sayfa numarası
  rowsPerPage: 10, // Kayıt sayısı
});


const data = ref()
onMounted(() => {
  data.value = fetch();
})

const GetListData = (value) => {

  alert(value)


  /*  axios.get('url'+value)
    .then(response => {

      this.data = response.data;
    })
    .catch(error => {
      console.error('API isteği sırasında bir hata oluştu:', error);
    }); */

}


</script>



<style scoped lang="scss">
@media (max-width: 600px) {
  .modal {
    margin: 0px;
    padding: 10px;
  }

  .scroll {
    margin: 0px;

  }

  .txt,
  .select {
    margin: 0;
    padding: 0px;
    width: 100%;

  }


}


@media (max-width: 1200px) {

  .q-td button {
    display: block;
    margin-bottom: 10px;
  }
}

.btn {
  background-color: transparent;
  cursor: pointer;
}
</style>
