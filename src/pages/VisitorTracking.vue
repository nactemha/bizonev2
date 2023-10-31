<template>
  <page-container title="Ziyaretçi Takibi">
    <template #icon>
      <i class="fa-solid fa-user-clock fa-xl"></i>
    </template>

    <q-page-container>


      <div class="q-pa-md ">

        <q-card class="my-card" flat bordered>
          <q-card-actions @click="newInsertCard = !newInsertCard" style="cursor: pointer;">
            <q-btn flat color="primary" label="Yeni Kayıt" />
            <q-space />
            <q-btn color="grey" round flat dense :icon="newInsertCard ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" />
          </q-card-actions>

          <q-slide-transition>
            <div v-show="newInsertCard">
              <q-separator />
              <q-card-section class="text-subtitle2">

                <!-- Add and update button start -->
                <div class="q-pa-md q-gutter-sm">
                  <q-btn label="Ekle" color="primary" @click="AddNewInsertModal()" icon="fa-solid fa-plus" />
                </div>
                <!-- Add and update button end -->


                <!-- Data Screen Div Table Start -->
                <div>

                  <!-- Md Screen Div Table Start -->
                  <div class="md-screen">
                    <div class="q-ma-md div-table" style="border:none">

                      <!-- Banner start -->
                      <div class="row ">
                        <div class="col text-left">
                          <p style="font-size: 22px;">
                            Kayıt Listesi
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
                      <div class="row" style="margin-top:30px ;">
                        <div class="col text-left"></div>
                        <div class="col text-left text-bold">#</div>
                        <div class="col text-left text-bold">Ad Soyad</div>
                        <div class="col text-left text-bold">Kimlik Türü</div>
                        <div class="col text-left text-bold">T.C. No</div>
                        <div class="col text-left text-bold">Kart No</div>
                        <div class="col text-left text-bold">Araç Plaka</div>
                        <div class="col text-left text-bold">Firma</div>
                        <div class="col text-left text-bold">Ziyaret Nedeni</div>
                        <div class="col text-left text-bold">Onay Veren</div>
                        <div class="col text-left text-bold">Onay Durumu</div>
                        <div class="col text-left text-bold">Kaydı Giren</div>
                        <div class="col text-left text-bold">Ziyaret Edilen Yer</div>
                        <div class="col text-left text-bold">ISG Taahütnamesi</div>
                        <div class="col text-left text-bold">Durumu</div>
                      </div>
                      <hr>
                      <!-- Header end -->


                      <!-- Content start -->
                      <div class="row div-row" v-for="(i, index) in dataItem.newInsert" :key="i"
                        :class="GetRowClass(index)">
                        <div class=" col text-left active-btn ">
                          <button class="btn" style="border:none;" @click="updateSectionDesModal(i)" title="Düzenle">
                            <i class="fa-solid fa-pen-to-square fa-lg"></i>
                          </button>

                          <button class="btn" style="border:none;" title="Durumu" @click="deleteSectionDesModal(i)">
                            <i class="fa-solid fa-trash-can fa-lg"></i>
                          </button>

                        </div>
                        <div class=" col text-left "> {{ i.id }} </div>
                        <div class=" col text-left"> {{ i.name }} {{ i.surname }} </div>
                        <div class=" col text-left"> {{ i.idType }} </div>
                        <div class=" col text-left"> {{ i.tcNo }} </div>
                        <div class=" col text-left"> {{ i.cardNo }} </div>
                        <div class=" col text-left"> {{ i.carPlate }} </div>
                        <div class=" col text-left"> {{ i.company }} </div>
                        <div class=" col text-left"> {{ i.visitCause }} </div>
                        <div class=" col text-left"> {{ i.approvalUser }} </div>
                        <div class=" col text-left"> {{ i.approvalStatus }} </div>
                        <div class=" col text-left"> {{ i.insertUser }} </div>
                        <div class=" col text-left"> {{ i.visitPlace }} </div>
                        <div class=" col text-left"> {{ i.ohsCommitment }} </div>
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
                        Kayıt Listesi
                      </p>

                      <q-input borderless filled dense debounce="300" v-model="filter" placeholder="Arama Yapınız" />
                      <q-btn icon="search" outline style="color: gray; margin-left: 3px;" @click="GetListData(filter)" />

                    </div>

                    <div class="sm-card" v-for="i in dataItem.newInsert" :key="i">

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
                        <div class="sm-title">Ad Soyad</div>
                        <div class="sm-content">{{ i.name }} {{ i.surname }}</div>
                      </div>

                      <div class="sm-row">
                        <div class="sm-title">Kimlik Türü</div>
                        <div class="sm-content">{{ i.tcNo }}</div>
                      </div>

                      <div class="sm-row">
                        <div class="sm-title">T.C. No</div>
                        <div class="sm-content">{{ i.tcNo }}</div>
                      </div>

                      <div class="sm-row">
                        <div class="sm-title">Kart No</div>
                        <div class="sm-content">{{ i.cardNo }}</div>
                      </div>

                      <div class="sm-row">
                        <div class="sm-title">Araç Plaka</div>
                        <div class="sm-content">{{ i.carPlate }}</div>
                      </div>

                      <div class="sm-row">
                        <div class="sm-title">Firma</div>
                        <div class="sm-content">{{ i.company }}</div>
                      </div>

                      <div class="sm-row">
                        <div class="sm-title">Ziyaret Nedeni</div>
                        <div class="sm-content">{{ i.visitCause }}</div>
                      </div>

                      <div class="sm-row">
                        <div class="sm-title">Onay Veren</div>
                        <div class="sm-content">{{ i.approvalUser }}</div>
                      </div>

                      <div class="sm-row">
                        <div class="sm-title">Onay Durumu</div>
                        <div class="sm-content">{{ i.approvalStatus }}</div>
                      </div>

                      <div class="sm-row">
                        <div class="sm-title">Kaydı Giren</div>
                        <div class="sm-content">{{ i.insertUser }}</div>
                      </div>

                      <div class="sm-row">
                        <div class="sm-title">Ziyaret Edilen Yer</div>
                        <div class="sm-content">{{ i.visitPlace }}</div>
                      </div>

                      <div class="sm-row">
                        <div class="sm-title">ISG Taahütnamesi</div>
                        <div class="sm-content">{{ i.ohsCommitment }}</div>
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
          <q-card-actions @click="insideCard = !insideCard" style="cursor: pointer;">
            <q-btn flat color="primary" label="İçerde" />
            <q-space />
            <q-btn color="grey" round flat dense :icon="insideCard ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" />
          </q-card-actions>

          <q-slide-transition>
            <div v-show="insideCard">
              <q-separator />
              <q-card-section class="text-subtitle2">

                <!-- Add and update button start -->
                <div class="q-pa-md q-gutter-sm">
                  <q-btn label="Ekle" color="primary" @click="AddNewInsertModal()" icon="fa-solid fa-plus" />
                </div>
                <!-- Add and update button end -->


                <!-- Data Screen Div Table Start -->
                <div>

                  <!-- Md Screen Div Table Start -->
                  <div class="md-screen">
                    <div class="q-ma-md div-table" style="border:none">

                      <!-- Banner start -->
                      <div class="row ">
                        <div class="col text-left">
                          <p style="font-size: 22px;">
                            İçerde Listesi
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
                      <div class="row" style="margin-top:30px ;">
                        <div class="col text-left"></div>
                        <div class="col text-left text-bold">#</div>
                        <div class="col text-left text-bold">Ad Soyad</div>
                        <div class="col text-left text-bold">Kimlik Türü</div>
                        <div class="col text-left text-bold">T.C. No</div>
                        <div class="col text-left text-bold">Kart No</div>
                        <div class="col text-left text-bold">Araç Plaka</div>
                        <div class="col text-left text-bold">Firma</div>
                        <div class="col text-left text-bold">Ziyaret Nedeni</div>
                        <div class="col text-left text-bold">Ziyaret Edilen</div>
                        <div class="col text-left text-bold">Onay Veren</div>
                        <div class="col text-left text-bold">Kabul Eden Görevli</div>
                        <div class="col text-left text-bold">Onay Durumu</div>
                        <div class="col text-left text-bold">Kaydı Giren</div>
                        <div class="col text-left text-bold">Kaydı Giren</div>
                        <div class="col text-left text-bold">Ziyaret Edilen Yer</div>
                        <div class="col text-left text-bold">Giriş Zamanı</div>
                        <div class="col text-left text-bold">ISG Taahütnamesi</div>
                        <div class="col text-left text-bold">Durumu</div>
                      </div>
                      <hr>
                      <!-- Header end -->


                      <!-- Content start -->
                      <div class="row div-row" v-for="(i, index) in dataItem.inside" :key="i" :class="GetRowClass(index)">
                        <div class=" col text-left active-btn ">
                          <button class="btn" style="border:none;" @click="updateSectionDesModal(i)" title="Düzenle">
                            <i class="fa-solid fa-pen-to-square fa-lg"></i>
                          </button>

                          <button class="btn" style="border:none;" title="Durumu" @click="deleteSectionDesModal(i)">
                            <i class="fa-solid fa-trash-can fa-lg"></i>
                          </button>

                        </div>
                        <div class=" col text-left "> {{ i.id }} </div>
                        <div class=" col text-left"> {{ i.name }} {{ i.surname }} </div>
                        <div class=" col text-left"> {{ i.idType }} </div>
                        <div class=" col text-left"> {{ i.tcNo }} </div>
                        <div class=" col text-left"> {{ i.cardNo }} </div>
                        <div class=" col text-left"> {{ i.carPlate }} </div>
                        <div class=" col text-left"> {{ i.company }} </div>
                        <div class=" col text-left"> {{ i.visitCause }} </div>
                        <div class=" col text-left"> {{ i.approvalUser }} </div>
                        <div class=" col text-left"> {{ i.approvalStatus }} </div>
                        <div class=" col text-left"> {{ i.insertUser }} </div>
                        <div class=" col text-left"> {{ i.visitPlace }} </div>
                        <div class=" col text-left"> {{ i.ohsCommitment }} </div>
                        <div class=" col text-left"> {{ i.ohsCommitment }} </div>
                        <div class=" col text-left"> {{ i.ohsCommitment }} </div>
                        <div class=" col text-left"> {{ i.ohsCommitment }} </div>
                        <div class=" col text-left"> {{ i.ohsCommitment }} </div>
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
                        Kayıt Listesi
                      </p>

                      <q-input borderless filled dense debounce="300" v-model="filter" placeholder="Arama Yapınız" />
                      <q-btn icon="search" outline style="color: gray; margin-left: 3px;" @click="GetListData(filter)" />

                    </div>

                    <div class="sm-card" v-for="i in data.newInsertCard" :key="i">

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
                        <div class="sm-title">Ad Soyad</div>
                        <div class="sm-content">{{ i.name }} {{ i.surname }}</div>
                      </div>

                      <div class="sm-row">
                        <div class="sm-title">Kimlik Türü</div>
                        <div class="sm-content">{{ i.tcNo }}</div>
                      </div>

                      <div class="sm-row">
                        <div class="sm-title">T.C. No</div>
                        <div class="sm-content">{{ i.tcNo }}</div>
                      </div>

                      <div class="sm-row">
                        <div class="sm-title">Kart No</div>
                        <div class="sm-content">{{ i.cardNo }}</div>
                      </div>

                      <div class="sm-row">
                        <div class="sm-title">Araç Plaka</div>
                        <div class="sm-content">{{ i.carPlate }}</div>
                      </div>

                      <div class="sm-row">
                        <div class="sm-title">Firma</div>
                        <div class="sm-content">{{ i.company }}</div>
                      </div>

                      <div class="sm-row">
                        <div class="sm-title">Ziyaret Nedeni</div>
                        <div class="sm-content">{{ i.visitCause }}</div>
                      </div>

                      <div class="sm-row">
                        <div class="sm-title">Onay Veren</div>
                        <div class="sm-content">{{ i.approvalUser }}</div>
                      </div>

                      <div class="sm-row">
                        <div class="sm-title">Onay Durumu</div>
                        <div class="sm-content">{{ i.approvalStatus }}</div>
                      </div>

                      <div class="sm-row">
                        <div class="sm-title">Kaydı Giren</div>
                        <div class="sm-content">{{ i.insertUser }}</div>
                      </div>

                      <div class="sm-row">
                        <div class="sm-title">Ziyaret Edilen Yer</div>
                        <div class="sm-content">{{ i.visitPlace }}</div>
                      </div>

                      <div class="sm-row">
                        <div class="sm-title">ISG Taahütnamesi</div>
                        <div class="sm-content">{{ i.ohsCommitment }}</div>
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

        <q-card class="my-card" flat bordered style="margin: 10px 0 10px 0;">
          <q-card-actions @click="endingsCard = !endingsCard" style="cursor: pointer;">
            <q-btn flat color="primary" label="Sonlananlar" />
            <q-space />
            <q-btn color="grey" round flat dense :icon="endingsCard ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" />
          </q-card-actions>

          <q-slide-transition>
            <div v-show="endingsCard">
              <q-separator />
              <q-card-section class="text-subtitle2">
                dfd dfdfd df dfd df lorem
              </q-card-section>
            </div>
          </q-slide-transition>
        </q-card>

        <q-card class="my-card" flat bordered>
          <q-card-actions @click="canceledCard = !canceledCard" style="cursor: pointer;">
            <q-btn flat color="primary" label="İptal Edilenler" />
            <q-space />
            <q-btn color="grey" round flat dense :icon="canceledCard ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" />
          </q-card-actions>

          <q-slide-transition>
            <div v-show="canceledCard">
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
  <form-modal-dialog v-model="addNewInsertDialog" title="Kayıt" icon="fa-solid fa-briefcase" negative="Kapat"
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
import data from 'src/data/visitorTracking.json'

/* add modal start */
var dataItem = ref({});

dataItem = data

const addNewInsertDialog = ref(false);

var newInsertCard = ref(true)
var insideCard = ref(false)
var endingsCard = ref(false)
var canceledCard = ref(false)

const AddNewInsertModal = () => {
  addNewInsertDialog.value = true
}
/* addNewInsertModal add modal end */



/* addInsideModal add modal start */
const AddInsideModal = () => {
}
/* addInsideModal add modal end */

/* addEndingsModal add modal start */
const AddEndingsModal = () => {
}
/* addEndingsModal add modal end */

/* addCanceledModal add modal start */
const AddCanceledModal = () => {
}
/* addCanceledModal add modal end */





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

@media (min-width: 800px) {
  .md-screen {
    display: block;
  }
}

@media (max-width: 799px) {
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
