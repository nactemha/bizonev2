<template>
  <div class="card-margin">
    <q-layout view="lHh lpr lFf" container style="height: 780px; margin-top: 10px;" class=" rounded-borders">
      <q-header bordered class="bg-grey-3 text-primary">
        <q-toolbar>
          <q-toolbar-title class="text-center">
            <q-avatar color="blue" text-color="white" icon="fa-solid fa-hospital-user" />

            Çalışan Sağlık Bilgileri
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>

        <!-- Workplace input start -->
        <div class="q-pa-md" style="max-width: 500px">
          <div class="q-gutter-md">
            <q-select filled v-model="model" :options="options" label="İş Yeri Seçimi" color="teal" clearable
              options-selected-class="text-deep-orange" use-input input-debounce="300">
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <img width="30" style="margin: 0 5px 0 0" :src="scope.opt.logo" />
                  <q-item-section>
                    <q-item-label>{{ scope.opt.label }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </div>
        <!-- Workplace input end -->


        <!-- Data Table Start -->
        <div class="q-pa-md">

          <q-table :grid="$q.screen.xs" flat bordered title="Çalışan Sağlık Listesi" :rows="data" :columns="columns"
            row-key="name" :filter="filter">
            <template v-slot:top-right>
              <q-input borderless filled dense debounce="300" v-model="filter" placeholder="Arama Yapınız">
                <!--  <template v-slot:append>
                </template> -->
              </q-input>
              <q-btn icon="search" outline style="color: gray; margin-left: 3px;" @click="GetListData(filter)" />

            </template>


            <template v-slot:body-cell-settings="props">

              <q-td :props="props">

                <button class="btn" title="Detay" @click="detailModal = !detailModal">
                  <i class="fa-solid fa-eye"></i>
                </button>

              </q-td>

            </template>

          </q-table>
        </div>
        <!-- Data Table End -->


      </q-page-container>

    </q-layout>
  </div>


  <!-- Detail Modal Start -->
  <div class="q-pa-md q-gutter-sm">

    <q-dialog v-model="detailModal" full-width>
      <q-card>
        <q-card-section>
          <div class="text-h6">Çalışan Sağlık Detayı</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 80vh" class="scroll">

          <div class="q-pa-md">
            <div class="q-gutter-y-md">
              <q-card style="border:none; box-shadow:none">
                <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary"
                  align="justify" narrow-indicator>
                  <q-tab name="mails" label="Muayene" />
                  <q-tab name="alarms" label="Revir" />
                  <q-tab name="movies" label="Odiometre" />
                  <q-tab name="movies1" label="Bağışıklama" />
                  <q-tab name="movies1" label="Sevk" />
                  <q-tab name="movies1" label="İstirahat" />
                  <q-tab name="movies1" label="Uygunluk" />
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated>
                  <q-tab-panel name="mails">
                    <div class="text-h6">Liste</div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </q-tab-panel>

                  <q-tab-panel name="alarms">
                    <div class="text-h6">Liste</div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </q-tab-panel>

                  <q-tab-panel name="movies">
                    <div class="text-h6">Liste</div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </q-tab-panel>
                </q-tab-panels>
              </q-card>

            </div>
          </div>


        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Kapat" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
  <!-- Detail Modal end -->
</template>

<script setup>
import { ref } from "vue";
import data from "src/data/employee.json";


/* Data Table Start */
const filter = ref('')
const columns = [

  { name: 'settings', field: 'settings', align: "left", sortable: true },
  { name: 'id', align: 'left', label: '#', field: 'id', sortable: true },
  { name: 'Workplace', label: 'İş Yeri', align: 'left', field: 'Workplace', sortable: true },
  { name: 'SensitiveGroup', label: 'Hassas Grup', align: 'left', field: 'SensitiveGroup', sortable: true },
  { name: 'Age', label: 'Yaş', align: 'left', field: 'Age', sortable: true },
  { name: 'Gender', label: 'Cinsiyet', align: 'left', field: 'Gender', sortable: true },
  { name: 'Shift', label: 'Vardiya', align: 'left', field: 'Shift', sortable: true },
  { name: 'BloodGroup', label: 'Kan Grubu', align: 'left', field: 'BloodGroup', sortable: true },
  { name: 'Bmi', label: 'BMI', align: 'left', field: 'Bmi', sortable: true },
  { name: 'Whr', label: 'WHR', align: 'left', field: 'Whr', sortable: true },
  { name: 'DegreeDisability', label: 'Ergenlik Derecesi', align: 'left', field: 'DegreeDisability', sortable: true },
]


var model = ref(null)

var options = [
  {
    label: 'Arge 360',
    value: 'Arge 360',
    logo: 'https://media.licdn.com/dms/image/C4D0BAQHKraiUKWjUGA/company-logo_200_200/0/1519884102333?e=2147483647&v=beta&t=-nQP1U2vBPYyR_kbwv1dcMgwAr5Jj99dOpqrwu52RAQ'

  },
  {
    label: 'Garanti Bankası',
    value: 'Garanti Bankası',
    logo: 'https://play-lh.googleusercontent.com/COWSAHa7drbVvCgIkZ4KLxZO78xu8fI7Jg_OX57Y1WBAypwkjqW7TMfTbv5bwX4TbPw9'
  }

]
/* Data Table end */


/* Detail Modal Start */
var detailModal = ref(false)
var tab = ref('mails')
/* Detail Modal End */




</script>

<style scoped>
.btn {
  background: transparent;
  border: none;
  cursor: pointer;
}
</style>
