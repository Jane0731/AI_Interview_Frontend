import { defineStore } from "pinia";
import { reactive } from "vue";
import { useStepperStore } from '@/stores/stepper';
import { useQuestionStore } from '@/stores/questions';
export const useInterviewStore = defineStore("interview", () => {
    const record = reactive({});
    const getRecord = () => {
        // 取得 Python 解析的面試紀錄 API

    }
    const saveRecord = async () => {
        // 儲存面試紀錄 API
        const stepperStore = useStepperStore()
        const questionStore = useQuestionStore()
        stepperStore.setStep(0)
        questionStore.setProgress()
    }

    return {
        record,
        getRecord,
        saveRecord,
    };
});
