<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="10">
                <div>
                    <Stepper ></Stepper>
                    <StepOne v-if="stepperStore.step==0"/>
                    <StepTwo v-else-if="stepperStore.step==1"/>
                    <StepThree v-else-if="stepperStore.step==2"/>
                    <StepFour v-else-if="stepperStore.step==3"/>
                    <StepFive v-else/>

                </div>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
import Stepper from '@/components/Stepper.vue';
import StepOne from '@/components/interview/StepOne.vue'
import StepTwo from '@/components/interview/StepTwo.vue'
import StepThree from '@/components/interview/StepThree.vue'
import StepFour from '@/components/interview/StepFour.vue'
import StepFive from '@/components/interview/StepFive.vue'

import { useStepperStore } from '@/stores/stepper';
const stepperStore=useStepperStore()

</script>