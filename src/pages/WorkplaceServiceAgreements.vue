<template>
  <page-container title="İşyeri Hizmet Sözleşmeleri">
    <template #icon>
      <i class="fa-solid fa-handshake"></i>
    </template>

    <q-page-container>
      <!-- Add and update button start -->
      <div class="q-pa-md q-gutter-sm">
        <q-btn label="Ekle" color="primary" @click="addAgreementModal()" icon="fa-solid fa-plus" />
      </div>
      <!-- Add and update button end -->

      <!-- Data Table Start -->
      <div class="q-pa-md">

        <q-table :grid="$q.screen.xs" flat bordered title="İşyeri Sözleşme Listesi" ref="tableRef" :rows="data"
          :columns="columns" row-key="id" v-model:pagination="pagination" :loading="loading" :filter="filter"
          binary-state-sort @request="onRequest">
          <template v-slot:top-right>
            <q-input borderless filled dense debounce="300" v-model="filter" placeholder="Arama Yapınız">
              <!--  <template v-slot:append>
                </template> -->
            </q-input>
            <q-btn icon="search" outline style="color: gray; margin-left: 3px;" @click="GetListData(filter)" />


            <q-select style="margin-left: 30px;" borderless filled dense debounce="300"
              :options="['Rapor Oluştur', 'Pdf', 'Excel', 'Csv']" label="Filled" dropdown-icon="fa-solid fa-bars" />

          </template>


          <template v-slot:body-cell-settings="props">

            <q-td :props="props">
              <button class="btn" style="border:none;" @click="updateEducationalPlanModal(props.row)" title="Düzenle">
                <i class="fa-solid fa-pen-to-square fa-lg"></i>
              </button>

              <button class="btn" style="border:none;" title="Durumu" @click="deleteEducationalPlanModal(props.row)">
                <i class="fa-solid fa-trash-can fa-lg"></i>
              </button>

            </q-td>

          </template>

        </q-table>
      </div>
      <!-- Data Table End -->


    </q-page-container>

  </page-container>


  <!-- Add and Update Modal Start -->
  <!-- :positive="currentItem.id ? 'Güncelle' : 'Ekle'"
  v-model="currentItem.type" :virtual-scroll-horizontal="false"
  -->
  <form-modal-dialog v-model="addUpdateDialog" title="İşyeri Sözleşmesi" icon="fa-solid fa-file-contract" negative="Kapat"
    @positive="updateCommit()">

    <div class="input-group">
      <q-select class="txt" filled v-model="dataItem.workplace"
        :options="['Seçiniz', 'Arge 360', 'Garanti Bankası', 'İş Bankası']" label="Şirket Bilgisi" lazy-rules
        :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
    </div>

    <div class="input-group">
      <q-select class="txt" filled v-model="dataItem.agreementType"
        :options="['Seçiniz', 'Belirli Süre', 'Belirsiz Süre']" label="Sözleşme Türü" lazy-rules
        :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
    </div>

    <div class="input-group">
      <q-input class="txt" type="date" v-model="dataItem.agreementStartDate" filled label="Sözleşme Başlangıç Tarihi"
        lazy-rules :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
    </div>


    <div class="input-group">
      <q-input class="txt" type="date" v-model="dataItem.agreementEndDate" filled label="Sözleşme Bitiş Tarihi" lazy-rules
        :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
    </div>

    <div class="input-group">
      <q-input class="txt" type="file" v-model="dataItem.agreementEndDate" filled lazy-rules
        :rules="[val => val && val.length > 0 || 'Boş geçilemez']" hint="Dosyayı Seçiniz" />
    </div>






  </form-modal-dialog>
  <!-- Add and Update Modal End -->

  <!-- Delete modal start -->
  <form-modal-dialog v-model="deleteDialog" title="Sözleşme Silme Onayı" @positive="del()" positive="Sil" negative="Kapat"
    persistent>
    <span class="q-ml-sm">
      <p>{{ dataItem.workplace }} sözleşmesini silinmesini onaylıyor musunuz ?</p>
    </span>
  </form-modal-dialog>
  <!-- Delete modal end -->
</template>


<script setup>
import { ref } from 'vue'
import PageContainer from 'components/PageContainer.vue'
import FormModalDialog from 'components/FormModalDialog.vue'
import data from 'src/data/workplaceServiceAgreements.json'

const columns = [
  { name: 'settings', field: 'settings', align: "left", sortable: true },
  { name: 'id', align: 'left', label: '#', field: 'id', sortable: true },
  { name: 'agreement', label: 'Sözleşme', align: 'left', field: 'agreement', sortable: true },
  { name: 'workplace', label: 'İşyeri', align: 'left', field: 'workplace', sortable: true },
  { name: 'agreementType', label: 'Sözleşme Türü', align: 'left', field: 'agreementType', sortable: true },
  { name: 'agreementStartDate', label: 'Sözleşme Başlangıç Tarihi', align: 'left', field: 'agreementStartDate', sortable: true },
  { name: 'agreementEndDate', label: 'Sözleşme Bitiş Tarihi', align: 'left', field: 'agreementEndDate', sortable: true },
  {
    name: 'status', label: 'Durum', align: 'left', field: 'status', sortable: true,
    format: val => val ? "Aktif" : "Pasif",
    style: val => val.status ? "color:green" : "color:red",
  },
]

const dataTask = ref([])
const editAddBtn = ref("add")

/* add modal start */
var dataItem = ref({});

const addUpdateDialog = ref(false);
const detailDialog = ref(false);


const addAgreementModal = () => {
  addUpdateDialog.value = true
  dataItem.workplace = null
  //dataItem.agreementType[0]
}
/* add modal end */


/* update modal start */
const updateEducationalPlanModal = (item) => {
  Object.assign(dataItem.value, item)
  addUpdateDialog.value = true
}
/* update modal end */

/* update modal start */
const detailEducationalPlanModal = (item) => {
  Object.assign(dataItem.value, item)
  detailDialog.value = true

}
/* update modal end */



/* EditDataTask start */
const EditDataTask = (item) => {
  //alert(taskNameId)
  //alert(dataTask.value[taskNameId])
  dataTask.value[taskNameId] = item
  editAddBtn.value = "add"

}
/* EditDataTask end */



/* delete modal start */
var deleteDialog = ref(false)
const deleteEducationalPlanModal = (item) => {
  Object.assign(dataItem.value, item)
  deleteDialog.value = true
}
/* delete modal end */




</script>
<style scoped lang="scss">
.btn {
  background: transparent;
  cursor: pointer;
}

.input-group {
  margin-bottom: 5px;
}
</style>
