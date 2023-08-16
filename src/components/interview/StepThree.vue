<template>
    <InterviewWindow>
        <template v-slot:title>
            <div class="text-h4">{{ questionStore.progress }} OF {{ questionStore.total }}</div>
        </template>
        <template v-slot:card-text>
            <v-sheet width="100%" color="primary" height="250" class="text-h3 d-flex align-center justify-center">
                你為什麼想要應徵這個職缺
            </v-sheet>
            <div class="d-flex justify-center mb-6">
                <v-btn @click="endInterview ? goStepFour() : nextQuestion()" color="primary" class="text-center mt-5 "
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
import { useStepperStore } from '@/stores/stepper';
import { computed } from 'vue';
import { useQuestionStore } from '@/stores/questions';
const stepperStore = useStepperStore()
const questionStore = useQuestionStore()
const nextQuestion = () => questionStore.addProgress()

const endInterview = computed(() => {
    return questionStore.progress == questionStore.total
})
const goStepFour = () => stepperStore.addStep()
</script>