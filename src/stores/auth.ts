import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
    const isSignedIn = ref(false)

    return { isSignedIn }
})

/*
import loginResponseSample from '~/data/auth/login.json'


interface UserPayloadInterface {
    username: string;
    password: string;
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authenticated: false,
        loading: false,
    }),
    actions: {
        async login({ username, password }: UserPayloadInterface) {
            //mock
            const pending=false;
            const data=loginResponseSample;
            ///mock
            
            this.loading = pending;

            if (data) {
                const token = useCookie('token'); // useCookie new hook in nuxt 3
                token.value = data?.token; // set token to cookie
                this.authenticated = true; // set authenticated  state value to true
            }
        },
        logOut() {
            const token = useCookie('token'); // useCookie new hook in nuxt 3
            this.authenticated = false; // set authenticated  state value to false
            token.value = null; // clear the token cookie
        },
    },
});
*/

