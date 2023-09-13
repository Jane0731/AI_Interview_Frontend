import { defineStore } from "pinia";
import { ref } from "vue";

export const useSpeechStore = defineStore("speech", () => {
    const volume = ref(1);
    const rate = ref(1);
    const pitch = ref(1);
    const isSpeech=ref(false)
    const setSetting = (v, r, p) => {
        volume.value = v
        rate.value = r
        pitch.value = p
    }
    const changeSpeechStatus = () => {
        isSpeech.value = !isSpeech.value
    }
    return {
        setSetting,
        volume,
        rate,
        pitch,
        changeSpeechStatus
    };
});
