<template>
    <InterviewWindow class="my-6">
        <template v-slot:title>
            <div class="text-h4 mb-3">模擬面試說明</div>
            <div class="text-body-1">感謝您使用AI模擬面試服務</div>
            <div class="text-body-1">運用AI技術，讓您更輕鬆的練習面試，更快速獲得改善方向</div>
        </template>
        <template v-slot:card-text>
            <div class="d-flex my-3 align-center justify-space-between">
                <InterviewStepOneCardVue v-for="n in 3"></InterviewStepOneCardVue>
            </div>
            <div class="d-flex justify-center mb-6">
                <v-btn @click="goStepTwo()" color="primary" class="text-center mt-5 " size="x-large" width="60%">
                    <div class="text-h5">
                        開始面試情境設定
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
const stepperStore = useStepperStore()

const goStepTwo = () => stepperStore.addStep()
</script>