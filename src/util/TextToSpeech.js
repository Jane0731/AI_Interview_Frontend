import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
const speechConfig = sdk.SpeechConfig.fromSubscription('5f9ae7108a454fe1a052b880b5eb6f71', 'eastus');
speechConfig.speechSynthesisLanguage = 'zh-CN';

const synthesizer = new sdk.SpeechSynthesizer(speechConfig);
export async function textToSpeech(text) {
  return new Promise(resolve => {

    synthesizer.speakTextAsync(text, result => {
      resolve();

    });

  });


}