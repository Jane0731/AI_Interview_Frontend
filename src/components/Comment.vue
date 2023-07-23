<template>
    <v-sheet rounded="lg" width="100%" class="px-4 mx-auto my-5">
        <div class="d-flex flex-row align-center ">
            <v-sheet>
                <v-avatar color="brown">
                    <span class="text-h5">aa</span>
                </v-avatar>
            </v-sheet>
            <v-sheet class="ml-2 mr-4">
                <div class="text-body-1">{{ comment.author.name }}</div>
            </v-sheet>
        </div>
        <div class="text-h6 ">
            <v-sheet>
                {{ comment.comment }}
            </v-sheet>
        </div>
        <div class="text-body-2 ">
            {{ comment.update_at }} </div>
    </v-sheet>
</template>
<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    comment: { type: Object },
})
</script>
