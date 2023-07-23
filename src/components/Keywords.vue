<template>
    <v-sheet rounded="lg" width="100%" class="key-width my-4  mx-auto flex-wrap flex-row">
        <div class="text-h5 text-center mb-3">熱門關鍵字</div>
        <v-sheet v-for="keyword in keywords" :key="keyword">
            <v-btn prepend-icon="mdi-pound" variant="text">
                {{ keyword }}
            </v-btn>
        </v-sheet>
    </v-sheet>
</template>
<script setup>
const keywords = ["fdsf", "dgfg", "rhtr", "fdsf", "dgfg", "rhtr", "fdsf", "dgfg", "rhtr", "fdsf",
    "dgfg", "rhtr", "fdsf", "dgfg", "rhtr", "fdsf", "dgfg", "rhtr",
    "fdsf", "dgfg", "rhtr", "fdsf", "dgfg", "rhtr",]
</script>
<style>
    .key-width{
        height:calc(100vh - 136px)
    }
</style>