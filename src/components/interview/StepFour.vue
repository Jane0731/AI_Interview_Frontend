<template>
    <InterviewWindow class="my-6">
        <template v-slot:title>
            <div class="text-h4">{{ questionStore.progress }} OF {{ questionStore.total }}</div>
        </template>
        <template v-slot:card-text>
            <v-sheet width="100%" height="300" class="my-3 text-h3 d-flex align-center justify-center">
                <InterviewSpeechQuestion ref="childComponentRef"/>
            </v-sheet>
            <div class="d-flex justify-center mb-6">
                <v-btn @click="endInterview ? goStepFive() : nextQuestion()" color="primary" class="text-center mt-5 "
                    size="x-large" width="60%">
                    <div class="text-h5">
                        {{ endInterview ? "結束面試" : "下一題" }}
                    </div>
                </v-btn>
            </div>

        </template>
    </InterviewWindow>
</template>
<script setup>
import InterviewWindow from '@/components/InterviewWindow.vue';
import InterviewSpeechQuestion from '@/components/interview/InterviewSpeechQuestion.vue';
import { useStepperStore } from '@/stores/stepper';
import { computed ,ref} from 'vue';
import { useQuestionStore } from '@/stores/questions';
const childComponentRef = ref(null);


const stepperStore = useStepperStore()
const questionStore = useQuestionStore()
const nextQuestion = () => {
    questionStore.addProgress()
    childComponentRef.value.greet();
}

const endInterview = computed(() => {
    return questionStore.progress == questionStore.total
})
const goStepFive = () => stepperStore.addStep()
</script>