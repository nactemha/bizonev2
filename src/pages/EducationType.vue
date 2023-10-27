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

              <button class="btn" style="border:none;" title="Detay" @click="detailEducationalPlanModal(props.row)">
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
  <form-modal-dialog v-model="addUpdateDialog" title="Eğitim Tür Bilgisi" icon="fa-solid fa-school-circle-check"
    negative="Kapat" @positive="updateCommit()">

    <div class="input-group">
      <q-input class="txt" v-model="dataItem.educationName" filled label="Eğitim Adı" lazy-rules
        :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
    </div>


    <div class="input-group">
      <q-input class="txt" v-model="dataItem.aim" filled type="textarea" label="Amaç" lazy-rules
        :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
    </div>


    <div class="input-group">
      <q-toggle v-model="dataItem.compulsory" label="Zorunlu" />
    </div>

    <hr>
    <label style="font-size: 18px; color: gray;">Zorunlu Eğitim Görevleri</label>

    <div>


      <div style="margin-top: 15px;">
        <q-card class="my-card" flat bordered>
          <q-card-actions @click="btnTask = !btnTask" style="cursor: pointer;">
            <q-btn flat color="primary" :label="editAddBtn == 'add' ? 'Görev Ekle' : 'Görev Güncelle'" />

            <q-space />

            <q-btn color="grey" round flat dense :icon="btnTask ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" />
          </q-card-actions>

          <q-slide-transition>
            <div v-show="btnTask">
              <q-separator />
              <q-card-section class="text-subtitle2">
                <div class="row">

                  <div class="col-md-8 col-xs-12">
                    <div class="input-group">
                      <q-select filled v-model="dataItem.taskName" :options="['A', 'B', 'C']" label="Görev Seçiniz" />
                    </div>
                  </div>

                  <div class="col-md-4"
                    style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%;">

                    <!-- add -->
                    <q-btn v-if="editAddBtn == 'add'" color="primary" icon="fa-solid fa-plus" label="Ekle"
                      @click="AddDataTask(dataItem.taskName)" />

                    <!-- edit -->
                    <q-btn v-if="editAddBtn == 'edit'" color="warning" icon="fa-solid fa-pen" label="Güncelle"
                      @click="EditDataTask(dataItem.taskName)" />



                  </div>
                </div>

              </q-card-section>
            </div>
          </q-slide-transition>
        </q-card>
      </div>

      <!--

      <span v-if="btnTask == false">
        <q-btn color="green" @click="btnTask = !btnTask" icon="fa-solid fa-plus" style="margin: 5px 0 10px 0;" />
      </span>
      <span v-else>
        <q-btn color="red" @click="btnTask = !btnTask" icon="fa-solid fa-minus" style="margin: 5px 0 10px 0;" />
      </span>
      <q-slide-transition>
        <div v-show="btnTask">

          <div class="row">

            <div class="col-md-8 col-xs-12">
              <div class="input-group">
                <q-input class="txt" v-model="dataItem.taskName" filled label="Görev Adı" lazy-rules
                  :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
              </div>
            </div>

            <div class="col-md-4"
              style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%;">

               add
              <q-btn v-if="editAddBtn == 'add'" color="primary" icon="fa-solid fa-plus" label="Ekle"
                @click="AddDataTask(dataItem.taskName)" />

               edit
              <q-btn v-if="editAddBtn == 'edit'" color="warning" icon="fa-solid fa-pen" label="Güncelle"
                @click="EditDataTask(dataItem.taskName)" />



            </div>

          </div>

        </div>
      </q-slide-transition> -->



    </div>

    <q-markup-table v-if="dataTask.length != 0" style="box-shadow: none; margin-top: 10px;">
      <thead>
        <tr class="bg-light">
          <th class="text-left"></th>
          <th class="text-left">Görev Adı</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i, index) in  dataTask " :key="index" :class="index % 2 == 1 ? 'bg-light' : ''">

          <td class="text-left" style="width: 5px;">
            <i class="fa-solid fa-pen-to-square fa-lg" @click="EditDataTaskModel(index, i)"
              style="margin-right: 10px; cursor: pointer;"></i>
            <i style="cursor: pointer;" class="fa-solid fa-trash fa-lg" @click="DeleteDataTask(index)"></i>
          </td>
          <td class="text-left">{{ i }} </td>

        </tr>


      </tbody>
    </q-markup-table>

    <div v-else class="data-task-alert">
      <i class="fa-solid fa-circle-exclamation fa-xl" style="margin-right: 10px;"></i>
      Görev bulunamadı. Lüften yeni görev ekleyiniz!
    </div>







  </form-modal-dialog>
  <!-- Add and Update Modal End -->



  <!-- Detail Modal Start -->
  <form-modal-dialog v-model="detailDialog" title="Eğitim Tür Detay Bilgisi" icon="fa-solid fa-school-circle-check"
    negative="Kapat" @positive="updateCommit()">


    <q-markup-table style="box-shadow: none; margin-top: 10px;">
      <thead>
        <tr class="bg-light">
          <th class="text-left">Eğitim Adı</th>
          <th class="text-left">Amaç</th>
          <th class="text-left">Durumu</th>
        </tr>
      </thead>
      <tbody>
        <tr>

          <td class="text-left">{{ dataItem.educationName }}</td>
          <td class="text-left">{{ dataItem.aim }}</td>
          <td class="text-left" v-if="dataItem.compulsory" style="color: green;">Zorunlu</td>
          <td class="text-left" v-else style="color: red;">Zorunlu Değil</td>

        </tr>


      </tbody>
    </q-markup-table>


    <hr>
    <label style=" font-size: 18px; color: gray;">Zorunlu Eğitim Görevleri</label>



    <q-markup-table v-if="dataTask.length != 0" style="box-shadow: none; margin-top: 10px;">
      <thead>
        <tr class="bg-light">
          <th class="text-left">Görev Adı</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i, index) in  dataTask " :key="index" :class="index % 2 == 1 ? 'bg-light' : ''">

          <td class="text-left">{{ i }} </td>

        </tr>


      </tbody>
    </q-markup-table>

    <div v-else class="data-task-alert">
      <i class="fa-solid fa-circle-exclamation fa-xl" style="margin-right: 10px;"></i>
      Görev eklenmemiştir!
    </div>







  </form-modal-dialog>
  <!-- Detail Modal End -->

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
    classes: "aim-width",
    "col-props": { style: 'width: 100px' },
    sortable: true
  },
  {
    name: 'status', label: 'Durum', align: 'left', field: 'status', sortable: true,
    format: val => val ? "Aktif" : "Pasif",
    style: val => val.status ? "color:green" : "color:red",
  },
]

