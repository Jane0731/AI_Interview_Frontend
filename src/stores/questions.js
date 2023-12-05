import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useQuestionStore = defineStore("questions", () => {
    const progress = ref(1);
    const questions = ref([])
    const isEnd = ref(true)
    const total = ref(1)
    const isLoading = ref(true)
    const addProgress = () => {
        progress.value += 1
    }
    const startloading=(()=>{
        isLoading.value = false
    })
    const endloading=(()=>{
        isLoading.value = true
    })

    const setProgress = () => computed(() => progress.value = 1)

    const setQuestions = (data) => {
        questions.value = data
    }
    const getQuestion = computed(() =>
        questions.value[progress.value - 1]
    )
    const changeEnd = () => {
        isEnd.value = !isEnd.value
    }
    return {
        progress,
        total,
        questions,
        addProgress,
        setProgress,
        changeEnd,
        setQuestions,
        startloading,
        endloading,
        isLoading,
        getQuestion
    };
});
