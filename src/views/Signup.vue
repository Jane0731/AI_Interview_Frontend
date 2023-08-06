<template>
    <div>
        <v-card class="mx-auto pa-12 pb-8 my-10" elevation="8" max-width="600" rounded="lg">
            <v-card-title primary-title class="mb-4 text-center text-h5">
                註冊
            </v-card-title>
            <v-form v-model="form" @submit.prevent="onSubmit" class="">

                <div class="text-subtitle-1 ">電子郵件</div>
                <v-text-field density="compact" v-model="email" prepend-inner-icon="mdi-email-outline" type="email"
                    color="primary" variant="underlined" :readonly="loading"
                    :rules="[rules.required, rules.email]"></v-text-field>

                <div class="text-subtitle-1 mt-2">密碼</div>
                <v-text-field density="compact" prepend-inner-icon="mdi-lock-outline"
                    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" v-model="password" color="primary"
                    variant="underlined" :readonly="loading" :rules="[rules.required, rules.password]"
                    @click:append-inner="showPassword = !showPassword"
                    :type="showPassword ? 'text' : 'password'"></v-text-field>

                <div class="text-subtitle-1 mt-2">確認密碼</div>
                <v-text-field density="compact" prepend-inner-icon="mdi-lock-outline"
                    :append-inner-icon="showCConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'" v-model="confirmPassword"
                    color="primary" variant="underlined" :readonly="loading"
                    :rules="[rules.required, rules.password, rules.comparePassword]"
                    @click:append-inner="showCConfirmPassword = !showCConfirmPassword"
                    :type="showCConfirmPassword ? 'text' : 'password'"></v-text-field>

                <div class="text-subtitle-1 mt-2">姓名</div>
                <v-text-field density="compact" prepend-inner-icon="mdi-badge-account-outline" v-model="name"
                    color="primary" variant="underlined" :readonly="loading"
                    :rules="[rules.required, rules.name]"></v-text-field>

                <div class="text-subtitle-1 mt-2">性別</div>
                <v-radio-group v-model="sex" inline :rules="[rules.required]">
                    <v-radio label="男性" value="M" color="info"></v-radio>
                    <v-radio label="女性" value="F" color="info"></v-radio>
                    <v-radio label="其他" value="O" color="info"></v-radio>
                </v-radio-group>
                <v-card class="mb-4" :color="resultStore.result.type" variant="tonal" v-if="resultStore.result.message">
                    <v-card-text>
                        {{ resultStore.result.message }}
                    </v-card-text>
                </v-card>
                <v-btn :loading="loading" block class="mb-8 mt-2" color="blue" size="large" variant="elevated" type="submit"
                    :disabled="!form">
                    <div class="text-subtitle-1 ">註冊</div>
                </v-btn>

                <v-card-text class="text-center">
                    <v-btn color="blue" variant="text" @click="onLogin">
                        <v-icon icon="mdi-chevron-right"></v-icon>
                        <div class="text-subtitle-1 ">已有帳號</div>
                    </v-btn>
                </v-card-text>
            </v-form>

        </v-card>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user';
import { useResultStore } from '@/stores/result';

const router = useRouter()
const form = ref(false)
const loading = ref(false)
const email = ref(null)
const password = ref(null)
const confirmPassword = ref(null)
const name = ref(null)
const sex = ref(null)
const showPassword = ref(false)
const showCConfirmPassword = ref(false)
const userStore = useUserStore()
const resultStore = useResultStore()

const onSubmit = async () => {
    if (!form.value) return
    loading.value = true
    if(sex.value=='O') sex.value=null
    await userStore.register(name.value, sex.value, email.value, password.value)
    loading.value = false
    if (userStore.isSuccessRegist) router.push("/login")
}

const rules = {
    required: value => !!value || '欄位必填',
    password: value => {
        const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        return pattern.test(value) || '密碼需八個字元以上，至少包含一個字母和一個數字'
    },

    email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || '電子郵件格式錯誤'
    },
    comparePassword: value => {
        return value == password.value || '兩次密碼輸入不同'
    },
    name: value => {
        return value.length <= 20 || '最多輸入20個字元'
    }
}

const onLogin = () => {
    router.push({
        name: 'Login',
    })
}
</script>