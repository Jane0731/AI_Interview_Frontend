import {
  AudioConfig, SpeechTranslationConfig, TranslationRecognizer, ResultReason
} from 'microsoft-cognitiveservices-speech-sdk'

class Translator {
  _recognizer
  _callback

  constructor(callback) {
    this._callback = callback
  }

  start(options) {
    const alreadyStarted = !!this._recognizer
    if (alreadyStarted) {
      return
    }

    const audioConfig = AudioConfig.fromDefaultMicrophoneInput()
    const speechConfig = SpeechTranslationConfig.fromSubscription(options.data.key, options.data.region)

    speechConfig.speechRecognitionLanguage = options.data.fromLanguage
    // for (const lang of options.data.toLanguages) {
    speechConfig.addTargetLanguage(options.data.toLanguages)
    // }

    this._recognizer = new TranslationRecognizer(speechConfig, audioConfig)
    this._recognizer.recognizing = this._recognizer.recognized = recognizerCallback.bind(this)
    this._recognizer.startContinuousRecognitionAsync()

    function recognizerCallback(s, e) {
      const result = e.result
      const reason = ResultReason[result.reason]
      if (reason !== 'TranslatingSpeech' && reason !== 'TranslatedSpeech') {
        return
      }

      const captions = {
        offset: result.offset,
        languages: {}
      }
      captions.languages[getLanguageCode(options.data.fromLanguage)] = result.text
      let oldText = ""
      for (const lang of options.data.toLanguages) {
        const langCode = getLanguageCode(lang)
        const caption = result.translations.get(langCode)
        captions.languages[langCode] = caption
      }

      this._callback({
        original: result.text,
        translations: captions
      })


    }

    function getLanguageCode(lang) {
      return lang.substring(0, 2)
    }
  }

  stop() {
    this._recognizer.stopContinuousRecognitionAsync(
      stopRecognizer.bind(this),
      function (err) {
        stopRecognizer().bind(this)
        console.error(err)
      }.bind(this)
    )

    function stopRecognizer() {
      this._recognizer.close()
      this._recognizer = undefined
      console.log('stopped')
    }
  }
}

export default Translator