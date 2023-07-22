<template>
    <v-sheet rounded="lg" height="calc(100%-96px)" width="100%" class="my-4 text-center mx-auto">
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