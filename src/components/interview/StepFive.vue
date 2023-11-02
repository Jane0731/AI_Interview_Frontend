<template>
    <InterviewWindow class="my-6" v-if="interviewStore.isLoading">
        <template v-slot:title>
            <div class="text-h4">模擬面試結果</div>
        </template>
        <template v-slot:card-text>
            <div class="ma-2 pa-2 text-h6 text-center">
                正在分析面試結果，請稍後...
            </div>
            <clip-loader loading="true" color="grey" size="40px"></clip-loader>
        </template>
    </InterviewWindow>
    <InterviewWindow class="my-6" v-else>
        <template v-slot:title>
            <div class="text-h4">模擬面試結果</div>
        </template>
        <template v-slot:card-text>

            <div class="ma-2 pa-2 text-h6">
                面試時間:{{ interviewStore.getRecordDate }}
            </div>
            <div class="ma-2 pa-2 text-h6">
                面試職缺:{{ interviewStore.getRecordPosition.company }}-{{ interviewStore.getRecordPosition.position }}
            </div>
            <div class="ma-2 pa-2 text-h6">
                整體分析
            </div>
            <div class="text-center rounded">
                <!-- <v-sheet class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4" elevation="4"
                    height="250" rounded max-width="800" width="100%"> -->
                    <Pie :barData="{
                        labels: interviewStore.getAllMotionsLabel,
                        datasets: [{
                            label: '出現次數',
                            backgroundColor: [
                                '#96CDCD',
                                '#FFE4C4',
                                '#FFF5EE',
                                '#E6E6FA',
                                '#90EE90',
                                '#EE7942',
                                '#8B8682'
                            ],
                            data: interviewStore.getAllMotionsFrequency,
                            borderWidth: 1
                        }]
                    }" />
                    <!-- </v-sheet> -->

            </div>
            <div class="ma-2 pa-2 text-h6">
                個別分析
            </div>
            <div class="ma-2 pa-2 text-h6">
                <v-expansion-panels>
                    <v-expansion-panel v-for="recordQuestion in interviewStore.getRecordQuestions">
                        <v-expansion-panel-title>
                            <template v-slot:default="{ expanded }">
                                <v-row no-gutters>
                                    <v-col cols="8" class="d-flex justify-start">
                                        {{ recordQuestion.question }}
                                    </v-col>
                                    <v-col cols="4" class="text-grey">
                                        平均語速為{{ recordQuestion.speaking_speed }}字/秒
                                    </v-col>
                                </v-row>
                            </template>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <div>
                                回答答案：{{ recordQuestion.answer }}
                            </div>
                            <div>
                                <div>
                                    肢體分析
                                </div>
                                <div>
                                    <Bar :barData="{
                                        labels: Object.keys(recordQuestion.motion),
                                        datasets: [{
                                            label: '出現次數',
                                            backgroundColor: '#f87979',
                                            data: Object.values(recordQuestion.motion),
                                            borderWidth: 1
                                        }]
                                    }" />
                                </div>
                            </div>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <!-- <v-expansion-panels>
                    <v-expansion-panel v-for="recordQuestion in interviewStore.getRecordQuestions" :key="recordQuestion.id"
                        :title="recordQuestion.question + '。\t平均語速為' + recordQuestion.speaking_speed + '字/秒'"
                        :text="recordQuestion.answer"></v-expansion-panel>
                </v-expansion-panels> -->
                </v-expansion-panels>

            </div>

            <!-- <div>
                <v-list lines="two">
                    <v-list-item v-for="recordMotion in interviewStore.getRecordMotions" :key="recordMotion.id"
                        :title="recordMotion.name" :subtitle="'出現次數為：3/' + recordMotion.count"></v-list-item>
                </v-list>
            </div> -->
            <!-- <div class="d-flex justify-center mb-6">
                    <v-btn @click="saveRecord" color="primary" class="text-center mt-5 " size="x-large" width="60%">
                        <div class="text-h5">
                            儲存面試紀錄
                        </div>
                    </v-btn>
                </div> -->
        </template>
    </InterviewWindow>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useInterviewStore } from '@/stores/interview';

import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

import InterviewWindow from '@/components/InterviewWindow.vue';
import { onMounted } from 'vue';
import Bar from '../Bar.vue';
import Pie from '../Pie.vue';

const interviewStore = useInterviewStore()
onMounted(async () => {
    await interviewStore.getRecord()
})

const router = useRouter()
const saveRecord = async () => {
    router.push({
        name: 'Profile',
    })
    await interviewStore.saveRecord()

}
</script>