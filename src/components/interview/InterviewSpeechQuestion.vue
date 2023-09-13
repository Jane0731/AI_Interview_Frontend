<template>
  <video :srcObject="stream" width="500" autoplay></video>
</template>
<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import { useSpeechStore } from '@/stores/speech';
import RecordRTC from "recordrtc"


const recorder = ref(null)
const times = ref(1)
const speechStore = useSpeechStore()

const synth = window.speechSynthesis
const greetingSpeech = new window.SpeechSynthesisUtterance()
const greet = () => {
  if (times.value != 1) onStopRecord()
  greetingSpeech.pitch = speechStore.pitch
  greetingSpeech.volume = speechStore.volume
  greetingSpeech.rate = speechStore.rate
  greetingSpeech.text = "測試ㄚㄚㄚㄚㄚㄚㄚ"
  synth.speak(greetingSpeech)
  times.value += 1
}
onMounted(() => {
  listenForSpeechEvents()
  greet()
})
const listenForSpeechEvents = () => {
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
const onStartRecord = () => {
  recorder.value = RecordRTC(stream.value, { type: "video" })
  recorder.value.startRecording()
}
const onStopRecord = () => {
  recorder.value.stopRecording(() => {
    recorder.value.getDataURL((videoDataURL) => {
      // const blob = recorder.value.getBlob()
      console.log(videoDataURL.split(',').pop())

      // RecordRTC.invokeSaveAsDialog(blob, "test.mp4")
    })

  })
}
defineExpose({
  greet,
});
</script>