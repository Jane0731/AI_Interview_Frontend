<template>
    <v-card width="100%" class="overflow-auto ">
        <v-sheet width="100%" color="primary" height="120" class=" d-flex align-center justify-center pa-10">
            <div class="text-h4">面試紀錄</div>
        </v-sheet>
        <v-card-text class="overflow-auto cardtext-width">
            <div v-for="history in historyList">
                <div class="ma-2 pa-2 text-h6">
                    面試時間:{{ history.created_at }}
                </div>
                <div class="ma-2 pa-2 text-h6">
                    面試職缺:{{ history.position.company }}-{{ history.position.position }}
                </div>
                <div class="ma-2 pa-2 text-h6">
                    整體分析
                </div>
                <div class="text-center rounded">
                    <v-sheet class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4" elevation="4"
                        height="250" rounded max-width="800" width="100%">
                        <Pie :barData="{
                            labels: history.dataLabel,
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
                                data: history.allData,
                                borderWidth: 1
                            }]
                        }" />
                    </v-sheet>

                </div>
                <div class="ma-2 pa-2 text-h6">
                    個別分析
                </div>
                <div class="ma-2 pa-2 text-h6">
                    <v-expansion-panels>
                        <v-expansion-panel v-for="recordQuestion in history.interview_questions">
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
                    </v-expansion-panels>

                </div>
            </div>
            <v-pagination :length="pages" @update:model-value="updatePage" @input="" v-model="page"
                rounded="circle"></v-pagination>
        </v-card-text>
    </v-card>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';
import Bar from '../Bar.vue';
import Pie from '../Pie.vue';
const userStore = useUserStore()
const listCount = ref(0)
const interviewRecord = ref([])
onMounted(async () => {
    await userStore.getInterviewRecord()
    interviewRecord.value = userStore.interviewRecord
    initPage()
    updatePage(page.value)
})
const page = ref(1)
const pageSize = ref(1)
const historyList = ref([])

const initPage = () => {
    listCount.value = interviewRecord.value.length
    if (listCount.value < pageSize.value)
        historyList.value = interviewRecord.value
    else
        historyList.value = interviewRecord.value.slice(0, pageSize.value);
}

const updatePage = (pageIndex) => {
    console.log(pageIndex)
    let start = (pageIndex - 1) * pageSize.value
    let end = pageIndex * pageSize.value
    historyList.value = interviewRecord.value.slice(start, end);
    page.value = pageIndex;
}
const pages = computed(() => {
    if (pageSize.value == null || listCount.value == null) return 0;
    return Math.ceil(listCount.value / pageSize.value);
})

</script>
<style scoped>
.cardtext-width {
    height: calc(100vh - 256px)
}

.window-item {
    border: 1px #C8C8C8 solid
}
</style>