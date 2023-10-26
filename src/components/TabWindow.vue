<template>
    <v-window>
        <v-window-item v-for="value in values" :key="value.id" :value="value.id">
            <slot name="view"></slot>
        </v-window-item>
    </v-window>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    values: { type: Object }
})
</script>