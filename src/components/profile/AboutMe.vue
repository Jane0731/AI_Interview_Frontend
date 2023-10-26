<template>
    <v-card width="100%" class="overflow-auto">
        <v-sheet width="100%" color="primary" height="120" class="d-flex align-center justify-space-between pa-10">
            <div class="d-flex align-center">
                <v-avatar color="brown" size="x-large">
                    <div class="text-h5">{{ userStore.user?.name }}</div>
                </v-avatar>
                <div class="text-h4  mx-3 pa-6">{{ "Hi~ " + userStore.user?.name }}</div>
            </div>

        </v-sheet>
        <v-card-text class="overflow-auto cardtext-width text-h6">
            <!-- <div class="my-2 pa-2 mx-5">姓名</div> -->

            <div class="d-flex flex-row text-h6 ma-4">
                <div class="ma-2">姓名</div>
                <v-text-field class="mx-8" density="compact" v-model="changeName" variant="outlined"></v-text-field>
            </div>
            <div class="d-flex flex-row text-h6 ma-4">
                <div class="ma-2">密碼</div>
                <v-btn class="mx-8" @click.stop="showDialog = !showDialog">
                    <div>修改密碼</div>
                </v-btn>
            </div>
            <div class="d-flex flex-row text-h6 ma-4">
                <div class="ma-2">信箱</div>
                <v-text-field class="mx-8" density="compact" v-model="changeMail" variant="outlined"
                    readonly></v-text-field>
            </div>
            <div class="d-flex flex-row text-h6 ma-4">
                <div class="ma-2">性別</div>
                <v-text-field readonly class="mx-8" density="compact" v-model="changeSex" variant="outlined"></v-text-field>
            </div>
            <div class="d-flex flex-row text-h6 ma-4">
                <div class="ma-2">生日</div>
                <v-text-field readonly class="mx-8" density="compact" v-model="changeBirth"
                    variant="outlined"></v-text-field>
            </div>
            <div class="d-flex flex-row justify-end ">
                <v-btn @click.stop="openUpdateProfile()" size="large" class="text-h6 mx-3 pa-auto">
                    <div>修改資料</div>
                </v-btn>
            </div>
            <v-dialog v-model="showDialog" width="30%">
                <v-sheet rounded="lg">
                    <v-row justify="end" no-gutters class="flex-row align-center">
                        <v-col>
                            <v-spacer />
                        </v-col>
                        <v-col>
                            <div class="text-h6">修改密碼</div>
                        </v-col>
                        <v-col class="text-right">
                            <v-btn variant="plain" icon="mdi-close-circle-outline" size="x-large"
                                @click="closeDialog"></v-btn>
                        </v-col>
                    </v-row>
                    <v-divider class="mb-5"></v-divider>
                    <v-form v-model="form">
                        <div class="text-h6 ma-4">
                            <v-text-field density="compact" label="舊密碼"
                                :append-inner-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'" v-model="oldPassword"
                                color="primary" variant="outlined" :readonly="loading"
                                :rules="[rules.required, rules.password]"
                                @click:append-inner="showOldPassword = !showOldPassword"
                                :type="showOldPassword ? 'text' : 'password'">
                            </v-text-field>
                        </div>
                        <div class="text-h6 ma-4">

                            <v-text-field density="compact" label="新密碼"
                                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" v-model="password"
                                color="primary" variant="outlined" :readonly="loading"
                                :rules="[rules.required, rules.password]" @click:append-inner="showPassword = !showPassword"
                                :type="showPassword ? 'text' : 'password'">
                            </v-text-field>
                        </div>
                        <div class="text-h6 ma-4">
                            <v-text-field label="確認新密碼" density="compact"
                                :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                v-model="confirmPassword" color="primary" variant="outlined" :readonly="loading"
                                :rules="[rules.required, rules.password, rules.comparePassword]"
                                @click:append-inner="showConfirmPassword = !showConfirmPassword"
                                :type="showConfirmPassword ? 'text' : 'password'"></v-text-field>
                        </div>
                        <v-card class="text-h6 ma-4" :color="resultStore.result.type" variant="tonal"
                            v-if="resultStore.result.message">
                            <v-card-text>
                                {{ resultStore.result.message }}
                            </v-card-text>
                        </v-card>
                        <div class="text-h6 ma-4 text-center">
                            <v-btn :disabled="!form" color="primary" @click.prevent="onPasswordSubmit" type="submit"
                                class="mb-2 ">
                                <div class="text-h6 ">送出</div>
                            </v-btn>
                        </div>

                    </v-form>
                </v-sheet>
            </v-dialog>
        </v-card-text>
    </v-card>
</template>
<script setup>
import { onMounted, computed } from 'vue';
import { useResultStore } from '@/stores/result';
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
const resultStore = useResultStore()
const router = useRouter()

const userStore = useUserStore()
const showDialog = ref(false)
onMounted(async () => {
    await userStore.getUserData()
})
const oldPassword = ref(null)
const password = ref(null)
const confirmPassword = ref(null)
const showOldPassword = ref(false)

const showPassword = ref(false)
const showConfirmPassword = ref(false)
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
    comparePassword: value => {
        return value == password.value || '兩次密碼輸入不同'
    },
    name: value => {
        return value.length <= 20 || '最多輸入20個字元'
    }
}
const closeDialog = () => {
    showDialog.value = !showDialog.value
    oldPassword.value = null
    password.value = null
    confirmPassword.value = null

}
const openUpdateProfile = () => {
    console.log(changeName.value)
}
const changeSex = computed(() => {
    return userStore.user?.sex == 'F' ? '女' : userStore.user?.sex == 'M' ? '男' : '其他'
})
const changeName = computed(() => {
    return userStore.user?.name ? userStore.user?.name : '無提供資料'
})
const changeMail = computed(() => {
    return userStore.user?.email ? userStore.user?.email : '無提供資料'
})
const changeBirth = computed(() => {
    return userStore.user?.birthday ? userStore.user?.birthday : '無提供資料'
})
const form = ref(false)

const onPasswordSubmit = async () => {
    if (!form.value) return
    if(await userStore.restPassword(oldPassword.value, password.value, confirmPassword.value)){
        closeDialog()
        alert("密碼更新成功,請重新登入")
        router.push("/Login");

    }
        
}
</script>

<style scoped>
.cardtext-width {
    height: calc(100vh - 256px)
}

.window-item {
    border: 1px #C8C8C8 solid
}
</style>