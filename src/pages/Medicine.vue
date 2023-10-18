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
        <!-- Add and update button start -->
        <div class="q-pa-md q-gutter-sm">
          <q-btn label="Ekle" color="primary" icon="fa-solid fa-plus" @click="addMedicine()" />
        </div>
        <!-- Add and update button end -->

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
                <button class="btn" style="border:none;" @click="updateMedicine(props.row)" title="Düzenle">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>

                <button class="btn" style="border:none;" @click="deleteMedicine" title="Durumu">
                  <i class="fa-solid fa-trash-can"></i>
                </button>

                <!--  <button class="btn" style="border:none;" title="Detay">
                  <i class="fa-solid fa-eye"></i>
                </button> -->

                <button class="btn" style="border:none;" @click="HeartModal(props.row)" title="Favori">
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

  <form-modal-dialog v-model="editMedicineDialog" title="İlaç Bilgisi" :positive="currentItem.id ? 'Güncelle' : 'Ekle'"
    negative="Kapat" @positive="updateCommit()">
    <div style="margin-bottom: 5px;">
      <q-select class="select" filled v-model="currentItem.type" :virtual-scroll-horizontal="false"
        :options="['Seçiniz', 'İlaç', 'Sarf Malzeme', 'Demirbaş']" label="Tür" lazy-rules
        :rules="[val => val && val.length > 0 || 'Barkod boş geçilemez']" />
    </div>


    <div style="margin-bottom: 5px;">
      <q-input class="txt" filled type="number" v-model="currentItem.barcode" label="Barkod" lazy-rules
        :rules="[val => val && val.length > 0 || 'Barkod boş geçilemez']" />
    </div>

    <div style="margin-bottom: 5px;">
      <q-input class="txt" v-model="currentItem.medicineName" filled label="İlaç Adı" lazy-rules
        :rules="[val => val && val.length > 0 || 'İlaç adı boş geçilemez']" />
    </div>

    <div style="margin-bottom: 5px;">
      <q-input class="txt" v-model="currentItem.brand" filled label="Firma Adı" lazy-rules
        :rules="[val => val && val.length > 0 || 'Firma adı boş geçilemez']" />
    </div>

  </form-modal-dialog>

  <form-modal-dialog v-model="deleteMedicineDialog" title="İlaç Silme Onayı" @positive="deleteMedicine()" positive="Ekle"
    negative="Kapat" persistent>
    <span class="q-ml-sm">
      <p>{{ currenItem.medicineName }} silinmesini onaylıyor musunu ?.</p>
    </span>
  </form-modal-dialog>


  <!-- Heart Modal Start -->
  <div class="q-pa-md q-gutter-sm">

    <q-dialog v-model="heartMedicineModal">
      <q-card>
        <q-card-section>
          <div class="text-h6">Favori</div>
        </q-card-section>

        <q-card-section class="q-pt-none" style="width:450px;">
          <q-avatar color="red" text-color="white" icon="fa-solid fa-heart" />
          {{ heartValue }} ilaç favorilere eklensin mi ?
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="İptal" v-close-popup />
          <q-btn flat label=" Yap" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>


<script setup>


import { onMounted, ref, reactive } from 'vue'
import { useMedicineFetch } from "src/composables/medicine"
import FormModalDialog from 'components/dialogs/FormModalDialog.vue'
const { fetch } = useMedicineFetch();


const data = ref()
const currentItem = ref({});

const editMedicineDialog = ref(false);
const deleteMedicineDialog = ref(false);
function refresh() {
  data.value = fetch();
}


const addMedicine = () => {
  currentItem.value = {}
  editMedicineDialog.value = true
}
const updateMedicine = (item) => {
  Object.assign(currentItem.value, item)
  editMedicineDialog.value = true
}
const updateCommit = () => {
  //api call 
  let ok = true;
  if (ok) {
    editMedicineDialog.value = false
    data.value.filter(x => x.id == currentItem.value.id).map(x => Object.assign(x, currentItem.value))
  }
}
const deleteMedicine = (item) => {
  Object.assign(currentItem.value, item)
  deleteMedicineDialog.value = true
}

const columns = [
  { name: 'settings', field: 'settings', align: "left", sortable: true },
  { name: 'id', align: 'left', label: '#', field: 'id', sortable: true },
  { name: 'barcode', label: 'Barkod', align: 'left', field: 'barcode', sortable: true },
  { name: 'medicineName', label: 'İlaç Adı', align: 'left', field: 'medicineName', sortable: true },
  { name: 'brand', label: 'Firma Adı', align: 'left', field: 'brand', sortable: true },
  {
    name: 'status', label: 'Durum', align: 'left', field: 'status', sortable: true,
    format: val => val ? "Aktif" : "Pasif",
    style: val => val.status ? "color:green" : "color:red",
  },
  { name: 'user', label: 'Sisteme İlacı Ekleyen', align: 'left', field: 'user', sortable: true },
]
const filter = ref('')
const pagination = ref({
  page: 1, // Sayfa numarası
  rowsPerPage: 10, // Kayıt sayısı
});


onMounted(() => {
  refresh();
})
</script>


<style scoped lang="scss">
.btn {
  background-color: transparent;
  cursor: pointer;
}
</style>
