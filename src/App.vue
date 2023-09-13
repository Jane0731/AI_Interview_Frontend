<template>
    <router-view v-if="isRouter"/>
</template>

<script setup>
import { nextTick, provide, ref } from 'vue';
const isRouter = ref(true)
const reload = () => {
    isRouter.value = false
    nextTick(() => {
        isRouter.value = true
    })
}
provide("reload", reload)

</script>
