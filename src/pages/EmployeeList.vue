<template>
  <div class="card-margin">
    <q-layout view="lHh lpr lFf" container style="height: 780px; margin-top: 10px;" class=" rounded-borders">
      <q-header bordered class="bg-grey-3 text-primary">
        <q-toolbar>
          <q-toolbar-title class="text-center">
            <q-avatar color="blue" text-color="white" icon="fa-solid fa-users" />
            Çalışan Bilgileri
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>

        <!-- Add and update button start -->
        <div class="q-pa-md q-gutter-sm">
          <q-btn label="Ekle" color="primary" @click="AddUpdateModal()" icon="fa-solid fa-plus" />
          <q-btn label="Excelden Aktar" color="info" icon="fa-regular fa-file-excel" />
          <q-btn label="Transfer Et" color="warning" icon="fa-solid fa-right-left" />
        </div>
        <!-- Add and update button end -->

        <!-- Data Table Start -->
        <div class="q-pa-md">

          <q-table :grid="$q.screen.xs" flat bordered title="Çalışan Listesi" :rows="data" :columns="columns"
            row-key="name" :filter="filter">
            <template v-slot:top-right>
              <q-input borderless filled dense debounce="300" v-model="filter" placeholder="Arama Yapınız">
                <!--  <template v-slot:append>
                </template> -->
              </q-input>
              <q-btn icon="search" outline style="color: gray; margin-left: 3px;" @click="GetListData(filter)" />

            </template>


            <template v-slot:body-cell-settings="props">

              <q-td :props="props">



                <!--  <q-btn-dropdown v-model="menu" style=" border: none;" icon="fa-solid  fa-ellipsis">
                  <q-list>

                    <q-item clickable v-close-popup @click="onItemClick">
                      <q-item-section avatar>
                        <q-avatar icon="fa-solid fa-pen-to-square" color="primary" text-color="white" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Düzenle</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup @click="onItemClick">
                      <q-item-section avatar>
                        <q-avatar icon="fa-solid fa-trash-can" color="primary" text-color="white" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Aktif/Pasif</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup @click="onItemClick">
                      <q-item-section avatar>
                        <q-avatar icon="fa-regular fa-clock" color="primary" text-color="white" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>İşe Alım</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup @click="onItemClick">
                      <q-item-section avatar>
                        <q-avatar icon="fa-solid fa-eye" color="primary" text-color="white" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Detay</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup @click="onItemClick">
                      <q-item-section avatar>
                        <q-avatar icon="fa-solid fa-qrcode" color="primary" text-color="white" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Yaka Kartı</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup @click="onItemClick">
                      <q-item-section avatar>
                        <q-avatar icon="fa-solid fa-user" color="primary" text-color="white" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Profil</q-item-label>
                      </q-item-section>
                    </q-item>



                  </q-list>

                </q-btn-dropdown>
 -->

                <button class="btn" title="Düzenle">
                  <i class="fa-solid fa-pen-to-square" @click="AddUpdateModal(props.row)"></i>
                </button>

                <button class="btn" title="Durumu">
                  <i class="fa-solid fa-trash-can"></i>
                </button>

                <button class="btn" title="İşe Alım Süreci" @click="workProcessModal = !workProcessModal">
                  <i class="fa-regular fa-clock"></i>
                </button>

                <button class="btn" title="Detay" @click="detailModal = !detailModal">
                  <i class="fa-solid fa-eye"></i>
                </button>

                <button class="btn" title="Yaka Kartı">
                  <i class="fa-solid fa-qrcode"></i>
                </button>

                <button class="btn" title="Profil">
                  <a href="/profile" target="_blank" style="color:rgb(62, 62, 62)">
                    <i class="fa-solid fa-user"></i>
                  </a>
                </button>


              </q-td>

            </template>

          </q-table>
        </div>
        <!-- Data Table End -->


      </q-page-container>

    </q-layout>
  </div>


  <!-- Add and update modal start -->
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="addUpdateModal">
      <q-card>

        <q-card-section>
          <div class="text-h6">{{ modelAddUpdateValue.title }}</div>
        </q-card-section>

        <q-form @submit="onSubmit" class="q-gutter-md">

          <q-separator />

          <q-card-section style="max-height: 70vh; " class="scroll">

            <div class="q-pa-md">
              <div class="q-gutter-y-md">
                <div>
                  <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary"
                    align="justify" narrow-indicator>
                    <q-tab name="basicInfo" label="Temel Bilgiler" v-if="isWhoModelBasicInfo"
                      icon="fa-solid fa-address-card" />
                    <q-tab name="workplace" label="İş Yeri" v-if="isWhoModelWorkplace" icon="fa-solid fa-building" />
                    <q-tab name="other" label="Diğer" v-if="isWhoModelOther" icon="fa-solid fa-clipboard-list" />
                  </q-tabs>



                  <q-separator />

                  <q-tab-panels v-model="tab" animated>

                    <q-tab-panel name="basicInfo" v-if="isWhoModelBasicInfo">
                      <div class=" modal">

                        <div class="input-area">
                          <q-select class="select" style="width: 450px;" filled v-model="type"
                            :virtual-scroll-horizontal="false" :options="['Seçiniz', 'Türkiye', 'Almanta', 'Rusya']"
                            label="Uyruk" lazy-rules :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                        </div>


                        <div class="input-area">
                          <q-input class="txt" filled type="number" v-model="barcode" label="Kimlik No" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                        </div>

                        <div class="input-area">
                          <q-input class="txt" v-model="medicineName" filled label="Ad" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                        </div>

                        <div class="input-area">
                          <q-input class="txt" v-model="brand" filled label="Soyad" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                        </div>



                        <div class="input-area">
                          <q-select class="select" filled v-model="type" :virtual-scroll-horizontal="false"
                            :options="['Seçiniz', 'Erkek', 'Kadın']" label="Cinsiyet" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                        </div>

                        <div class="input-area">
                          <q-input class="txt" filled type="date" v-model="barcode" label="Doğum Tarihi" lazy-rules
                            :rules="[val => val && val.length > 0 || 'boş geçilemez']" />
                        </div>

                        <div class="input-area">
                          <q-select class="select" filled v-model="type" :virtual-scroll-horizontal="false"
                            :options="['Seçiniz', 'İstanbul', 'Ankara']" label="Doğum Yeri" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                        </div>

                        <div class="input-area">
                          <q-select class="select" filled v-model="type" :virtual-scroll-horizontal="false"
                            :options="['Seçiniz', 'İstanbul', 'Ankara']" label="Kan Grubu" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                        </div>

                        <div class="input-area">
                          <q-input class="txt" v-model="brand" filled label="Telefon" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                        </div>

                        <div class="input-area">
                          <q-input class="txt" v-model="brand" filled label="Mail" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                        </div>



                      </div>
                    </q-tab-panel>

                    <q-tab-panel name="workplace" v-if="isWhoModelWorkplace">

                      <div class="input-area">
                        <q-input class="txt" v-model="brand" style="width: 450px;" filled label="İş Yeri Sicil No"
                          lazy-rules :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                      </div>

                      <div class="input-area">
                        <q-input class="txt" v-model="brand" filled label="Ünvan" lazy-rules
                          :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                      </div>

                      <div class="input-area">
                        <q-select class="select" filled v-model="type" :virtual-scroll-horizontal="false"
                          :options="['Seçiniz']" label="Bölüm" lazy-rules
                          :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                      </div>

                      <div class="input-area">
                        <q-input class="txt" v-model="brand" filled label="SGK Meslek No" lazy-rules
                          :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                      </div>

                      <div class="input-area">
                        <q-select class="select" filled v-model="type" :virtual-scroll-horizontal="false"
                          :options="['Seçiniz']" label="SGK Meslek Adı" lazy-rules
                          :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                      </div>

                      <div class="input-area">
                        <q-select class="select" filled v-model="type" :virtual-scroll-horizontal="false"
                          :options="['Seçiniz']" label="Görev" lazy-rules
                          :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                      </div>

                      <div class="input-area">
                        <q-select class="select" filled v-model="type" :virtual-scroll-horizontal="false"
                          :options="['Seçiniz']" label="Vardiya" lazy-rules
                          :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                      </div>

                      <div class="input-area">
                        <q-select class="select" filled v-model="type" :virtual-scroll-horizontal="false"
                          :options="['Seçiniz']" label="Yaka Rengi" lazy-rules
                          :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                      </div>

                      <div class="input-area">
                        <q-select class="select" filled v-model="type" :virtual-scroll-horizontal="false"
                          :options="['Seçiniz']" label="Sözleşme Türü" lazy-rules
                          :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                      </div>

                      <div class="input-area">
                        <q-select class="select" filled v-model="type" :virtual-scroll-horizontal="false"
                          :options="['Seçiniz']" label="1. Yönetici" lazy-rules
                          :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                      </div>

                      <div class="input-area">
                        <q-select class="select" filled v-model="type" :virtual-scroll-horizontal="false"
                          :options="['Seçiniz']" label="2. Yönetici" lazy-rules
                          :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                      </div>

                      <div class="input-area">
                        <q-input class="txt" filled type="date" v-model="barcode" label="İşe Giriş Tarihi" lazy-rules
                          :rules="[val => val && val.length > 0 || 'boş geçilemez']" />
                      </div>

                      <div class="input-area">
                        <q-input class="txt" filled type="date" v-model="barcode" label="İşten Çıkış Tarihi" lazy-rules
                          :rules="[val => val && val.length > 0 || 'boş geçilemez']" />
                      </div>



                    </q-tab-panel>

                    <q-tab-panel name="other" v-if="isWhoModelOther">

                      <div class="input-area">
                        <q-select class="select" style="width: 450px;" filled v-model="type"
                          :virtual-scroll-horizontal="false" :options="['Seçiniz', 'Evli', 'Bekar']" label="Medeni Hali"
                          lazy-rules :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                      </div>

                      <div class="input-area">
                        <q-select class="select" filled v-model="type" :virtual-scroll-horizontal="false"
                          :options="['Seçiniz', 'İlkokul', 'Ortaokul', 'Lise', 'Ön Lisans', 'Lisans', 'Yüksek Lisans', 'Doktora']"
                          label="Eğitim Durumu" lazy-rules :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                      </div>

                      <div class="input-area">
                        <q-select class="select" filled v-model="type" :virtual-scroll-horizontal="false"
                          :options="['Seçiniz', 'Tecilli', 'Muaf', 'Yapıldı']" label="Askerlik Durumu" lazy-rules
                          :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                      </div>

                      <div class="input-area">
                        <q-input class="txt" filled type="number" v-model="barcode" label="Çocuk Sayısı" lazy-rules
                          :rules="[val => val && val.length > 0 || 'boş geçilemez']" />
                      </div>

                      <div class="input-area">
                        <q-select class="select" filled v-model="type" :virtual-scroll-horizontal="false"
                          :options="['Seçiniz']" label="İl" lazy-rules
                          :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                      </div>

                      <div class="input-area">
                        <q-select class="select" filled v-model="type" :virtual-scroll-horizontal="false"
                          :options="['Seçiniz']" label="İlçe" lazy-rules
                          :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                      </div>

                      <div class="input-area">
                        <q-input class="txt" filled autogrow v-model="barcode" label="Ev Adresi" lazy-rules
                          :rules="[val => val && val.length > 0 || 'boş geçilemez']" />
                      </div>



                      <div class="input-area">
                        <q-input class="txt" filled type="number" v-model="barcode" label="Pdks Id"
                          title="Personel Devam Kontrol Sistemi Numarası" lazy-rules
                          :rules="[val => val && val.length > 0 || 'boş geçilemez']"
                          hint="Personel Devam Kontrol Sistemi Numarası" />
                      </div>


                      <div class="input-area">
                        <q-toggle v-model="dense" label="Terör Mağduru" />
                      </div>

                      <div class="input-area">
                        <q-toggle v-model="dense1" label="Eski Hükümlü" />
                      </div>

                    </q-tab-panel>

                  </q-tab-panels>

                  <hr>

                  <!--   <div class="input-area q-ma-md">
                    <q-select class="select" style="width: 450px;" filled v-model="type"
                      :virtual-scroll-horizontal="false" :options="['Seçiniz', 'Var', 'Yok', 'Rusya']"
                      label="Mernis Kontrolü" lazy-rules :rules="[val => val && val.length > 0 || 'Boş geçilemez']" />
                  </div> -->

                  <!-- <div class="input-area q-ma-md">
                    <q-toggle v-model="dense" label="Mernis Kontrolü" />
                  </div> -->

                  <div class="input-area q-ma-md">
                    <q-checkbox v-model="dense" val="1" label="Mernis Kontrolü" color="teal" />
                  </div>



                </div>


              </div>
            </div>


          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn flat label="Kapat" color="red" v-close-popup />
            <q-btn flat :label="modelAddUpdateValue.button" type="submit" color="primary" />
          </q-card-actions>


        </q-form>

      </q-card>
    </q-dialog>
  </div>
  <!-- Add and update modal end -->

  <!-- Detail Modal Start -->
  <div class="q-pa-md q-gutter-sm">

    <q-dialog v-model="detailModal" full-width>
      <q-card>
        <q-card-section>
          <div class="text-h6">Çalışan Detay</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 80vh" class="scroll">


          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-4   q-ma-md">
              <h6 style="margin: 0; text-align: center;">İş Yeri Bilgileri</h6>
              <hr>
              <q-markup-table style="box-shadow: none; border: none;">
                <thead>
                  <tr class="bg-light">
                    <th class="text-left" style="width:5px">#</th>
                    <th class="text-left"></th>
                    <th class="text-left">Değerler</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-left text-bold">İş Yeri Sicil No</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">2321122112</td>
                  </tr>

                  <tr class="bg-light">
                    <td class="text-left text-bold">Ünvan</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">Full Stack Developer</td>
                  </tr>

                  <tr>
                    <td class="text-left text-bold">Bölüm</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">Arge Departman</td>
                  </tr>

                  <tr class="bg-light">
                    <td class="text-left text-bold">Sgk Meslek no</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">Arge</td>
                  </tr>


                  <tr>
                    <td class="text-left text-bold">Sgk Meslek Adı</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">360</td>
                  </tr>

                  <tr class="bg-light">
                    <td class="text-left text-bold">Görev</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">Kod Yazmak</td>
                  </tr>

                  <tr>
                    <td class="text-left text-bold">Vardiya</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">Yok</td>
                  </tr>

                  <tr class="bg-light">
                    <td class="text-left text-bold">Yaka Rengi</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">Beyaz</td>
                  </tr>

                  <tr>
                    <td class="text-left text-bold">Sözleşme Türü</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">Tam Zamanlı</td>
                  </tr>

                  <tr class="bg-light">
                    <td class="text-left text-bold">1. Yönetici</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">Ahmet</td>
                  </tr>

                  <tr>
                    <td class="text-left text-bold">2. Yönetici</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">Veli</td>
                  </tr>

                  <tr class="bg-light">
                    <td class="text-left text-bold">İşe Giriş Tarihi</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">01/10/2023</td>
                  </tr>

                  <tr>
                    <td class="text-left text-bold">1. İşten Çıkış Tarihi</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">01/10/2024</td>
                  </tr>
                </tbody>
              </q-markup-table>
            </div>

            <div class=" col-sm-12 col-md-12 col-lg-4 q-ma-md">
              <h6 style="margin: 0; text-align: center;">Temel Bilgiler</h6>
              <hr>
              <q-markup-table style="box-shadow: none; border: none;">
                <thead>
                  <tr class="bg-light">
                    <th class="text-left" style="width:5px">#</th>
                    <th class="text-left"></th>
                    <th class="text-left">Değerler</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-left text-bold">Uyruk</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">T.C.</td>
                  </tr>

                  <tr class="bg-light">
                    <td class="text-left text-bold">Kimlik No</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">4545454422</td>
                  </tr>

                  <tr>
                    <td class="text-left text-bold">Ad</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">Buğra</td>
                  </tr>

                  <tr class="bg-light">
                    <td class="text-left text-bold">Soyad</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">Dost</td>
                  </tr>


                  <tr>
                    <td class="text-left text-bold">Cinsiyet</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">Erkek</td>
                  </tr>

                  <tr class="bg-light">
                    <td class="text-left text-bold">Doğum Tarihi</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">12/12/2000</td>
                  </tr>

                  <tr>
                    <td class="text-left text-bold">Doğum Yeri</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">İstanbul</td>
                  </tr>

                  <tr class="bg-light">
                    <td class="text-left text-bold">Kan Grubu</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">0RH +</td>
                  </tr>

                  <tr>
                    <td class="text-left text-bold">Telefon</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">0555 555 332 22</td>
                  </tr>

                  <tr class="bg-light">
                    <td class="text-left text-bold">Mail</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">bugra@arge360.com</td>
                  </tr>
                </tbody>
              </q-markup-table>
            </div>

            <div class="col q-ma-md">
              <h6 style="margin: 0; text-align: center;">Diğer Bilgiler</h6>
              <hr>
              <q-markup-table style="box-shadow: none; border: none;">
                <thead>
                  <tr class="bg-light">
                    <th class="text-left" style="width:5px">#</th>
                    <th class="text-left"></th>
                    <th class="text-left">Değerler</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-left text-bold">Medeni Hali</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">Evli</td>
                  </tr>

                  <tr class="bg-light">
                    <td class="text-left text-bold">Eğitim Durumu</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">Lisans</td>
                  </tr>

                  <tr>
                    <td class="text-left text-bold">Askerlik Durumu</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">Yapıldı</td>
                  </tr>

                  <tr class="bg-light">
                    <td class="text-left text-bold">Çocuk Sayısı</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">1</td>
                  </tr>


                  <tr>
                    <td class="text-left text-bold">İl</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">Konya</td>
                  </tr>

                  <tr class="bg-light">
                    <td class="text-left text-bold">İlçe</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">Selçuklu</td>
                  </tr>

                  <tr>
                    <td class="text-left text-bold">Doğum Yeri</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">İstanbul</td>
                  </tr>

                  <tr class="bg-light">
                    <td class="text-left text-bold">Ev Adresi</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">Konya/Selçuklu</td>
                  </tr>

                  <tr>
                    <td class="text-left text-bold">Pdks Id</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">33222</td>
                  </tr>

                  <tr class="bg-light">
                    <td class="text-left text-bold">Terör Mağduru</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">Hayır</td>
                  </tr>

                  <tr>
                    <td class="text-left text-bold">Eski Hükümlü</td>
                    <td class="text-left text-bold">:</td>
                    <td class="text-left">Hayır</td>
                  </tr>
                </tbody>
              </q-markup-table>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Kapat" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
  <!-- Detail Modal end -->

  <!-- Work process Modal Start -->
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="workProcessModal" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="fa-solid fa-briefcase" color="primary" text-color="white" />
          <span class="q-ml-sm">Bu Çalışan İçin İşe Alım Süreci Başlatmak İstediğinize Emin misiniz ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Kapat" color="primary" v-close-popup />
          <q-btn flat label="Başlat" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
  <!-- Work process Modal Start -->
