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
                  <q-btn label="Ekle" color="primary" @click="addDoorCardModal()" icon="fa-solid fa-plus" />
                </div>
                <!-- Add and update button end -->


                <!-- Data Screen Div Table Start -->
                <div>

                  <!-- Md Screen Div Table Start -->
                  <div class="md-screen">
                    <div class="q-ma-md div-table" style="border: none;">

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

                          <button class="btn" style="border:none;" title="Durumu" @click="deleteDoorCardModal(i)">
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

                          <button class="btn" style="border:none;" title="Durumu" @click="deleteDoorCardModal(i)">
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

                <!-- Add and update button start -->
                <div class="q-pa-md q-gutter-sm">
                  <q-btn label="Ekle" color="primary" @click="addInstructionCardModal()" icon="fa-solid fa-plus" />
                </div>
                <!-- Add and update button end -->


                <!-- Data Screen Div Table Start -->
                <div>

                  <!-- Md Screen Div Table Start -->
                  <div class="md-screen">
                    <div class="q-ma-md div-table" style="border: none;">

                      <!-- Banner start -->
                      <div class="row ">
                        <div class="col text-left">
                          <p style="font-size: 22px;">
                            Talimatname Listesi
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
                        <div class="col text-left text-bold">Revizyon No</div>
                        <div class="col text-left text-bold">Talimatname Adı</div>
                        <div class="col text-left text-bold">Durum</div>
                      </div>
                      <hr>
                      <!-- Header end -->


                      <!-- Content start -->
                      <div class="row div-row" v-for="(i, index) in data.instructionCard" :key="i"
                        :class="GetRowClass(index)">
                        <div class=" col text-left active-btn ">
                          <button class="btn" style="border:none;" title="Düzenle">
                            <i class="fa-solid fa-pen-to-square fa-lg"></i>
                          </button>

                          <button class="btn" style="border:none;" title="Durumu" @click="deleteInstructionCardModal(i)">
                            <i class="fa-solid fa-trash-can fa-lg"></i>
                          </button>

                        </div>
                        <div class=" col text-left "> {{ i.id }} </div>
                        <div class=" col text-left"> {{ i.revisionNo }} </div>
                        <div class=" col text-left"> {{ i.instructionName }} </div>
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
                        Talimatname Listesi
                      </p>

                      <q-input borderless filled dense debounce="300" v-model="filter" placeholder="Arama Yapınız" />
                      <q-btn icon="search" outline style="color: gray; margin-left: 3px;" @click="GetListData(filter)" />

                    </div>

                    <div class="sm-card" v-for="i in data.instructionCard" :key="i">

                      <div class="sm-row">
                        <div class="sm-title"></div>
                        <div class="sm-content">
                          <button class="btn" style="border:none;" @click="updateSectionDesModal(i)" title="Düzenle">
                            <i class="fa-solid fa-pen-to-square"></i>
                          </button>

                          <button class="btn" style="border:none;" title="Durumu" @click="deleteInstructionCardModal(i)">
                            <i class="fa-solid fa-trash-can"></i>
                          </button>

                        </div>
                      </div>

                      <div class="sm-row">
                        <div class="sm-title">#</div>
                        <div class="sm-content">{{ i.id }}</div>
                      </div>

                      <div class="sm-row">
                        <div class="sm-title">Revizyon No</div>
                        <div class="sm-content">{{ i.revisionNo }}</div>
                      </div>

                      <div class="sm-row">
                        <div class="sm-title">Talimatname Adı</div>
                        <div class="sm-content">{{ i.instructionName }}</div>
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

                <!-- Add and update button start -->
                <div class="q-pa-md q-gutter-sm">
                  <q-btn label="Ekle" color="primary" @click="addUpdateDialogEducationCardModal()"
                    icon="fa-solid fa-plus" />
                </div>
                <!-- Add and update button end -->


                <!-- Data Screen Div Table Start -->
                <div>

                  <!-- Md Screen Div Table Start -->
                  <div class="md-screen">
                    <div class="q-ma-md div-table" style="border: none;">

                      <!-- Banner start -->
                      <div class="row ">
                        <div class="col text-left">
                          <p style="font-size: 22px;">
                            Video Listesi
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
                        <div class="col text-left text-bold">Video Adı</div>
                        <div class="col text-left text-bold">Durum</div>
                      </div>
                      <hr>
                      <!-- Header end -->


                      <!-- Content start -->
                      <div class="row div-row" v-for="(i, index) in data.educationCard" :key="i"
                        :class="GetRowClass(index)">
                        <div class=" col text-left active-btn ">
                          <button class="btn" style="border:none;" @click="updateSectionDesModal(i)" title="Düzenle">
                            <i class="fa-solid fa-pen-to-square fa-lg"></i>
                          </button>

                          <button class="btn" style="border:none;" title="Durumu" @click="deleteEducationCardModal(i)">
                            <i class="fa-solid fa-trash-can fa-lg"></i>
                          </button>

                          <button class="btn" style="border:none;" title="Videoyu izle">
                            <i class="fa-solid fa-video fa-lg"></i>
                          </button>


                        </div>
                        <div class=" col text-left "> {{ i.id }} </div>
                        <div class=" col text-left"> {{ i.videoName }} </div>
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
                        Video Listesi
                      </p>

                      <q-input borderless filled dense debounce="300" v-model="filter" placeholder="Arama Yapınız" />
                      <q-btn icon="search" outline style="color: gray; margin-left: 3px;" @click="GetListData(filter)" />

                    </div>

                    <div class="sm-card" v-for="i in data.educationCard" :key="i">

                      <div class="sm-row">
                        <div class="sm-title"></div>
                        <div class="sm-content">
                          <button class="btn" style="border:none;" @click="updateSectionDesModal(i)" title="Düzenle">
                            <i class="fa-solid fa-pen-to-square"></i>
                          </button>

                          <button class="btn" style="border:none;" title="Durumu" @click="deleteEducationCardModal(i)">
                            <i class="fa-solid fa-trash-can"></i>
                          </button>

                          <button class="btn" style="border:none;" title="Videoyu İzle">
                            <i class="fa-solid fa-video"></i>
                          </button>

                        </div>
                      </div>

                      <div class="sm-row">
                        <div class="sm-title">#</div>
                        <div class="sm-content">{{ i.id }}</div>
                      </div>

                      <div class="sm-row">
                        <div class="sm-title">Video Adı</div>
                        <div class="sm-content">{{ i.videoName }}</div>
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
      </div>



    </q-page-container>

  </page-container>


  <!-- doorCard Add and Update Modal Start -->
  <form-modal-dialog v-model="addUpdateDialogDoorCard" title="Kapı" icon="fa-solid fa-door-open" negative="Kapat"
    @positive="updateCommit()">

    <div class="input-group">
      <q-input class="txt" v-model="data.doorCard.doorName" filled label="Kapı Adı" lazy-rules
        :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
    </div>


  </form-modal-dialog>
  <!-- doorCard Add and Update Modal End -->

  <!-- addUpdateDialogInstructionCard Add and Update Modal Start -->
  <form-modal-dialog v-model="addUpdateDialogInstructionCard" title="Talimatname" icon="fa-solid fa-person-chalkboard"
    negative="Kapat" @positive="updateCommit()">


    <span>Yapılacak...</span>

  </form-modal-dialog>
  <!-- addUpdateDialogInstructionCard Add and Update Modal End -->

  <!-- addUpdateDialogEducationCard Add and Update Modal Start -->
  <form-modal-dialog v-model="addUpdateDialogEducationCard" title="Eğitim Videosu" icon="fa-solid fa-door-open"
    negative="Kapat" @positive="updateCommit()">

    <div class="input-group">
      <q-input class="txt" v-model="data.educationCard.videoName" filled label="Video Adı" lazy-rules
        :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
    </div>

    <div class="input-group">
      <q-input class="txt" v-model="data.educationCard.videoUrl" filled label="Video Url" lazy-rules
        :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
    </div>


  </form-modal-dialog>
  <!-- addUpdateDialogEducationCard Add and Update Modal End -->

  <!-- Delete modal start -->
  <form-modal-dialog v-model="deleteDoorCardDialog" title="Kapı Silme Onayı" icon="fa-solid fa-trash" @positive="del()"
    positive="Sil" negative="Kapat" persistent>
    <span class="q-ml-sm">
      <p>{{ dataitem.doorCard.doorName }} kapısını silinmesini onaylıyor musunuz ?</p>
    </span>
  </form-modal-dialog>
  <!-- Delete modal end -->

  <!-- Delete modal start -->
  <form-modal-dialog v-model="deleteInstructionCardDialog" title="Talimatname Silme Onayı" icon="fa-solid fa-trash"
    @positive="del()" positive="Sil" negative="Kapat" persistent>
    <span class="q-ml-sm">
      <p>{{ data.instructionCard.revisionNo }} talimatnamenin silinmesini onaylıyor musunuz ?</p>
    </span>
  </form-modal-dialog>
  <!-- Delete modal end -->

  <!-- Delete modal start -->
  <form-modal-dialog v-model="deleteEducationCardDialog" title="Eğitim Silme Onayı" icon="fa-solid fa-trash"
    @positive="del()" positive="Sil" negative="Kapat" persistent>
    <span class="q-ml-sm">
      <p>{{ data.educationCard.videoName }} eğitimin silinmesini onaylıyor musunuz ?</p>
    </span>
  </form-modal-dialog>
  <!-- Delete modal end -->
