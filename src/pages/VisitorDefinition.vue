<template>
  <page-container title="Ziyaretçi Tanımlamaları">
    <template #icon>
      <i class="fa-solid fa-elevator fa-xl"></i>
    </template>

    <q-page-container>


      <div class="q-pa-md ">
        <q-card class="my-card" flat bordered>
          <q-card-actions @click="doorCard = !doorCard" style="cursor: pointer;">
            <q-btn flat color="primary" label="Kapı Tanım" />
            <q-space />
            <q-btn color="grey" round flat dense :icon="doorCard ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" />
          </q-card-actions>

          <q-slide-transition>
            <div v-show="doorCard">
              <q-separator />
              <q-card-section class="text-subtitle2">

                <!-- Add and update button start -->
                <div class="q-pa-md q-gutter-sm">
                  <q-btn label="Ekle" color="primary" @click="addSectionDesModal()" icon="fa-solid fa-plus" />
                </div>
                <!-- Add and update button end -->


                <!-- Data Screen Div Table Start -->
                <div>

                  <!-- Md Screen Div Table Start -->
                  <div class="md-screen">
                    <div class="q-ma-md div-table">

                      <!-- Banner start -->
                      <div class="row ">
                        <div class="col text-left">
                          <p style="font-size: 22px;">
                            Kapı Listesi
                          </p>
                        </div>
                        <div class="col text-right">

                          <div class="row">
                            <q-input class="col-10" borderless filled dense debounce="300" v-model="filter"
                              placeholder="Arama Yapınız" />
                            <q-btn class="col-1" icon="search" outline style="color: gray; margin-left: 3px;"
                              @click="GetListData(filter)" />

                          </div>


                        </div>

                      </div>
                      <!-- Banner end -->


                      <!-- Header start -->
                      <div class="row">
                        <div class="col text-left"></div>
                        <div class="col text-left text-bold">#</div>
                        <div class="col text-left text-bold">Kapı Adı</div>
                        <div class="col text-left text-bold">Durum</div>
                      </div>
                      <hr>
                      <!-- Header end -->


                      <!-- Content start -->
                      <div class="row div-row" v-for="(i, index) in data.doorCard" :key="i" :class="GetRowClass(index)">
                        <div class=" col text-left active-btn ">
                          <button class="btn" style="border:none;" @click="updateSectionDesModal(i)" title="Düzenle">
                            <i class="fa-solid fa-pen-to-square fa-lg"></i>
                          </button>

                          <button class="btn" style="border:none;" title="Durumu" @click="deleteSectionDesModal(i)">
                            <i class="fa-solid fa-trash-can fa-lg"></i>
                          </button>

                        </div>
                        <div class=" col text-left "> {{ i.id }} </div>
                        <div class=" col text-left"> {{ i.doorName }} </div>
                        <div class=" col text-left">
                          <span v-if="i.status" style="color:green">Aktif</span>
                          <span v-else style="color:red">Pasif</span>
                        </div>
                      </div>
                      <!-- Content end -->



                    </div>
                  </div>
                  <!-- Md Screen Div Table End -->


                  <!-- Sm Screen Div Table Start -->
                  <div class="sm-screen">

                    <div>
                      <p style="font-size: 22px; margin-left: 30px;">
                        Kapı Listesi
                      </p>

                      <q-input borderless filled dense debounce="300" v-model="filter" placeholder="Arama Yapınız" />
                      <q-btn icon="search" outline style="color: gray; margin-left: 3px;" @click="GetListData(filter)" />

                    </div>

                    <div class="sm-card" v-for="i in data.doorCard" :key="i">

                      <div class="sm-row">
                        <div class="sm-title"></div>
                        <div class="sm-content">
                          <button class="btn" style="border:none;" @click="updateSectionDesModal(i)" title="Düzenle">
                            <i class="fa-solid fa-pen-to-square"></i>
                          </button>

                          <button class="btn" style="border:none;" title="Durumu" @click="deleteSectionDesModal(i)">
                            <i class="fa-solid fa-trash-can"></i>
                          </button>

                        </div>
                      </div>

                      <div class="sm-row">
                        <div class="sm-title">#</div>
                        <div class="sm-content">{{ i.id }}</div>
                      </div>

                      <div class="sm-row">
                        <div class="sm-title">Kapı Adı</div>
                        <div class="sm-content">{{ i.doorName }}</div>
                      </div>

                      <div class="sm-row">
                        <div class="sm-title">Durum</div>
                        <div class="sm-content">
                          <span v-if="i.status" style="color:green">Aktif</span>
                          <span v-else style="color:red">Pasif</span>
                        </div>
                      </div>

                    </div>
                  </div>
                  <!-- Sm Screen Div Table End -->

                </div>
                <!-- Data Screen Div Table End -->

              </q-card-section>
            </div>
          </q-slide-transition>
        </q-card>

        <q-card class="my-card" style="margin: 10px 0 10px 0;" flat bordered>
          <q-card-actions @click="instructionCard = !instructionCard" style="cursor: pointer;">
            <q-btn flat color="primary" label="Talimatname" />
            <q-space />
            <q-btn color="grey" round flat dense :icon="instructionCard ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" />
          </q-card-actions>

          <q-slide-transition>
            <div v-show="instructionCard">
              <q-separator />
              <q-card-section class="text-subtitle2">
                dfd dfdfd df dfd df lorem
              </q-card-section>
            </div>
          </q-slide-transition>
        </q-card>

        <q-card class="my-card" flat bordered>
          <q-card-actions @click="educationCard = !educationCard" style="cursor: pointer;">
            <q-btn flat color="primary" label="Eğitim Video" />
            <q-space />
            <q-btn color="grey" round flat dense :icon="educationCard ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" />
          </q-card-actions>

          <q-slide-transition>
            <div v-show="educationCard">
              <q-separator />
              <q-card-section class="text-subtitle2">
                dfd dfdfd df dfd df lorem
              </q-card-section>
            </div>
          </q-slide-transition>
        </q-card>
      </div>



    </q-page-container>

  </page-container>


  <!-- Add and Update Modal Start -->
  <form-modal-dialog v-model="addUpdateDialog" title="Kapı" icon="fa-solid fa-briefcase" negative="Kapat"
    @positive="updateCommit()">







  </form-modal-dialog>
  <!-- Add and Update Modal End -->

  <!-- Delete modal start -->
  <form-modal-dialog v-model="deleteDialog" title="Sözleşme Silme Onayı" icon="fa-solid fa-trash" @positive="del()"
    positive="Sil" negative="Kapat" persistent>
    <span class="q-ml-sm">
      <p>{{ dataItem.doorCard.doorName }} kapısını silinmesini onaylıyor musunuz ?</p>
    </span>
  </form-modal-dialog>
  <!-- Delete modal end -->
