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
    const selectJobType = ref('')
    const isLoading = ref(true)
    const getRecordQuestions = computed(() => {
        const data = record.value.interview_questions
        const translationMap = {
            'hand_on_hip': '手揮動放低於超過偵測畫面',
            'hand_above_head': '手揮動高度超過頭頂',
            'hand_on_head': '手頭揮動高度在頭',
            'hand_on_neck': '手揮動高度在脖子',
            'hand_below_chest': '手揮動於胸部以下的位置',
            'hand_on_chest': '手揮動高度於胸部附',
            'hand_crossed_chest': '手交叉於胸前'
        };
        let translatedData = {};
        let motiontimesData = {
            'hand_on_hip': 0,
            'hand_above_head': 0,
            'hand_on_head': 0,
            'hand_on_neck': 0,
            'hand_below_chest': 0,
            'hand_on_chest': 0,
            'hand_crossed_chest': 0
        };

        data.forEach((item) => {
            translatedData = {}
            Object.keys(item.motion).forEach((key) => {
                translatedData[translationMap[key] || key] = item.motion[key];
                console.log(key)
                motiontimesData[translationMap[key] || key]= motiontimesData[translationMap[key] || key] + item.motion[key]
            });
            console.log(motiontimesData)
            item.motion = translatedData

        })
        console.log(motiontimesData)

        return record.value.interview_questions
    })
    const getRecordPosition = computed(() => record.value.position)
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
        return Object.keys(jobs.value)
    })
    const jobArray = computed(() => {
        const res = jobs.value[selectJobType.value]
        return res;
    })
    const getRecord = async () => {
        // 取得 Python 解析的面試紀錄 API
        await axios
            .get("/interview-record/" + interviewId.value)
            .then(async (response) => {

                isLoading.value = false
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
        isLoading,
        getRecordQuestions,
        selectJobType,
        jobType,
        jobArray,
        answers,
        errorMessage,
        getRecordDate,
        getRecordPosition
    };
});
