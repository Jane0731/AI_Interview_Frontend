<template>
    <InterviewWindow class="my-6">
        <template v-slot:title>
            <div class="text-h4 mb-3">模擬面試情境設定</div>
            <div class="text-body-1">感謝您使用AI模擬面試服務</div>
            <div class="text-body-1">運用AI技術，讓您更輕鬆的練習面試，更快速獲得改善方向</div>
        </template>
        <template v-slot:card-text>
            <v-row justify="space-around">
                <v-col cols="8" class="ma-2 pa-4 ">
                    <div class="text-h5">
                        應徵職位設定
                    </div>
                    <div class="d-flex flex-row text-h6">
                        <div class="ma-2 pa-2">姓名</div>
                        <div class="my-2  mx-8 pa-2">劉賊賊</div>
                    </div>
                    <div class="d-flex flex-row text-h6">
                        <div class="ma-2 pa-2">姓名</div>
                        <div class="my-2  mx-8 pa-2">劉賊賊</div>
                    </div>
                    <div class="d-flex flex-row text-h6">
                        <div class="ma-2 pa-2">姓名</div>
                        <div class="my-2  mx-8 pa-2">劉賊賊</div>
                    </div>
                    <div class="d-flex justify-center mb-6">
                        <v-btn @click="goStepThree()" color="primary" class="text-center mt-5 " size="x-large" width="60%">
                            <div class="text-h5">
                                開始模擬面試
                            </div>
                        </v-btn>
                    </div>
                </v-col>
            </v-row>

        </template>
    </InterviewWindow>
</template>
<script setup>
import InterviewWindow from '@/components/InterviewWindow.vue';
import { useStepperStore } from '@/stores/stepper';
const stepperStore = useStepperStore()

const goStepThree = () => stepperStore.addStep()
</script>