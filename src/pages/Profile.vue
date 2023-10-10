<template>
  <q-page>
    <div class="absolute-center full-width" style="max-width: 1000px;">

      <q-card class="my-card" style="-webkit-box-shadow: -10px 10px 13px -7px #5c5c5c;
      box-shadow: 0px 0px 20px 5px #5c5c5c;
      border-radius:15px;">

        <i class="material-icons text-blue-10"
          style="border-radius:100px;background:#fff;font-size:100px;margin:-35px 0 0 0px;border:solid #fff 2px;">account_circle</i>

        <q-card-section>

          <div class="text-h3 text-weight-bolder text-center mb-3">{{ title }} </div>
          <div class="text-h4 text-weight text-center mb-3">{{ userName }}</div>


          <!--   <div class="q-pa-md">
            <div class="q-gutter-md" style="max-width: 1000px">

              <div class="text-h5 q-mt-sm q-mb-xs">Adres</div>
              <q-input standout="bg-blue text-white" v-model="text" readonly label="Custom standout" />

            </div>


              <q-card-section>

                <div class="q-pa-md">
                  <div class="q-gutter-md">

                    <div class="text-h5 q-mt-sm q-mb-xs">Adres</div>
                    <q-input standout="bg-blue text-white" v-model="text" readonly label="arge 360 Şişli/İstanbul" />

                    <div class="text-h5 q-mt-sm q-mb-xs">Telefon</div>
                    <q-input standout="bg-blue text-white" v-model="text" readonly label="0555 555 5555" />

                    <div class="text-h5 q-mt-sm q-mb-xs">Mail</div>
                    <q-input standout="bg-blue text-white" v-model="text" readonly label="info@arge360.com" />

                  </div>
                </div>

              </q-card-section>
          </div> -->



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

                    <div class="q-pa-md">
                      <div class="q-gutter-md">


                        <div class="text-h6 q-mt-sm q-mb-xs ">Adres</div>
                        <q-input standout="bg-blue text-white" class="bg-white" v-model="address" />

                        <div class="text-h6 q-mt-sm q-mb-xs">Telefon</div>
                        <q-input standout="bg-blue text-white" v-model="phone" readonly />

                        <div class="text-h6 q-mt-sm q-mb-xs">Mail</div>
                        <q-input standout="bg-blue text-white" v-model="mail" readonly />

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
                        <q-input standout="bg-blue text-white" v-model="civilStatus" readonly />

                        <div class="text-h6 q-mt-sm q-mb-xs">Uyruk</div>
                        <q-input standout="bg-blue text-white" v-model="nationality" readonly />

                        <div class="text-h6 q-mt-sm q-mb-xs">Askerlik Durumu</div>
                        <q-input standout="bg-blue text-white" v-model="soldiering" readonly />

                        <div class="text-h6 q-mt-sm q-mb-xs">Doğum Tarihi</div>
                        <q-input standout="bg-blue text-white" v-model="birthDate" readonly />

                        <div class="text-h6 q-mt-sm q-mb-xs">Doğum Yeri</div>
                        <q-input standout="bg-blue text-white" v-model="birtyPlace" readonly />

                        <div class="text-h6 q-mt-sm q-mb-xs">Sürücü Belgesi</div>
                        <q-input standout="bg-blue text-white" v-model="driveLicense" readonly />

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
                    {{ lorem }}
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
                    {{ lorem }}
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

<script>
import { ref } from 'vue'

export default {
  setup() {
    return {
      contact: ref(true),
      personal: ref(false),
      computer: ref(false),
      language: ref(false),
      title: "Profil Detayları",
      userName: "Buğra Dost",
      address: "arge 360 Şişli/İstanbul",
      phone: "0555 555 5555",
      mail: "info@arge360.com",
      civilStatus: "Evli",
      nationality: "Türkiye",
      soldiering: "Yapıldı",
      birthDate: "12.12.1999",
      birtyPlace: "İstanbul",
      driveLicense: "B",
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  }
}

</script>


<style lang="scss" scoped>
.my-card {
  width: 100%;

}
</style>
