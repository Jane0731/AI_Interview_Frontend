<template>
  <!-- <div>{{ question }}</div> -->
  <video :srcObject="stream" width="500" autoplay></video>
</template>
<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import { useSpeechStore } from '@/stores/speech';
import { useInterviewStore } from '@/stores/interview';
import { useQuestionStore } from '@/stores/questions';

import { useStepperStore } from '@/stores/stepper';

import RecordRTC from "recordrtc"
import { reactive } from 'vue';
import Translator from '@/lib/translator'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

const question = ref('')
const setQuestion = (data) => question.value = data
const data = reactive({
  key: '',
  // key: 'ec7f5e2757ce425d90a64da8722970b4',
  region: 'eastus',
  fromLanguage: 'zh-TW',
  toLanguages: 'zh-TW'
})
const answer = ref([]);
const startTime = ref(null)
const endTime = ref(null)

const blobData = ref('')
const recorder = ref(null)
const times = ref(1)
const speechStore = useSpeechStore()
const interviewStore = useInterviewStore()
const questionStore = useQuestionStore()
const oldOffset = ref('')
// const translator = new Translator((captions) => {
//   if (oldOffset.value == captions.translations.offset) {
//     answer.value[answer.value.length - 1] = captions.translations.languages.zh;
//   }
//   else {
//     answer.value.push(captions.translations.languages.zh)
//     oldOffset.value = captions.translations.offset
//   }

// }
// )
const loading = ref(false)
const synth = window.speechSynthesis
const greetingSpeech = new window.SpeechSynthesisUtterance()
const greet = (question, id) => {
  greetingSpeech.pitch = speechStore.pitch
  greetingSpeech.volume = speechStore.volume
  greetingSpeech.rate = speechStore.rate
  greetingSpeech.text = question
  synth.speak(greetingSpeech)
}
onMounted(() => {
  listenForSpeechEvents()
  greet(questionStore.questions[0].question)
})
const listenForSpeechEvents = () => {

  loading.value = true;
  greetingSpeech.onend = () => {
    play()
  }

}
const stream = ref(null)
const constraints = {
  audio: false,
  video: {
    width: { min: 1024, ideal: 1280, max: 1920 },
    height: { min: 576, ideal: 720, max: 1080 },
    facingMode: 'environment',
  },
}
const play = async () => {
  const frontCamStream = await navigator.mediaDevices.getUserMedia(constraints)
  stream.value = frontCamStream
  onStartRecord()
}
const onStartRecord = async () => {
  recorder.value = RecordRTC(stream.value, { type: "video" })
  startTime.value = performance.now()
  await recorder.value.startRecording()
  // onTranslateStart()
}
const onStopRecord = async (id) => {
  await recorder.value.stopRecording(() => {
    endTime.value = performance.now()
    let recordingDuration = ((endTime.value - startTime.value) / 1000).toFixed(2);
    recorder.value.getDataURL((videoDataURL) => {
      const blob = recorder.value.getBlob()

      let reader = new window.FileReader();
      reader.readAsDataURL(blob); // <----------------check this line
      reader.onloadend = async () => {
        let audioBase64 = reader.result;
        blobData.value = audioBase64.split(',').pop()
        // onTranslateStop()
        let wordData = answer.value.join()
        console.log("test")
        await interviewStore.analyzeInterview(id, {
          // answer: wordData,
          answer: "測試",

          speaking_speed: wordData.length / recordingDuration,
          video: blobData.value
        })
        answer.value = []
        blobData.value = ''
        console.log(questionStore.progress, questionStore.total)
        if ((questionStore.progress - 1) == questionStore.total) {
          const stepperStore = useStepperStore()
          console.log("213")
          stepperStore.addStep()
        }
      }
    })
  })
}
// const onTranslateStart = () => {
//   translator.start({
//     data
//   })
//   loading.value = false
// }
// const onTranslateStop = () => {
//   translator.stop()

// }


defineExpose({
  greet,
  onStopRecord,
  setQuestion,
  listenForSpeechEvents
});
</script>