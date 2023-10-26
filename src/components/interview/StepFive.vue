<template>
    <InterviewWindow class="my-6" >
        <template v-slot:title>
            <div class="text-h4">模擬面試結果</div>
        </template>
        <template v-slot:card-text>

            <div class="ma-2 pa-2 text-h6">
                面試時間:{{ interviewStore.getRecordDate }}
            </div>
            <div class="ma-2 pa-2 text-h6">
                面試公司:{{ interviewStore.getRecordPosition.company }}
            </div>
            <div class="ma-2 pa-2 text-h6">
                面試問答
            </div>
            <div class="ma-2 pa-2 text-h6">
                <v-expansion-panels>
                    <v-expansion-panel v-for="recordQuestion in interviewStore.getRecordQuestions" :key="recordQuestion.id"
                        :title="recordQuestion.question + '。\t平均語速為' + recordQuestion.speaking_speed + '字/秒'"
                        :text="recordQuestion.answer"></v-expansion-panel>
                </v-expansion-panels>
            </div>
            <div class="ma-2 pa-2 text-h6">
                辨識結果
            </div>
            <div>
                <v-list lines="two">
                    <v-list-item v-for="recordMotion in interviewStore.getRecordMotions" :key="recordMotion.id"
                        :title="recordMotion.name" :subtitle="'出現次數為：5/' + recordMotion.count"></v-list-item>
                </v-list>
            </div>
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

import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

import InterviewWindow from '@/components/InterviewWindow.vue';
import { onMounted } from 'vue';


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