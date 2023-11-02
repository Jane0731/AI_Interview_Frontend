<template>
    <InterviewWindow class="my-6">
        <template v-slot:title>
            <div class="text-h4 mb-3">模擬面試職缺選擇</div>
            <div class="text-body-1">歡迎使用AI模擬面試服務！</div>
            <div class="text-body-1">讓您更輕鬆地備戰面試，獲得即時的表現反饋，以確保您在職場競爭中更具競爭力。</div>
        </template>
        <template v-slot:card-text>
            <v-row justify="space-around">
                <v-col cols="8" class="ma-2 pa-4 text-body-1">
                    <div class="d-flex flex-row align-center justify-center">
                        <div class="ma-2 pa-2 font-weight-bold ">本系統的職缺皆為從104人力銀行所抓取的資料</div>
                    </div>
                    <div class="d-flex flex-row align-center">
                        <div class="ma-2 pa-2 font-weight-bold">職務類別</div>
                        <v-select class="ma-2 pa-2 " v-model="jobType" :items="interviewStore.jobType"
                            :loading="jobType == ''" variant="underlined"></v-select>
                    </div>
                    <v-divider></v-divider>

                    <div class="d-flex flex-row  align-center">
                        <div class="ma-2 pa-2 font-weight-bold">職缺選擇</div>
                        <v-select placeholder="請選擇職缺" class="ma-2 pa-2 " :items="jobData" :itemProps="itemProps"
                            v-model="position" variant="underlined"></v-select>
                    </div>

                    <v-divider></v-divider>
                    <div class="d-flex flex-row flex-wrap align-center">
                        <div class="ma-2 pa-2 font-weight-bold">職缺介紹</div>
                        <div class="ma-2 pa-2 " v-html="jobDetail ? jobDetail : '無提供資料'"></div>
                    </div>
                    <v-divider></v-divider>
                    <div class="d-flex flex-row align-start">
                        <div class="ma-2 pa-2 font-weight-bold">建議科系</div>
                        <div v-if="jobMajor.length > 0">
                            <ul>
                                <li v-for="major in jobMajor" class="my-2 mx-8 pa-2">{{ major }}</li>
                            </ul>
                        </div>
                        <div v-else class="ma-2 pa-2 ">無提供資料</div>
                    </div>
                    <v-divider></v-divider>
                    <div class="d-flex flex-row align-start">
                        <div class="ma-2 pa-2 font-weight-bold">工作技能</div>
                        <div v-if="jobSkill.length > 0">
                            <ul>
                                <li v-for="skill in jobSkill" class="my-2  mx-8 pa-2">{{ skill.description }}</li>
                            </ul>
                        </div>

                        <div v-else class="ma-2 pa-2 ">無提供資料</div>
                    </div>
                    <v-divider></v-divider>
                    <div class="d-flex flex-row align-start">
                        <div class="ma-2 pa-2 font-weight-bold">擅長工具</div>
                        <div v-if="jobTool.length > 0">
                            <ul>
                                <li v-for="tool in jobTool" class="my-2  mx-8 pa-2">{{ tool.description }}</li>
                            </ul>
                        </div>
                        <div v-else class="ma-2 pa-2 ">無提供資料</div>
                    </div>
                    <v-divider></v-divider>
                    <v-alert type="error" title="請選擇職缺" v-if="isShowAlert" text="請選擇職缺後，才可進行面試下一步"
                        variant="tonal"></v-alert>
                    <div class="d-flex justify-center mb-6">
                        <v-btn @click="goStepThree()" color="primary" class="text-center mt-5 " size="x-large" width="60%">
                            <div class="text-h5">
                                開始設備測試
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
import { ref, onMounted, onBeforeMount } from 'vue';
import { useInterviewStore } from '@/stores/interview';
import { watch } from 'vue';
import { computed } from 'vue';

const isSuccesss = computed(() => position.value && jobType.value)
const stepperStore = useStepperStore()
const interviewStore = useInterviewStore()
const position = ref('')
const jobDetail = ref('')
const jobId = ref('')
const jobComapny = ref('')
const jobSkill = ref([])
const jobMajor = ref([])
const jobTool = ref([])
const jobType = ref('')
const jobData = ref([])
const isShowAlert = ref(false)
const showAlert = () => {
    isShowAlert.value = true
    setTimeout(() => {
        isShowAlert.value = false
    }, 3000)
}
const goStepThree = async () => {
    if (!isSuccesss.value) {
        showAlert()
        return
    }
    await interviewStore.savePosition({
        position: {
            type: interviewStore.selectJobType,
            position: position.value.position,
            id: jobId.value,
            desc: jobDetail.value,
            skill: jobSkill.value,
            major: jobMajor.value,
            tool: jobTool.value,
            company: jobComapny.value
        }
    })
    stepperStore.addStep()
}
const setJobData = (value) => {
    interviewStore.selectJobType = value
    jobData.value = interviewStore.jobArray

}
const itemProps = (item) => {

    return {
        title: item.position,
        subtitle: item.company,
        value: {
            detail: item.desc,
            skill: item.skill,
            major: item.major,
            tool: item.tools,
            id: item.id,
            company: item.company,
            position: item.position
        },
    }
}

watch(jobType, (newVal, oldVal) => {
    setJobData(newVal)
    position.value = {
        detail: '',
        skill: [],
        major: [],
        tool: [],
        id: '',
        company: '',
        position: ''}
   
})
watch(position, (newVal) => {
    jobId.value = newVal.id
    jobDetail.value = newVal.detail
    jobSkill.value = newVal.skill
    jobMajor.value = newVal.major
    jobTool.value = newVal.tool
    jobComapny.value = newVal.company
})

onMounted(async () => {
    await interviewStore.getPostition()
    jobType.value = interviewStore.jobType[0]
    interviewStore.selectJobType = jobType.value
    jobData.value = interviewStore.jobArray
})
</script>