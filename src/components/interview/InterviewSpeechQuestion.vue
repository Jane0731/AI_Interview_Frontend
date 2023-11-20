<template>
  <!-- <div>{{ question }}</div> -->
  <div v-if="!questionStore.isLoading">
    <fade-loader loading="true" color="grey" size="400px"></fade-loader>
  </div>
  <div v-else>
    <div class="text-subtitle-1 text-right">目前答題所剩時間</div>
    <video :srcObject="stream" width="500" autoplay></video>

  </div>
</template>
<script setup>
import FadeLoader from 'vue-spinner/src/FadeLoader.vue'
import { textToSpeech } from '@/util/textToSpeech'

import { ref, onMounted, reactive } from 'vue';
import { useSpeechStore } from '@/stores/speech';
import { useInterviewStore } from '@/stores/interview';
import { useQuestionStore } from '@/stores/questions';

import RecordRTC from "recordrtc"
import Translator from '@/lib/translator'

const question = ref('')
const setQuestion = (data) => question.value = data
const data = reactive({
  // key: '',
  key: 'dd2f92fabdfc44b3a8e62281302e2b4f',
  region: 'eastus',
  fromLanguage: 'zh-TW',
  toLanguages: 'zh-TW'
})
const answer = ref([]);
const startTime = ref(null)
const endTime = ref(null)

const blobData = ref('')
const recorder = ref(null)
const speechStore = useSpeechStore()
const interviewStore = useInterviewStore()
const questionStore = useQuestionStore()
const oldOffset = ref('')
const translator = new Translator((captions) => {
  if (oldOffset.value == captions.translations.offset) {
    answer.value[answer.value.length - 1] = captions.translations.languages.zh;
  }
  else {
    answer.value.push(captions.translations.languages.zh)
    oldOffset.value = captions.translations.offset
  }

}
)
const greetingSpeech = new window.SpeechSynthesisUtterance()
const greet = async(question) => {
  questionStore.startloading()
  await textToSpeech(question)
  play()
  console.log("123")
}

onMounted(() => {
  greet(questionStore.questions[0].question)
})
// const listenForSpeechEvents = () => {

//   greetingSpeech.onend = () => {

//     play()
//   }

// }
const stream = ref(null)
const constraints = {
  audio: false,
  video: {
    width: {ideal: 640 },
    height: { ideal: 360 },
    facingMode: 'environment',
  },
}
const play = async () => {

  const frontCamStream = await navigator.mediaDevices.getUserMedia(constraints)
  stream.value = frontCamStream
  onStartRecord()
}
const onStartRecord = async () => {
  console.log("456")

  questionStore.endloading()

  recorder.value = RecordRTC(stream.value, { type: "video" })
  startTime.value = performance.now()
  await recorder.value.startRecording()
  onTranslateStart()
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
        onTranslateStop()
        let wordData = answer.value.join()
        await interviewStore.analyzeInterview(id, {
          answer: wordData,
          // answer: "測試",
          speaking_speed: wordData.length / recordingDuration,
          video: blobData.value
        })
        answer.value = []
        blobData.value = ''

      }
    })
  })
}
const onTranslateStart = () => {
  translator.start({
    data
  })
}
const onTranslateStop = () => {
  translator.stop()

}


defineExpose({
  greet,
  onStopRecord,
  setQuestion,
  // listenForSpeechEvents,

});
</script>