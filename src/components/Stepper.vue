<template>
    <v-stepper complete  v-model="stepperStore.step">
        <v-stepper-header>

            <v-stepper-item value="1" title="模擬面試系統說明"></v-stepper-item>

            <v-divider></v-divider>

            <v-stepper-item value="2" title="模擬面試職缺選擇"></v-stepper-item>
            <v-divider></v-divider>

            <v-stepper-item value="3" title="設備測試"></v-stepper-item>
            <v-divider></v-divider>

            <v-stepper-item value="4" title="開始進行模擬面試"></v-stepper-item>
            <v-divider></v-divider>

            <v-stepper-item value="5" title="模擬面試結果"></v-stepper-item>

        </v-stepper-header>

    </v-stepper>
</template>
<script setup>
import { defineProps, ref } from 'vue';
import { VStepper, VStepperHeader, VStepperItem, VStepperWindow, VStepperActions } from 'vuetify/labs/VStepper';
import { useStepperStore } from '@/stores/stepper';
const stepperStore = useStepperStore()

</script>