</template>


<script setup>
import { ref } from 'vue'
import PageContainer from 'components/PageContainer.vue'
import FormModalDialog from 'components/FormModalDialog.vue'
import data from 'src/data/visitorDefinition.json'

/* DoorCard add modal start */
var dataItem = ref({
  doorCard: [],
  instructionCard: [],
  educationCard: []
});

var addUpdateDialogDoorCard = ref(false);
var addUpdateDialogInstructionCard = ref(false);
var addUpdateDialogEducationCard = ref(false);

var doorCard = ref(true)
var instructionCard = ref(false)
var educationCard = ref(false)

const addDoorCardModal = () => {
  addUpdateDialogDoorCard.value = true
}
/* DoorCard add modal end */

/* instructionCard add modal end */
const addInstructionCardModal = () => {
  addUpdateDialogInstructionCard.value = true
}
/* instructionCard add modal end */

/* instructionCard add modal end */
const addUpdateDialogEducationCardModal = () => {
  addUpdateDialogEducationCard.value = true
}
/* instructionCard add modal end */


/* update modal start */
const updateSectionDesModal = (item) => {
  Object.assign(dataItem.value, item)
  addUpdateDialogDoorCard.value = true
}
/* update modal end */




/* delete modal start */
var deleteDoorCardDialog = ref(false)
const deleteDoorCardModal = (item) => {
  // dataItem.doorCard.push(item);
  //Object.assign(dataItem.doorCard.value, item)
  console.log(dataItem);
  deleteDoorCardDialog.value = true
}
/* delete modal end */

/* delete modal start */
var deleteInstructionCardDialog = ref(false)
const deleteInstructionCardModal = (item) => {
  Object.assign(dataItem.value, item)
  deleteInstructionCardDialog.value = true
}
/* delete modal end */

/* delete modal start */
var deleteEducationCardDialog = ref(false)
const deleteEducationCardModal = (item) => {
  Object.assign(dataItem.value, item)
  deleteEducationCardDialog.value = true
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
