<template>
    <InterviewWindow class="my-6">
        <template v-slot:title>
            <div class="text-h4">模擬面試結果</div>
        </template>
        <template v-slot:card-text>
            <div class="ma-2 pa-2 text-h6">
                面試時間:2002/07/31
            </div>
            <div class="ma-2 pa-2 text-h6">
                <v-expansion-panels>
                    <v-expansion-panel v-for="i in 5" :key="i" title="Item"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."></v-expansion-panel>
                </v-expansion-panels>
            </div>
            <div class="ma-2 pa-2 text-h6">
                需改進的地方
            </div>
            <div>
                <v-list lines="two">
                    <v-list-item v-for="item in items" :key="item.title" :title="item.title" subtitle="..."></v-list-item>
                </v-list>
            </div>
            <div class="d-flex justify-center mb-6">
                <v-btn @click="saveRecord" color="primary" class="text-center mt-5 " size="x-large" width="60%">
                    <div class="text-h5">
                        儲存面試紀錄
                    </div>
                </v-btn>
            </div>
        </template>
    </InterviewWindow>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useInterviewStore } from '@/stores/interview';


import InterviewWindow from '@/components/InterviewWindow.vue';

const interviewStroe=useInterviewStore()
const items = [
    {
        title: 'Item #1',
        value: 1,
    },
    {
        title: 'Item #2',
        value: 2,
    },
    {
        title: 'Item #3',
        value: 3,
    },
]
const router = useRouter()
const saveRecord =async () => {
    router.push({
        name: 'Profile',
    })
    await interviewStroe.saveRecord()

}
</script>