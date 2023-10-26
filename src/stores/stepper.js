import { defineStore } from "pinia";
import { ref } from "vue";

export const useStepperStore = defineStore("stepper", () => {
  const step = ref(0);
  const addStep = () => step.value += 1
  const subtractionStep = () => step.value -= 1
  const setStep = (num) => {
     step.value = num
  }

  return {
    step,
    addStep,
    subtractionStep, 
    setStep
  };
});
