<template>
    <v-tabs >
        <v-tab v-for="value in values" :value="value.id" >
            {{ value.description }}
        </v-tab>
    </v-tabs>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    values:{type:Object}
})
</script>