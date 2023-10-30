<template>
  <page-container title="Kullanıcı Profili">
    <template #icon>
      <i class="fa-solid fa-address-card fa-xl"></i>
    </template>

    <q-page-container>

      <div class="row justify-center full-width ">

        <q-card class="my-card q-ma-sm" style="box-shadow: none;">


          <q-card-section>
            <div class="q-pa-md row items-start q-gutter-md">

              <q-card class="my-card" flat bordered>
                <q-card-actions style="cursor: pointer;" @click="personal = !personal">
                  <q-btn flat color="primary" label="Kişisel Bilgiler" />
                  <q-space />

                  <q-btn color="grey" round flat dense :icon="personal ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" />
                </q-card-actions>

                <q-slide-transition>
                  <div v-show="personal">
                    <q-separator />
                    <q-card-section class="text-subtitle2">
                      <div class="q-pa-md">
                        <div class="q-gutter-md">

                          <q-img :src="profileData.imgUrl" style="width: 300px; " />

                          <div class="text-h6 q-mt-sm q-mb-xs">Adı</div>
                          <q-input standout="bg-blue text-white" v-model="profileData.name" readonly />


                          <div class="text-h6 q-mt-sm q-mb-xs">Soyadı</div>
                          <q-input standout="bg-blue text-white" v-model="profileData.surname" readonly />


                          <div class="text-h6 q-mt-sm q-mb-xs">Medeni Durumu</div>
                          <q-input standout="bg-blue text-white" v-model="profileData.civilStatus" readonly />

                          <div class="text-h6 q-mt-sm q-mb-xs">Uyruk</div>
                          <q-input standout="bg-blue text-white" v-model="profileData.nationality" readonly />

                          <div class="text-h6 q-mt-sm q-mb-xs">Askerlik Durumu</div>
                          <q-input standout="bg-blue text-white" v-model="profileData.soldiering" readonly />

                          <div class="text-h6 q-mt-sm q-mb-xs">Doğum Tarihi</div>
                          <q-input standout="bg-blue text-white" v-model="profileData.birthDate" readonly />

                          <div class="text-h6 q-mt-sm q-mb-xs">Doğum Yeri</div>
                          <q-input standout="bg-blue text-white" v-model="profileData.birtyPlace" readonly />

                          <div class="text-h6 q-mt-sm q-mb-xs">Sürücü Belgesi</div>
                          <q-input standout="bg-blue text-white" v-model="profileData.driveLicense" readonly />

                        </div>
                      </div>
                    </q-card-section>
                  </div>
                </q-slide-transition>

                <hr>


                <q-card-actions @click="contact = !contact" style="cursor: pointer;">
                  <q-btn flat color="primary" label="İletişim Bilgisi" />
                  <q-space />

                  <q-btn color="grey" round flat dense :icon="contact ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" />
                </q-card-actions>

                <q-slide-transition>
                  <div v-show="contact">
                    <q-separator />
                    <q-card-section class="text-subtitle2">

                      <div>
                        <div>


                          <div class="text-h6 q-mt-sm q-mb-xs ">Adres</div>
                          <q-input standout="bg-blue text-white" class="bg-white" v-model="profileData.address" />

                          <div class="text-h6 q-mt-sm q-mb-xs">Telefon</div>
                          <q-input standout="bg-blue text-white" v-model="profileData.phone" readonly />

                          <div class="text-h6 q-mt-sm q-mb-xs">Mail</div>
                          <q-input standout="bg-blue text-white" v-model="profileData.mail" readonly />

                        </div>
                      </div>
                    </q-card-section>

                  </div>
                </q-slide-transition>

                <hr>




                <q-card-actions style="cursor: pointer;" @click="computer = !computer">
                  <q-btn flat color="primary" label="Bilgisayar Bilgileri" />
                  <q-space />

                  <q-btn color="grey" round flat dense :icon="computer ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" />
                </q-card-actions>

                <q-slide-transition>
                  <div v-show="computer">
                    <q-separator />
                    <q-card-section class="text-subtitle2">
                      {{ profileData.lorem }}
                    </q-card-section>
                  </div>
                </q-slide-transition>

                <hr>


                <q-card-actions style="cursor: pointer;" @click="language = !language">
                  <q-btn flat color="primary" label="Yabancı Dil Bilgileri" />
                  <q-space />

                  <q-btn color="grey" round flat dense :icon="language ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" />
                </q-card-actions>

                <q-slide-transition>
                  <div v-show="language">
                    <q-separator />
                    <q-card-section class="text-subtitle2">
                      {{ profileData.lorem }}
                    </q-card-section>
                  </div>
                </q-slide-transition>



              </q-card>
            </div>

          </q-card-section>

        </q-card>

      </div>

    </q-page-container>

  </page-container>
</template>

<script setup>
import { ref } from 'vue'
import PageContainer from 'components/PageContainer.vue'
import data from 'src/data/profile.json'


const personal = ref(true)
const contact = ref(false)
const computer = ref(false)
const language = ref(false)

const profileData = data

/* const title = "Profil Detayları"
const userName = "Buğra Dost"
const address = "arge 360 Şişli/İstanbul"
const phone = "0555 555 5555"
const mail = "info@arge360.com"
const civilStatus = "Evli"
const nationality = "Türkiye"
const soldiering = "Yapıldı"
const birthDate = "12.12.1999"
const birtyPlace = "İstanbul"
const driveLicense = "B"
const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

 */

</script>


<style lang="scss" scoped>
.my-card {
  width: 100%;

}
</style>
