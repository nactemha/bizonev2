<template>
  <q-page>
    <div class="row justify-center full-width ">

      <q-card class="my-card q-ma-sm" style="max-width: 1000px;">


        <q-card-section>

          <div class="text-h3 text-weight-bolder text-center mb-3">{{ profileData.title }} </div>
          <div class="text-h4 text-weight text-center mb-3">{{ profileData.userName }}</div>



          <div class="q-pa-md row items-start q-gutter-md">

            <q-card class="my-card" flat bordered>


              <q-card-actions>
                <q-btn flat color="primary" label="İletişim Bilgisi" />
                <q-space />

                <q-btn color="grey" round flat dense :icon="contact ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                  @click="contact = !contact" />
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


              <q-card-actions>
                <q-btn flat color="primary" label="Kişisel Bilgiler" />
                <q-space />

                <q-btn color="grey" round flat dense :icon="personal ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                  @click="personal = !personal" />
              </q-card-actions>

              <q-slide-transition>
                <div v-show="personal">
                  <q-separator />
                  <q-card-section class="text-subtitle2">
                    <div class="q-pa-md">
                      <div class="q-gutter-md">

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


              <q-card-actions>
                <q-btn flat color="primary" label="Bilgisayar Bilgileri" />
                <q-space />

                <q-btn color="grey" round flat dense :icon="computer ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                  @click="computer = !computer" />
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


              <q-card-actions>
                <q-btn flat color="primary" label="Yabancı Dil Bilgileri" />
                <q-space />

                <q-btn color="grey" round flat dense :icon="language ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                  @click="language = !language" />
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
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import data from 'src/data/profile.json'


const contact = ref(true)
const personal = ref(false)
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
