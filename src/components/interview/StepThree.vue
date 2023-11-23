<template>
    <InterviewWindow class="my-6">
        <template v-slot:title>
            <div class="text-h4">設備測試</div>
        </template>
        <template v-slot:card-text>
            <div class="d-flex flex-row align-center justify-center">
                <div class="ma-2 pa-2 font-weight-bold text-h6 ">請面試者確認鏡頭及喇叭聲音是否都正常運作</div>
            </div>
            <v-row justify="space-around" align="center">
                <v-col cols="6">
                    <video :srcObject="stream" width="500" autoplay></video>

                </v-col>
                <v-btn size="x-large" prepend-icon="mdi-volume-high" @click="soundTest">
                    <div class="text-subtitle-1">聲音測試</div>
                </v-btn>
            </v-row>
            <div class="d-flex justify-center mb-6">
                <v-btn @click="goStepFour" color="primary" class="text-center mt-5 " size="x-large" width="60%">
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
import { ref, onMounted } from 'vue'
import { textToSpeech } from '@/util/textToSpeech'

const stepperStore = useStepperStore()

const goStepFour = () => {
    stepperStore.addStep()
}

const soundTest = async () => {
    await textToSpeech('請面試者確認設備正常運作')
}
const stream = ref(null)

const constraints = {
    audio: false,
    video: {
        width: { ideal: 640 },
        height: { ideal: 360 },
        facingMode: 'environment',
    },
}
onMounted(async () => {
    const frontCamStream = await navigator.mediaDevices.getUserMedia(constraints)
    stream.value = frontCamStream
})
</script>