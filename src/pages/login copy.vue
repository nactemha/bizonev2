<template>
    <v-card rounded="md" elevation="10" class="px-sm-1 px-0 withbg mx-auto" max-width="500">
        <v-card-item class="pa-sm-8">

            <div class="d-flex justify-center py-4">
                <Logo />
            </div>
            <div class="text-body-1 text-muted text-center mb-3">{{ $t("loginusernameandpassword") }}</div>
            <v-row class="d-flex mb-3">
                <v-col cols="12">
                    <v-label class="font-weight-bold mb-1">{{ $t("username") }} </v-label>
                    <v-text-field variant="outlined" hide-details color="primary"></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-label class="font-weight-bold mb-1">{{ $t("password") }}</v-label>
                    <v-text-field variant="outlined" type="password" hide-details color="primary"></v-text-field>
                </v-col>
                <v-col v-if="false" cols="12" class="pt-0">
                    <div class="d-flex flex-wrap align-center ml-n2">
                        <v-checkbox v-model="checkbox" color="primary" hide-details>
                            <template v-slot:label class="text-body-1">Remeber this Device</template>
                        </v-checkbox>
                        <div class="ml-sm-auto">
                            <NuxtLink to="/"
                                class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium">{{
                                    $t("forgot-password") }}</NuxtLink>
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" class="pt-0">
                    <v-btn to="/" color="primary" size="large" block flat>{{ $t("sign-in") }}</v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn to="/esign" color="pink-accent-3" block class="white--text mb-2">
                        <v-icon left>fa:fas fa-signature</v-icon>
                        <p class="ml-3">{{ $t("e-sign") }}</p>
                    </v-btn>


                </v-col>
                <v-col>
                    <v-btn to="/ldap" color="indigo-darken-3" block class="white--text mb-2">
                        <v-icon left>fa:fas fa-folder-tree</v-icon>
                        <p class="ml-3">{{ $t("ldap") }}</p>
                    </v-btn>

                </v-col>

            </v-row>
            <h6 class="text-h6 text-muted font-weight-medium d-flex justify-center align-center mt-3">
                <NuxtLink to="/register"
                    class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium pl-2">
                    {{ $t("create-account") }}</NuxtLink>
            </h6>
            <div class="d-flex justify-end py-4">
                <img v-if="$i18n.locale != 'en'" @click="$i18n.locale = 'en'" src="/images/en.svg" alt="logo" width="25"
                    height="25" class="elevation-3" />
                <img v-if="$i18n.locale != 'tr'" @click="$i18n.locale = 'tr'" src="/images/tr.svg" alt="logo" width="25"
                    height="25" class="elevation-3" />
            </div>
        </v-card-item>
    </v-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checkbox = ref(true);

</script>
```