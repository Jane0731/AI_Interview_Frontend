<template>
    <InterviewWindow class="my-6">
        <template v-slot:title>
            <div class="text-h4">設備測試</div>
        </template>
        <template v-slot:card-text>
            <v-row justify="center">
                <v-col cols="6">
                    <div class="text-h6">音量調整</div>

                    <v-slider :step="0.1" max="1" min="0.1" v-model="volume" thumb-label="always" prepend-icon="mdi-volume-high">
                    </v-slider>
                    <div class="text-h6">聲調調整</div>

                    <v-slider :step="0.1" max="2" min="0" v-model="pitch" thumb-label="always" prepend-icon="mdi-volume-high">
                    </v-slider>
                    <div class="text-h6">速度調整</div>
                    <v-slider :step="0.1" max="2" min="0.1" v-model="rate" thumb-label="always" prepend-icon="mdi-volume-high">
                    </v-slider>
                </v-col>
                <v-col cols="2">
                   <v-btn @click="greet()">
                     開始測試
                   </v-btn>
                </v-col>
            </v-row>
            <div class="d-flex justify-center mb-6">
                    <v-btn @click="goStepFour" color="primary" class="text-center mt-5 "
                        size="x-large" width="60%">
                        <div class="text-h5">
                            開始進行模擬面試
                        </div>
                    </v-btn>
                </div>
        </template>
    </InterviewWindow>
</template>
<script setup>
import InterviewWindow from '@/components/InterviewWindow.vue';
import { useStepperStore } from '@/stores/stepper';
import { ref } from 'vue';
import { useSpeechStore } from '@/stores/speech';
const stepperStore = useStepperStore()
const speechStore = useSpeechStore()

const volume = ref(0.5)
const pitch = ref(0)
const rate = ref(0.1)

const goStepFour = () =>{
    synth.cancel()
    stepperStore.addStep()
    speechStore.setSetting(volume.value,rate.value,pitch.value)
} 
const synth = window.speechSynthesis
const greetingSpeech = new window.SpeechSynthesisUtterance()
const greet = () => {
    greetingSpeech.text = "一日之計在於晨"
    greetingSpeech.pitch=pitch.value
    greetingSpeech.volume=volume.value
    greetingSpeech.rate=rate.value
    synth.speak(greetingSpeech)
}
</script>