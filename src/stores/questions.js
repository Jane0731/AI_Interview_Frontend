import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useQuestionStore = defineStore("questions", () => {
    const progress = ref(1);
    const questions = ref([])
    const isEnd = ref(true)
    const total = ref(5)
    const addProgress = () => {
        progress.value += 1
    }
    const setProgress = () => computed(() => progress.value = 1)

    const setQuestions = (data) => {
        questions.value = data
    }
    const getQuestion = computed(() =>
        questions.value[progress.value-1]
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
        getQuestion
    };
});
