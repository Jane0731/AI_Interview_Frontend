<template>
    <v-sheet rounded="lg" width="100%" class="my-4 text-center mx-auto class-width">
        <v-list :items="items"></v-list>
    </v-sheet>
</template>
<script setup>
const items = [
    {
        title: '金融業',
        value: 1,
    },
    {
        title: '科技業',
        value: 2,
    },
    {
        title: '補教業',
        value: 3,
    },
    {
        title: '公職',
        value: 3,
    },
]
</script>
<style>
    .class-width{
        height:calc(100vh - 136px)
    }
</style>