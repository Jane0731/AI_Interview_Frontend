<template>
    <div style="background-color: #ffffff;padding-top:200px;">
      <div class="video-box">
        <video ref="video" webkit-playsinline playsinline :controls="false" muted class="video"></video>
      </div>
      <div class="checkagain" @click="startRecord">开始录制</div>
    </div>
  </template>
  <script>
  import { reactive, ref, onMounted } from "vue"
  export default {
    name: "v-video",
    setup(props, context) {
      const state = reactive({
        mediaRecorder: {},
        recorderFile: {},
        stream: {},
        stopRecordCallback: null
      })
  
      const video = ref(null)
      
      onMounted(() => {
        openCamera()
      })
  
      const openCamera = () => {
        getUserMedia(function(error, stream) {
          if (error) {
            console.log(error)
          } else {
            let options = { mimeType: 'video/webm;codecs=vp9,opus' }
            if (!MediaRecorder.isTypeSupported(options.mimeType)) {
              console.log(`${options.mimeType} is not supported`)
              options = { mimeType: 'video/webmcodecs=vp8,opus' }
              if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                console.log(`${options.mimeType} is not supported`)
                options = { mimeType: 'video/webm' }
                if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                  console.log(`${options.mimeType} is not supported`)
                  options = { mimeType: '' }
                }
              }
            }
            state.mediaRecorder = new MediaRecorder(stream, options)
            state.stream = stream
            // 存储数据流
            let chunks = []
            video.value.srcObject = stream
            video.value.play()
            state.mediaRecorder.ondataavailable = e => {
              state.mediaRecorder.blobs.push(e.data)
              chunks.push(e.data)
            }
            state.mediaRecorder.blobs = []
            state.mediaRecorder.onstop = () => {
              // 数据流转换为 file
              state.recorderFile = getRecorderFile(chunks)
            }
          }
        })
      }
  
      const getRecorderFile = chunks => {
        const blob = new Blob(chunks, { type: state.mediaRecorder.mimeType })
        const file = new File([blob], 'media_.mp4')
        return file
      }
  
      const getUserMedia = callback => {
        const constraints = { // 表示同时采集视频金和音频
          video : {
            width: 400,   // 宽带
            height: 400,  // 高度
            frameRate: 15, // 帧率
            facingMode: 'user', //  设置为前置摄像头
          }, 
          audio : true // 将声音获取设为true
        }
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          callback(new Error('您的浏览器暂不支持视频录制'))
        } else {
          navigator.mediaDevices
            .getUserMedia(constraints)
            .then(function(stream) {
              callback(false, stream)
            })
            .catch(function(error) {
              callback(error)
            })
        }
      }
      // 开始录制
      const startRecord = () => {
        state.mediaRecorder.start() // start方法里面传入一个时间片，每隔一个 时间片存储 一块数据
        setTimeout(() => {
          stopRecord(state.stream);
        }, 3 * 1000)
      }
  
      // 停止录制
      const stopRecord = stream => {
        state.mediaRecorder.stop()
        closeStream(stream)
      }
      // 关闭流
      const closeStream = stream => {
        const tracks = stream.getTracks()
        tracks.forEach(track => {
          track.stop()
        })
      }
  
      return {
        state,
        video,
        startRecord
      }
    }
    
  }
  </script>
  <style scoped lang="scss">
  .checkagain {
    background-color: #f44242;
    height: 35px;
    position: fixed;
    width: 90%;
    margin-left: 5%;
    transform: translateY(2.5%);
    border-radius: 3px;
    font-size: 14px;
    text-align: center;
    line-height: 35px;
    bottom: 35px;
    color: #ffffff;
  }
  .video-box {
    width: 200px;
    height: 200px;
    border-radius: 100%;
    margin-left: calc((100% - 200px) / 2);
    -webkit-mask-image: -webkit-radial-gradient(circle, white 100%, black 100%);
    -webkit-transform: rotate(0.000001deg); 
    -webkit-border-radius: 100%; 
    -moz-border-radius: 100%;
    .video {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  </style>
  