<template>
    <q-page>
        <div class="absolute-center full-width q-pa-sm" style="max-width: 550px;">

            <q-card class="my-card" style="-webkit-box-shadow: -10px 0px 13px -7px #5B9773, 10px 0px 13px -7px #000000, 5px 5px 15px 5px  rgba(91,151,115,0);box-shadow: -10px 0px 13px -7px #5B9773, 10px 0px 13px -7px #5B9773, 5px 5px 15px 5px rgba(91,151,115,0);
        border-radius:15px;border-bottom:11px solid #FFCB00;">
                <i class="material-icons text-green-10"
                    style="border-radius:100px;background:#fff;font-size:100px;margin:-35px 0 0 0px;border:solid #fff 2px;">account_circle</i>
                <q-img src="/images/logo.png" spinner-color="white" fit="contain" class="fill-width"
                    style="margin:-100px auto 0 auto;border-radius:5px 5px 0px 0px;padding:10px;background:#fff; border:solid #fff 2px;display: block;height: 44px; max-width:200px"></q-img>

                <q-card-section>

                    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-xs" style="padding:0 29px 18px 29px;">
                        <div class="text-h6 text-weight-bolder text-center mb-3">{{ $t("lbl_esign_login") }} </div>

                        <q-input color="green" v-model="username" :label="$t('lbl_tcidentity')" hint=""
                            :rules="rule_tcidentity"></q-input>


                        <div class="row justify-center items-end q-mt-sm">
                            <q-btn class="q-pa-sd" :label="$t('btn_submit')" type="submit" color="green-10"></q-btn>
                        </div>
                    </q-form>

                </q-card-section>



                <div class="row items-end justify-between q-gutter-md q-pa-md">
                    <div class="q-gutter-sm">
                        <q-btn to="/auth/login" no-caps outline :label="$t('btn_web')" type="submit" color="pink-5"></q-btn>
                        <q-btn to="/auth/ldap" no-caps outline :label="$t('btn_ldap')" type="submit" color="blue-5"></q-btn>
                    </div>
                    <div>
                        <img v-if="getLocale() != 'en'" @click="changeLocale('en')" src="/images/en.svg" alt="logo"
                            width="25" height="25" class="shadow-3" />
                        <img v-if="getLocale() != 'tr'" @click="changeLocale('tr')" src="/images/tr.svg" alt="logo"
                            width="25" height="25" class="shadow-3" />
                    </div>
                </div>
            </q-card>

        </div>
    </q-page>
</template>
  
<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'

const { locale: i18n } = useI18n({ useScope: 'global' })
function changeLocale(loc) {
    i18n.value = loc
}
function getLocale() {
    return i18n.value
}

import { useRules } from 'src/composables/rules'
const { username: rule_username, password: rule_password } = useRules()
const $q = useQuasar()
const username = ref('')
const password = ref('')
const isPwd = ref(true)
const accept = ref(false)

function onSubmit() {
    console.log('accept.value', accept.value)

    /*

    if (accept.value !== true) {
        $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: 'You need to accept the license and terms first'
        })
    }
    else {
        $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Submitted'
        })
    }
    */
}
function onReset() {
    accept.value = false
}
</script>
  