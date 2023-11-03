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

                      <div>

                        <q-img :src="profileData.imgUrl" style="width: 300px; " />

                        <div class="input-group">
                          <q-input class="txt" v-model="profileData.name" readonly filled label="Adı" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                        </div>

                        <div class="input-group">
                          <q-input class="txt" v-model="profileData.surname" readonly filled label="Soyadı" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                        </div>

                        <div class="input-group">
                          <q-input class="txt" v-model="profileData.civilStatus" readonly filled label="Medeni Durumu"
                            lazy-rules :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                        </div>

                        <div class="input-group">
                          <q-input class="txt" v-model="profileData.nationality" readonly filled label="Uyruk" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                        </div>

                        <div class="input-group">
                          <q-input class="txt" v-model="profileData.soldiering" readonly filled label="Askerlik Durumu"
                            lazy-rules :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                        </div>


                        <div class="input-group">
                          <q-input class="txt" v-model="profileData.birthDate" readonly filled label="Doğum Tarihi"
                            lazy-rules :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                        </div>


                        <div class="input-group">
                          <q-input class="txt" v-model="profileData.birtyPlace" readonly filled label="Doğum Yeri"
                            lazy-rules :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                        </div>


                        <div class="input-group">
                          <q-input class="txt" v-model="profileData.driveLicense" readonly filled label="Sürücü Belgesi"
                            lazy-rules :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
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
                        <div class="input-group">
                          <q-input class="txt" v-model="profileData.address" readonly filled label="Adres" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                        </div>

                        <div class="input-group">
                          <q-input class="txt" v-model="profileData.phone" readonly filled label="Telefon" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                        </div>

                        <div class="input-group">
                          <q-input class="txt" v-model="profileData.mail" readonly filled label="Mail" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
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
