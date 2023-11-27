<template>
    <v-card class="my-auto" height="350">
        <v-img :src="item.imgSrc" height="240px" cover></v-img>

        <v-card-text>
            <div class="text-h6 text--primary text-bold text-center">{{ item.title }}</div>
            <div class="text--primary">
                {{ item.subtitle }}
            </div>
        </v-card-text>

    </v-card>
</template>
<script setup>
import { ref } from 'vue';
const porps = defineProps({
    item: { type: Object },

})
const show = ref(false)

</script>