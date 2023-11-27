<template>
    <v-responsive max-width="600">
        <v-text-field v-model="search" label="搜尋" variant="solo" single-line density="compact"
            hide-details="auto" prepend-inner-icon="mdi-magnify">
        </v-text-field>
    </v-responsive>
    <v-sheet rounded="lg" width="100%" class="key-width my-4 mx-auto">
        <div class="text-h5 text-center pt-3 pb-1">熱門關鍵字</div>
        <hr class="mx-4">
        <v-sheet v-for="keyword in keywords" :key="keyword.id">
            <v-btn @click="setSearch(keyword.name)" class="justify-start pl-8" width="100%" prepend-icon="mdi-pound" variant="text">
                <div></div>
                {{ keyword.name }}
            </v-btn>
        </v-sheet>
    </v-sheet>
</template>
<script setup>
import { ref, defineEmits, onMounted, watch } from 'vue'
import axios from "@/api/axios.config";
const search = ref('')
const keywords = ref([])
const setSearch = (value) => {
    search.value = value
}
const emit = defineEmits(['refresh'])
watch(search, (newValue) => {
    emit('refresh', newValue)
})
onMounted(async () => {

    await axios
        .get("/discussion/popular-tag")
        .then(async (response) => {
            keywords.value = response.data
        })
        .catch((error) => {
            console.log(error)
            // resultStore.error(error.response.data.message)
        });

    // isLoading.value = false
})
</script>
<style>
.key-width {
    height: calc(100vh - 136px)
}
</style>