<template>
    <div v-if="result.message" @click="resultStore.clear()">
        <v-alert v-model="result" :text="result.message" :type="result.type"  dismissible width="20%"  close position="fixed"/>
    </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { onMounted,onBeforeUpdate,onUpdated } from 'vue';
import { useResultStore } from '@/stores/result';

const resultStore = useResultStore();
const { result } = storeToRefs(resultStore);


</script>
