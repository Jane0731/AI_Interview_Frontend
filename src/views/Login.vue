<template>
    <!-- <v-sheet class="mx-auto my-10" max-width="450">
        <alert />
    </v-sheet> -->
    <v-card class="mx-auto pa-12 pb-8 my-10" elevation="8" max-width="600" rounded="lg">

        <v-card-title primary-title class="mb-4 text-center text-h5">
            登入
        </v-card-title>
        <v-form v-model="form" @submit.prevent="onSubmit" class="">

            <v-text-field density="compact" v-model="email" prepend-inner-icon="mdi-email-outline" type="email"
                color="primary" variant="underlined" :readonly="loading"
                :rules="[rules.required, rules.email]"></v-text-field>

            <v-text-field density="compact" prepend-inner-icon="mdi-lock-outline" class="mb-2"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" v-model="password" color="primary"
                variant="underlined" :readonly="loading" :rules="[rules.required,rules.password]"
                @click:append-inner="showPassword = !showPassword"
                :type="showPassword ? 'text' : 'password'"></v-text-field>
            <v-card class="mb-4" :color="resultStore.result.type" variant="tonal" v-if="resultStore.result.message">
                <v-card-text>
                    {{ resultStore.result.message }}
                </v-card-text>
            </v-card>
            <v-btn :loading="loading" block class="mb-8 mt-2" color="blue" size="large" variant="elevated" type="submit"
                :disabled="!form">
                <div class="text-subtitle-1 ">登入</div>
            </v-btn>

            <v-card-text class="text-center">
                <v-btn color="blue" variant="text" @click="onSignup">
                    <v-icon icon="mdi-chevron-right"></v-icon>
                    <div class="text-subtitle-1 ">尚未註冊</div>
                </v-btn>
            </v-card-text>
        </v-form>

    </v-card>
</template>
<script setup>
import { ref, inject, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useResultStore } from '@/stores/result';

const authStore = useAuthStore()
const resultStore = useResultStore()
const reload = inject("reload")

const router = useRouter()
const route=useRoute()
const redirect = useRoute().query.redirect;
const form = ref(false)
const loading = ref(false)
const email = ref(null)
const password = ref(null)
const showPassword = ref(false)
const onSubmit = async () => {
    if (!form.value) return
    loading.value = true
    await authStore.login(email.value, password.value)
    loading.value = false
    if (authStore.isAuthorized) {
        if(redirect==''){
            router.push("/profile")
        }
        else{
            router.push(redirect)
        }
    }
}
const rules = {
    required: value => !!value || '欄位必填',
    password: value => {
        const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        return pattern.test(value) || '密碼需八個字元以上,至少包含一個字母和一個數字'
    },

    email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || '電子郵件格式錯誤'
    },
}

const onSignup = () => {
    resultStore.clear()

    router.push({
        name: 'Signup',
    })
}

</script>