</template>


<script setup>
import { ref } from 'vue'
import PageContainer from 'components/PageContainer.vue'
import FormModalDialog from 'components/FormModalDialog.vue'
import data from 'src/data/visitorDefinition.json'

/* add modal start */
var dataItem = ref({
  affiliatesIsShow: false
});

const addUpdateDialog = ref(false);

var doorCard = ref(true)
var instructionCard = ref(false)
var educationCard = ref(false)

const addSectionDesModal = () => {
  addUpdateDialog.value = true
  dataItem.workplace = null
  //dataItem.agreementType[0]
}
/* add modal end */


/* update modal start */
const updateSectionDesModal = (item) => {
  Object.assign(dataItem.value, item)
  addUpdateDialog.value = true
}
/* update modal end */




/* delete modal start */
var deleteDialog = ref(false)
const deleteSectionDesModal = (item) => {
  Object.assign(dataItem.value, item)
  deleteDialog.value = true
}
/* delete modal end */



const GetRowClass = (i) => {
  console.log(i);
  if (i % 2 == 0) {
    return 'light-row';
  } else {
    return '';
  }
}

</script>
<style  lang="scss">
.md-screen {
  display: none;
}

.sm-screen {
  display: none;
}

.light-row {
  background-color: #eee;
  color: #000;
}

@media (min-width: 600px) {
  .md-screen {
    display: block;
  }
}

@media (max-width: 599px) {
  .sm-screen {
    display: block;
  }
}

.sm-card {
  border: 1px solid #ccc;
  margin: 20px;
  border-radius: 10px;
  padding: 10px;
}

.sm-row {
  border-bottom: 1px solid #e8e8e8;
  padding: 3px;
}

.sm-title {

  color: gray;
}

.sm-content {}

.div-table {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
}

.div-row {
  border-bottom: 1px solid #ccc;
  padding: 10px;
}

.div-row:hover {
  background: rgba(205, 211, 220, 0.867);

}

.btn {
  background: transparent;
  cursor: pointer;
}

.input-group {
  margin-bottom: 5px;
}
</style>
