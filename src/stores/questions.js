import { defineStore } from "pinia";
import { ref } from "vue";

export const useQuestionStore = defineStore("questions", () => {
    const progress = ref(1);
    const isEnd = ref(true)
    const total = ref(10)
    const addProgress = () => progress.value += 1
    const subtractionProgress = () => progress.value -= 1
    const setProgress = () => {
        progress.value = 1
    }
    const changeEnd = () => {
        isEnd.value = !isEnd.value
        console.log(isEnd.value+"change")
    }
    return {
        progress,
        total,
        addProgress,
        subtractionProgress,
        setProgress,
        changeEnd
    };
});
