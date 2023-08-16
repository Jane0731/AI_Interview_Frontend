<template>
    <v-card width="100%">
        <v-sheet width="100%" color="primary" height="120" class="d-flex flex-column align-center justify-center pa-10">
            <slot name="title"></slot>


        </v-sheet>
        <v-card-text>
            <slot name="card-text"></slot>

            
        </v-card-text>


    </v-card>
</template>
<script setup>
</script>
<style scoped></style>