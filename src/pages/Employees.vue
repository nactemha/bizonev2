<template>
  <page-container :title="$t('employees.title')">
    <template #icon>
      <i class="fa-solid fa-elevator fa-xl"></i>
    </template>

    <q-page-container>


      <div class="q-pa-md ">

        <!-- Data Screen Div Table Start -->
        <div>

          <!-- Md Screen Div Table Start -->
          <div class="md-screen">
            <div class="q-ma-md div-table">


              <!-- Banner start -->
              <div class="row ">
                <div class="col text-left">
                  <p style="font-size: 22px;">
                    {{ $t('employees.table_title') }}
                  </p>
                </div>
                <div class="col text-right">

                  <div class="row">

                    <q-select class="col-2" borderless dense filled v-model="model" :options="['Aktif', 'Pasif', 'Aday']"
                      :label="$t('employees.status')" style=" margin-right: 13px;  " />

                    <q-input class="col-8" borderless filled dense debounce="300" v-model="filter"
                      :placeholder="$t('employees.searching')" />

                    <q-btn class="col-1" icon="search" outline style="color: gray; margin-left: 3px;  "
                      @click="GetListData(filter)" />

                  </div>


                </div>

              </div>
              <!-- Banner end -->

              <q-markup-table style="box-shadow: none;">
                <thead>
                  <tr>
                    <th class="text-left"></th>
                    <th class="text-left">#</th>
                    <th class="text-left"> {{ $t('employees.tc_no') }} </th>
                    <th class="text-left"> {{ $t('employees.name_surname') }}</th>
                    <th class="text-left">{{ $t('employees.workplace_name') }} </th>
                    <th class="text-left">{{ $t('employees.connectedWorkplace') }}</th>
                    <th class="text-left">{{ $t('employees.recruitmentDate') }} </th>
                    <th class="text-left">{{ $t('employees.userAuthorization') }} </th>
                    <th class="text-left">{{ $t('employees.status') }} </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="div-row" v-for="( i, index ) in  data " :key="i" :class="GetRowClass(index)">
                    <td class="text-left">
                      <button class="btn" style="border:none;" @click="updateSectionDesModal(i)" title="Düzenle">
                        <i class="fa-solid fa-pen-to-square fa-lg"></i>
                      </button>

                      <button class="btn" style="border:none;" title="Durumu" @click="deleteSectionDesModal(i)">
                        <i class="fa-solid fa-trash-can fa-lg"></i>
                      </button>
                      <button class="btn" style="border:none;" title="Detay" @click="deleteSectionDesModal(i)">
                        <i class="fa-solid fa-eye fa-lg"></i>
                      </button>

                    </td>

                    <td class="text-left">{{ i.id }}</td>
                    <td class="text-left">{{ i.tcNo }}</td>
                    <td class="text-left">{{ i.name }} {{ i.surname }}</td>
                    <td class="text-left">{{ i.workplace }} </td>
                    <td class="text-left">
                      <span v-if="i.affiliatesIsShow" style="color:green">
                        <i class="fa-solid fa-check"></i>
                      </span>
                      <span v-else style="color:red">
                        <i class="fa-solid fa-xmark"></i>
                      </span>
                    </td>
                    <td class="text-left">{{ i.recruitmentDate }}</td>
                    <td class="text-left">{{ i.userAuthorization }} </td>
                    <td class="text-left">
                      <span v-if="i.status" style="color:green">Aktif</span>
                      <span v-else style="color:red">Pasif</span>
                    </td>
                  </tr>

                </tbody>
              </q-markup-table>



            </div>
          </div>
          <!-- Md Screen Div Table End -->


          <!-- Sm Screen Div Table Start -->
          <div class="sm-screen">

            <div>
              <p style="font-size: 22px; margin-left: 30px;">
                {{ $t('employees.table_title') }}
              </p>

              <q-input borderless filled dense debounce="300" v-model="filter" :placeholder="$t('employees.searching')" />
              <q-btn icon="search" outline style="color: gray; margin-left: 3px;" @click="GetListData(filter)" />

            </div>

            <div class="sm-card" v-for=" i  in  data " :key="i">

              <div class="sm-row">
                <div class="sm-title"></div>
                <div class="sm-content">
                  <button class="btn" style="border:none;" @click="updateSectionDesModal(i)" title="Düzenle">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>

                  <button class="btn" style="border:none;" :title="$t('employees.status')"
                    @click="deleteSectionDesModal(i)">
                    <i class="fa-solid fa-trash-can"></i>
                  </button>

                </div>
              </div>


              <div class="sm-row">
                <div class="sm-title">#</div>
                <div class="sm-content">{{ i.id }}</div>
              </div>

              <div class="sm-row">
                <div class="sm-title">{{ $t('employees.tc_no') }} </div>
                <div class="sm-content">{{ i.tcNo }}</div>
              </div>

              <div class="sm-row">
                <div class="sm-title">{{ $t('employees.name_surname') }}</div>
                <div class="sm-content">{{ i.name }} {{ i.surname }}</div>
              </div>

              <div class="sm-row">
                <div class="sm-title">{{ $t('employees.workplace_name') }}</div>
                <div class="sm-content">{{ i.workplace }} </div>
              </div>

              <div class="sm-row">
                <div class="sm-title">{{ $t('employees.connectedWorkplace') }}</div>
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
                <div class="sm-title">{{ $t('employees.recruitmentDate') }}</div>
                <div class="sm-content">{{ i.recruitmentDate }} </div>
              </div>

              <div class="sm-row">
                <div class="sm-title">{{ $t('employees.userAuthorization') }}</div>
                <div class="sm-content">{{ i.userAuthorization }}</div>
              </div>

              <div class="sm-row">
                <div class="sm-title">{{ $t('employees.status') }}</div>
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
import data from 'src/data/employees.json'


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