</template>

<script setup>
import { ref } from 'vue'
import data from 'src/data/employee.json'

/* Data Table Start */
const filter = ref('')
const menu = ref(false)
const columns = [

  { name: 'settings', field: 'settings', align: "left", sortable: true },
  { name: 'id', align: 'left', label: '#', field: 'id', sortable: true },
  { name: 'Name', label: 'Adı', align: 'left', field: 'Name', sortable: true },
  { name: 'Surname', label: 'Soyadı', align: 'left', field: 'Surname', sortable: true },
  { name: 'Workplace', label: 'İş Yeri', align: 'left', field: 'Workplace', sortable: true },
  { name: 'Title', label: 'Ünvanı', align: 'left', field: 'Title', sortable: true },
  {
    name: 'status', label: 'Durum', align: 'left', field: 'Status', sortable: true,
    format: val => val ? "Aktif" : "Pasif",
    style: val => val.Status ? "color:green" : "color:red",
  },
]
/* Data Table end */



// Add update start
var tab = ref('basicInfo')
var addUpdateModal = ref(false)
var modelAddUpdateValue = {
  title: ref(""),
  button: ref(""),

}

var isWhoModelBasicInfo = ref(false) // false is insert , true is update
var isWhoModelWorkplace = ref(false) // false is insert , true is update
var isWhoModelOther = ref(false) // false is insert , true is update


var dense = ref(false)
var dense1 = ref(false)


const AddUpdateModal = (row = null) => {

  //modelAddUpdateValue.medicineModal.value = true;
  addUpdateModal.value = true


  if (row == null) { // Add
    modelAddUpdateValue.title = "Çalışan Ekle"
    modelAddUpdateValue.button = "Ekle"
    isWhoModelBasicInfo = true
    isWhoModelWorkplace = false
    isWhoModelOther = false
  }
  else { // Update
    modelAddUpdateValue.title = "İlaç Güncelle"
    modelAddUpdateValue.button = "Güncelle"
    isWhoModelBasicInfo = true
    isWhoModelWorkplace = true
    isWhoModelOther = true
  }
}
// Add update end

// Detail start
var detailModal = ref(false)
// Detail end

// workProcess start
var workProcessModal = ref(false)
// workProcess end


</script>

<style lang="scss" scoped>
.btn {
  background: transparent;
  border: none;
  cursor: pointer;
}

.input-area {
  margin-bottom: 5px;
}

.bg-light {
  background: #d8d8d8;
}
</style>
