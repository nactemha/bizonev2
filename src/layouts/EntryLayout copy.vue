<template>
    <div id="q-app">
        <div class="absolute-center q-pa-md" style="margin:0px 0;">

            <q-card class="my-card" style="-webkit-box-shadow: -10px 0px 13px -7px #5B9773, 10px 0px 13px -7px #000000, 5px 5px 15px 5px  rgba(91,151,115,0);box-shadow: -10px 0px 13px -7px #5B9773, 10px 0px 13px -7px #5B9773, 5px 5px 15px 5px rgba(91,151,115,0);
                    border-radius:15px;width:340px;border-bottom:11px solid #FFCB00;">

                <i class="material-icons text-green-10"
                    style="border-radius:100px;background:#fff;font-size:100px;margin:-35px 0 0 120px;border:solid #fff 2px;">account_circle</i>

                <q-img src="/images/logo.png" spinner-color="white" fit="contain"
                    style="margin:0 auto 10px auto;display: block;height: 44px; width:199px"></q-img>

                <q-card-section>

                    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md" style="padding:0 29px 18px 29px;">

                        <q-input color="green" v-model="user" label="User" hint="" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Por favor, digite seu usuário!']"></q-input>
                        <q-input color="green" :type="isPwd ? 'password' : 'text'" v-model="password" label="Senha"
                            lazy-rules :rules="[val => val && val.length > 0 || 'Por favor digite sua senha!']">
                            <template v-slot:append>
                                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                    @click="isPwd = !isPwd"></q-icon>
                            </template>

                        </q-input>

                        <div>
                            <q-btn style="display: block;margin:30px auto 0 auto;padding:0 30px" label="Enter" type="submit"
                                color="green-10"></q-btn>
                        </div>
                    </q-form>

                </q-card-section>
            </q-card>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const password = ref('')
const isPwd = ref(true)
const name = ref(null)
const age = ref(null)
const accept = ref(false)
function onSubmit() {
    if (accept.value !== true) {
        this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: 'You need to accept the license and terms first'
        })
    }
    else {
        this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Submitted'
        })
    }
}
function onReset() {
    name.value = null
    age.value = null
    accept.value = false
}
</script>
<style>
html {
    height: 100%
}

body {
    background: #fff url(images/background.png) no-repeat;
    background-size: cover;
    height: 100%;
}
</style>