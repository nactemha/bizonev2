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

          <q-table :grid="$q.screen.xs" flat bordered title="İlaç Listesi" ref="tableRef" :rows="rows" :columns="columns"
            row-key="id" v-model:pagination="pagination" :loading="loading" :filter="filter" binary-state-sort
            @request="onRequest">
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

    <div class="input-group">
      <q-select class="select" filled v-model="currentItem.type" :virtual-scroll-horizontal="false"
        :options="['Seçiniz', 'İlaç', 'Sarf Malzeme', 'Demirbaş']" label="Tür" lazy-rules
        :rules="[val => val && val.length > 0 || 'Barkod boş geçilemez']" />
    </div>


    <div class="input-group">
      <q-input class="txt" filled type="number" v-model="currentItem.barcode" label="Barkod" lazy-rules
        :rules="[val => val && val.length > 0 || 'Barkod boş geçilemez']" />
    </div>

    <div class="input-group">
      <q-input class="txt" v-model="currentItem.medicineName" filled label="İlaç Adı" lazy-rules
        :rules="[val => val && val.length > 0 || 'İlaç adı boş geçilemez']" />
    </div>

    <div class="input-group">
      <q-input class="txt" v-model="currentItem.brand" filled label="Firma Adı" lazy-rules
        :rules="[val => val && val.length > 0 || 'Firma adı boş geçilemez']" />
    </div>

  </form-modal-dialog>

  <form-modal-dialog v-model="deleteMedicineDialog" title="İlaç Silme Onayı" @positive="deleteMedicine()" positive="Ekle"
    negative="Kapat" persistent>
    <span class="q-ml-sm">
      <p>{{ currenItem.medicineName }} silinmesini onaylıyor musunuz ?</p>
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
import FormModalDialog from 'components/FormModalDialog.vue'
const { fetch, getRowsNumberCount } = useMedicineFetch();

const data = ref()
const currentItem = ref({});

const tableRef = ref()
const rows = ref([])
const filter = ref('')
const loading = ref(false)
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 3,
  rowsNumber: 10
})

function onRequest(props) {
  const { page, rowsPerPage, sortBy, descending } = props.pagination
  const filter = props.filter

  loading.value = true

  // emulate server
  setTimeout(() => {
    // update rowsCount with appropriate value
    pagination.value.rowsNumber = getRowsNumberCount(filter)

    // get all rows if "All" (0) is selected
    const fetchCount = rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage

    // calculate starting row of data
    const startRow = (page - 1) * rowsPerPage

    // fetch data from "server"
    const returnedData = fetch(startRow, fetchCount, filter, sortBy, descending)

    // clear out existing data and add new
    rows.value.splice(0, rows.value.length, ...returnedData)

    // don't forget to update local pagination object
    pagination.value.page = page
    pagination.value.rowsPerPage = rowsPerPage
    pagination.value.sortBy = sortBy
    pagination.value.descending = descending

    // ...and turn of loading indicator
    loading.value = false
  }, 1500)
}


const editMedicineDialog = ref(false);
const deleteMedicineDialog = ref(false);

function refresh() {
  tableRef.value.requestServerInteraction()
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


onMounted(() => {
  refresh();
})
</script>


<style scoped lang="scss">
.btn {
  background-color: transparent;
  cursor: pointer;
}

.input-group {
  margin-bottom: 5px;
}
</style>
