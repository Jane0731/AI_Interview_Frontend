<template>
    <InterviewWindow class="my-6">
        <template v-slot:title>
            <div class="text-h4 mb-3">模擬面試說明</div>
            <div class="text-body-1">歡迎使用AI模擬面試服務！</div>
            <div class="text-body-1">讓您更輕鬆地備戰面試，獲得即時的表現反饋，以確保您在職場競爭中更具競爭力。</div>
        </template>
        <template v-slot:card-text>
            <v-row class="d-flex flex-nowrap my-3 align-center justify-center mx-auto">
                <v-col v-for="item in items">
                    <InterviewStepOneCardVue :item="item">
                    </InterviewStepOneCardVue>
                </v-col>
            </v-row>
            <div class="d-flex justify-center mb-6">
                <v-btn @click="authStore.isAuthorized ? goStepTwo() : login()" color="primary" class="text-center mt-5 "
                    size="x-large" width="60%">
                    <div class="text-h5">
                        {{ authStore.isAuthorized ? '模擬面試職缺選擇' : '請先登入' }}
                    </div>
                </v-btn>
            </div>
        </template>
    </InterviewWindow>
</template>
<script setup>

import InterviewStepOneCardVue from '@/components/InterviewStepOneCard.vue';
import InterviewWindow from '@/components/InterviewWindow.vue';
import { useStepperStore } from '@/stores/stepper';
import { useRouter, useRoute } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
const router = useRouter()
const authStore = useAuthStore()
const stepperStore = useStepperStore()
const currentRoute = useRoute();
const login = () => {
    router.push({
        name: 'Login',
        query: {
            redirect: currentRoute.fullPath
        }
    })
}
const items = [{
    title: "AI技術支持",
    subtitle: "我們的面試模擬是由最先進的人工智慧技術進行辨識，確保了高度的正確性。",
    imgSrc: "ai.jpg"
}, {
    title: "即時反饋",
    subtitle: "您將立即獲得針對您的模擬面試表現的個性化反饋，幫助即刻改善。",
    imgSrc: "feedback.jpg"
}, {
    title: "適用於任何族群",
    subtitle: "無論您是剛開始尋找工作還是想提升現有工作的競爭力，我們提供各種行業和職位的模擬，以滿足不同需求。",
    imgSrc: "group.jpg"
}]
const goStepTwo = () => stepperStore.addStep()
</script>