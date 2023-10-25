<template>
  <page-container title="Belge Tanımlama">

    <template #icon>
      <i class="fa-solid fa-file-lines fa-xl"></i>
    </template>

    <q-page-container>
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
                  Belge Listesi
                </p>
              </div>
              <div class="col text-right">

                <div class="row">
                  <q-input class="col-9" borderless filled dense debounce="300" v-model="filter"
                    placeholder="Arama Yapınız" />
                  <q-btn class="col-1" icon="search" outline style="color: gray; margin-left: 3px;"
                    @click="GetListData(filter)" />


                  <q-select class="col-1" style="margin-left: 30px;" borderless dense debounce="300"
                    :options="['Rapor Oluştur', 'Pdf', 'Excel', 'Csv']" dropdown-icon="fa-solid fa-bars" />

                </div>


              </div>

            </div>
            <!-- Banner end -->


            <!-- Header start -->
            <div class="row">
              <div class="col text-left"></div>
              <div class="col text-left text-bold">#</div>
              <div class="col text-left text-bold">Belge Adı</div>
              <div class="col text-left text-bold" style="margin-right: 10px;">Bağlı Olduğu Şirket Görünsün Mü
              </div>
              <div class="col text-left text-bold">Durum</div>
            </div>
            <hr>
            <!-- Header end -->


            <!-- Content start -->
            <div class="row div-row" v-for="(i, index) in data" :key="i" :class="GetRowClass(index)">
              <div class=" col text-left active-btn ">
                <button class="btn" style="border:none;" @click="updateSectionDesModal(i)" title="Düzenle">
                  <i class="fa-solid fa-pen-to-square fa-lg"></i>
                </button>

                <button class="btn" style="border:none;" title="Durumu" @click="deleteSectionDesModal(i)">
                  <i class="fa-solid fa-trash-can fa-lg"></i>
                </button>

              </div>
              <div class=" col text-left "> {{ i.id }} </div>
              <div class=" col text-left"> {{ i.fileName }} </div>
              <div class=" col text-left">
                <span v-if="i.affiliatesIsShow" style="color:green">
                  <i class="fa-solid fa-check"></i>
                </span>
                <span v-else style="color:red">
                  <i class="fa-solid fa-xmark"></i>
                </span>
              </div>
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
              Belge Listesi
            </p>

            <q-input borderless filled dense debounce="300" v-model="filter" placeholder="Arama Yapınız" />
            <q-btn icon="search" outline style="color: gray; margin-left: 3px;" @click="GetListData(filter)" />


            <q-select style="margin-left: 30px;" borderless filled dense debounce="300"
              :options="['Rapor Oluştur', 'Pdf', 'Excel', 'Csv']" label="Filled" dropdown-icon="fa-solid fa-bars" />
          </div>

          <div class="sm-card" v-for="i in data" :key="i">

            <div class="sm-row">
              <div class="sm-title"></div>
              <div class="sm-content">
                <button class="btn" style="border:none;" @click="updateSectionDesModal(props.row)" title="Düzenle">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>

                <button class="btn" style="border:none;" title="Durumu" @click="deleteSectionDesModal(props.row)">
                  <i class="fa-solid fa-trash-can"></i>
                </button>

              </div>
            </div>

            <div class="sm-row">
              <div class="sm-title">#</div>
              <div class="sm-content">{{ i.id }}</div>
            </div>

            <div class="sm-row">
              <div class="sm-title">Belge Adı</div>
              <div class="sm-content">{{ i.fileName }}</div>
            </div>


            <div class="sm-row">
              <div class="sm-title">Bağlı Olduğu Şirket Görünecek mi</div>
              <div class="sm-content">
                <span v-if="i.affiliatesIsShow" style="color:green">
                  <i class="fa-solid fa-check"></i>
                </span>
                <span v-else style="color:red">
                  <i class="fa-solid fa-xmark"></i>
                </span>
              </div>
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



    </q-page-container>

  </page-container>


  <!-- Add and Update Modal Start -->
  <!-- :positive="currentItem.id ? 'Güncelle' : 'Ekle'"
  v-model="currentItem.type" :virtual-scroll-horizontal="false"
  -->
  <form-modal-dialog v-model="addUpdateDialog" title="Belge" icon="fa-solid fa-briefcase" negative="Kapat"
    @positive="updateCommit()">



    <div class="input-group">
      <q-input class="txt" v-model="dataItem.fileName" filled label="Belge Adı" lazy-rules
        :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
    </div>

    <div class="input-group">
      <q-toggle v-model="dataItem.affiliatesIsShow" label="Bağlı Şirketler Görsün mü ? " />
    </div>






  </form-modal-dialog>
  <!-- Add and Update Modal End -->

  <!-- Delete modal start -->
  <form-modal-dialog v-model="deleteDialog" title="Görev Silme Onayı" icon="fa-solid fa-trash" @positive="del()"
    positive="Sil" negative="Kapat" persistent>
    <span class="q-ml-sm">
      <p>{{ dataItem.taskName }} görevin silinmesini onaylıyor musunuz ?</p>
    </span>
  </form-modal-dialog>
  <!-- Delete modal end -->
</template>


<script setup>
import { ref } from 'vue'
import PageContainer from 'components/PageContainer.vue'
import FormModalDialog from 'components/FormModalDialog.vue'
import data from 'src/data/fileDefinition.json'



/* add modal start */
var dataItem = ref({
  affiliatesIsShow: false
});

const addUpdateDialog = ref(false);

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
