<template>
    <!-- <v-sheet class="mx-auto my-10" max-width="450">
        <alert />
    </v-sheet> -->
    <div class="mx-auto my-10">
        你不必一個人辛苦奮戰
    </div>
    <div class="ma-10 text-center">
        <div>
            核心理念
        </div>
        <div>
            讓好人才與好公司讓好人才與好公司相遇
        </div>
        <div class="d-flex justify-center">
            <v-card class="mx-3" v-for="n in 3">
                <v-img class="align-end text-white" height="200" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                    cover>
                    <v-card-title>Top 10 Australian beaches</v-card-title>
                </v-img>

                <v-card-subtitle class="pt-4">
                    Number 10
                </v-card-subtitle>

                <v-card-text>
                    <div>Whitehaven Beach</div>

                    <div>Whitsunday Island, Whitsunday Islands</div>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="orange">
                        Share
                    </v-btn>

                    <v-btn color="orange">
                        Explore
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </div>
    <div class="ma-10 ">
        <div class="d-flex justify-center ">
            <div>
                面試分享
            </div>
            <a>
                看更多 >
            </a>
        </div>

        <div class="d-flex justify-center">

        </div>
    </div>
</template>
<script setup>
import { ref, inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useResultStore } from '@/stores/result';
import Experience from '@/components/Experience.vue'

const authStore = useAuthStore()
const resultStore = useResultStore()
const reload = inject("reload")

const router = useRouter()
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
        router.push("/profile")
        reload()
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