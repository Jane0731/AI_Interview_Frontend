import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useStepperStore } from '@/stores/stepper';
import { useQuestionStore } from '@/stores/questions';
import axios from "@/api/axios.config";
import { computed } from "vue";

export const useInterviewStore = defineStore("interview", () => {
    const interviewId = ref('')
    const record = ref({});
    const answers = ref([])
    const jobs = ref([])
    const errorMessage = ref('')
    const isLoading = ref(true)
    const selectJobType = ref('')
    const getRecordMotions = computed(() => record.value.motions)
    const getRecordQuestions = computed(() => record.value.interview_questions)
    const getRecordPosition = computed(() => JSON.parse(record.value.position))
    const getRecordDate = computed(() => {
        let date = new Date(record.value.created_at)

        // 获取年、月、日、小时、分钟和秒
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1，并且补零
        let day = String(date.getDate()).padStart(2, '0');
        let hours = String(date.getHours()).padStart(2, '0');
        let minutes = String(date.getMinutes()).padStart(2, '0');
        let seconds = String(date.getSeconds()).padStart(2, '0');
        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    }

    )
    const jobType = computed(() => {
        return jobs.value.map((key) => Object.keys(key)[0])
    })
    const jobArray = computed(() => {
        const res = jobs.value.find((key) => Object.keys(key)[0] === selectJobType.value)
        const data = Object.values(res[selectJobType.value])

        const flattened = [];
        for (const subArray of data) {
            flattened.push(Object.values(subArray))
        }
        return flattened;
    })
    const getRecord = async () => {
        // 取得 Python 解析的面試紀錄 API
        await axios
            .get("/interview-record/" + interviewId.value)
            .then(async (response) => {
                isLoading.value = false
                console.log(response.data)
                record.value = response.data

            })
            .catch((error) => {
                setTimeout(getRecord, 10000);
                console.log(error)
            });
    }
    const analyzeInterview = async (id, data) => {
        await axios
            .patch("/interview-question/" + id, data)
            .then((response) => {
                console.log("分析成功")
            })
            .catch((error) => {
                console.log("分析失敗")

            });
        // 取得 Python 解析的面試紀錄 API

    }
    const saveRecord = async () => {
        // 儲存面試紀錄 API
        const stepperStore = useStepperStore()
        const questionStore = useQuestionStore()
        stepperStore.setStep(0)
        questionStore.setProgress()
    }
    const savePosition = async (position) => {
        try {
            await axios
                .post("/interview-record", position)
                .then((response) => {
                    const questionStore = useQuestionStore()
                    isLoading.value = false
                    questionStore.setQuestions(response.data.questions)
                    interviewId.value = response.data.id
                })
                .catch((error) => {
                    errorMessage.value = error.response.data.message
                    console.log(error.response.data.message)
                });
        } catch (error) {

        }
    }

    const getPostition = async () => {
        await axios
            .get("/job")
            .then(async (response) => {
                jobs.value = response.data
            })
            .catch((error) => {
                // const resultStore = useResultStore()
                // resultStore.error(error.response.data.message)
            });
    }
    return {
        record,
        getRecord,
        saveRecord,
        getPostition,
        savePosition,
        analyzeInterview,
        getRecordPosition,
        getRecordMotions,
        getRecordQuestions,
        selectJobType,
        jobType,
        jobArray,
        answers,
        isLoading,
        errorMessage,
        getRecordDate
    };
});
