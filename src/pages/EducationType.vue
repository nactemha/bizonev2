<template>
  <page-container title="Eğitim Türleri">
    <template #icon>
      <i class="fa-solid fa-swatchbook"></i>
    </template>

    <q-page-container>
      <!-- Add and update button start -->
      <div class="q-pa-md q-gutter-sm">
        <q-btn label="Ekle" color="primary" @click="addEducationalPlanModal()" icon="fa-solid fa-plus" />
      </div>
      <!-- Add and update button end -->

      <!-- Data Table Start -->
      <div class="q-pa-md">

        <q-table :grid="$q.screen.xs" flat bordered title="Eğitim Tür Listesi" ref="tableRef" :rows="data"
          :columns="columns" row-key="id" v-model:pagination="pagination" :loading="loading" :filter="filter"
          binary-state-sort @request="onRequest">
          <template v-slot:top-right>
            <q-input borderless filled dense debounce="300" v-model="filter" placeholder="Arama Yapınız">
              <!--  <template v-slot:append>
                </template> -->
            </q-input>
            <q-btn icon="search" outline style="color: gray; margin-left: 3px;" @click="GetListData(filter)" />

          </template>


          <template v-slot:body-cell-settings="props">

            <q-td :props="props">
              <button class="btn" style="border:none;" @click="updateEducationalPlanModal(props.row)" title="Düzenle">
                <i class="fa-solid fa-pen-to-square fa-lg"></i>
              </button>

              <button class="btn" style="border:none;" title="Durumu" @click="deleteEducationalPlanModal(props.row)">
                <i class="fa-solid fa-trash-can fa-lg"></i>
              </button>

              <button class="btn" style="border:none;" title="Yapıldı/Yapılmadı">
                <i class="fa-solid fa-eye fa-lg"></i>
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
  <form-modal-dialog v-model="addUpdateDialog" title="İlaç Bilgisi" negative="Kapat" @positive="updateCommit()">



    <div class="input-group">
      <q-input class="txt" filled type="date" v-model="dataItem.planningDate" label="Planlanma Tarihi" lazy-rules
        :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
    </div>

    <div class="input-group">
      <q-input class="txt" v-model="dataItem.educationName" filled label="Eğitim Adı" lazy-rules
        :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
    </div>

    <div class="input-group">
      <q-select class="select" v-model="dataItem.educationOrganization" filled :virtual-scroll-horizontal="false"
        :options="['Seçiniz', '43', '33', '1']" label="Eğitim Veren Kurum" lazy-rules
        :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
    </div>

    <div class="input-group">
      <q-select class="select" v-model="dataItem.educationType" filled :virtual-scroll-horizontal="false"
        :options="['Seçiniz', '43', '33', '1']" label="Eğitim Türü" lazy-rules
        :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
    </div>


    <div class="input-group">
      <q-toggle v-model="dataItem.exam" label="Sınav" />
    </div>


    <div class="input-group">
      <q-input class="txt" v-model="dataItem.successPoint" filled type="number" label="Başarı Puanı" lazy-rules
        :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
    </div>


    <div class="input-group">
      <q-input class="txt" v-model="dataItem.validityDate" filled type="date" label="Geçerlilik Tarihi" lazy-rules
        :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
    </div>

    <div class="input-group">
      <q-input class="txt" v-model="dataItem.compulsoryTimeMin" filled label="Zorunlu Süre" mask="###/##" fill-mask
        hint="Saat/Dakika" :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
    </div>

    <div class="input-group">
      <q-select class="select" v-model="dataItem.planningDate" filled :virtual-scroll-horizontal="false"
        :options="['Seçiniz', '43', '33', '1']" label="Personel Seçiniz" lazy-rules
        :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
    </div>

    <div class="input-group">
      <q-select class="select" v-model="dataItem.planningDate" filled :virtual-scroll-horizontal="false"
        :options="['Seçiniz', '43', '33', '1']" label="Grup Seçiniz" lazy-rules
        :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
    </div>

    <div class="input-group">
      <q-select class="select" v-model="dataItem.planningDate" filled :virtual-scroll-horizontal="false"
        :options="['Seçiniz', '43', '33', '1']" label="Bölüm Seçiniz" lazy-rules
        :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
    </div>

    <div class="input-group">
      <q-select class="select" v-model="dataItem.planningDate" filled :virtual-scroll-horizontal="false"
        :options="['Seçiniz', '43', '33', '1']" label="Görev Seçiniz" lazy-rules
        :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
    </div>







  </form-modal-dialog>
  <!-- Add and Update Modal End -->

  <!-- Delete modal start -->
  <form-modal-dialog v-model="deleteDialog" title="Eğitim Silme Onayı" @positive="del()" positive="Sil" negative="Kapat"
    persistent>
    <span class="q-ml-sm">
      <p>{{ dataItem.educationName }} planını silinmesini onaylıyor musunuz ?</p>
    </span>
  </form-modal-dialog>
  <!-- Delete modal end -->
</template>


<script setup>
import { ref } from 'vue'
import PageContainer from 'components/PageContainer.vue'
import FormModalDialog from 'components/FormModalDialog.vue'
import data from 'src/data/educationType.json'

const columns = [
  { name: 'settings', field: 'settings', align: "left", sortable: true },
  { name: 'id', align: 'left', label: '#', field: 'id', sortable: true },
  { name: 'educationName', label: 'Eğitim Adı', align: 'left', field: 'educationName', sortable: true },
  {
    name: 'aim', label: 'Amaç', align: 'left', field: 'aim',
    classes: "classes",
    "col-props": { style: 'width: 100px' },
    sortable: true
  },
  {
    name: 'status', label: 'Durum', align: 'left', field: 'status', sortable: true,
    format: val => val ? "Aktif" : "Pasif",
    style: val => val.status ? "color:green" : "color:red",
  },
]

/* add modal start */
const dataItem = ref({
  exam: false
});

const addUpdateDialog = ref(false);

const addEducationalPlanModal = () => {
  addUpdateDialog.value = true
}
/* add modal end */

/* delete modal start */
var deleteDialog = ref(false)
const deleteEducationalPlanModal = (item) => {
  Object.assign(dataItem.value, item)
  deleteDialog.value = true
}
/* delete modal end */


/* update modal start */
const updateEducationalPlanModal = (item) => {
  Object.assign(dataItem.value, item)
  addUpdateDialog.value = true
}
/* update modal end */

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