const dataTask = ref([])
const editAddBtn = ref("add")

/* add modal start */
var dataItem = ref({
  exam: false,
  compulsory: false
});

const addUpdateDialog = ref(false);
const detailDialog = ref(false);
const btnTask = ref(false);

const addEducationalPlanModal = () => {
  dataItem.value.aim = ""
  dataItem.value.educationName = ""

  addUpdateDialog.value = true
  btnTask.value = false
}
/* add modal end */


/* addDataTask start */


const AddDataTask = (item) => {
  dataTask.value.push(item)
  dataItem.value.taskName = ""
  console.log(dataTask);
}
/* addDataTask end */

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




/* editDataTask start */
var taskNameId = ref()
const EditDataTaskModel = (index, item) => {
  btnTask.value = true
  editAddBtn.value = "edit"
  console.log(item);
  dataItem.value.taskName = item
  taskNameId = index

}
/* addDataTask end */


/* EditDataTask start */
const EditDataTask = (item) => {
  //alert(taskNameId)
  //alert(dataTask.value[taskNameId])
  dataTask.value[taskNameId] = item
  editAddBtn.value = "add"

}
/* EditDataTask end */


/* DeleteDataTask start */
const DeleteDataTask = (index) => {
  if (index !== -1) {
    dataTask.value.splice(index, 1);
  }

}
/* DeleteDataTask end */


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

.aim-width {
  width: 100px;
}

.add-edit-task {
  border: 1px solid #ccc;
  padding: 5px;
}

.bg-light {

  background: #d7d7d7;
}

.data-task-alert {
  border: 1px solid #d12424;
  padding: 20px;
  margin-top: 5px;
  border-radius: 5px;
  background: #d12424;
  color: white;
  opacity: 0.7;
}
</style>
