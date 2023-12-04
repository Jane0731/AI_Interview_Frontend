<template>
    <v-responsive max-width="600">
        <v-text-field v-model="search" label="搜尋" variant="solo" single-line density="compact"
            hide-details="auto" prepend-inner-icon="mdi-magnify">
        </v-text-field>
    </v-responsive>
    <div rounded="lg" width="100%" class="key-width my-4 mx-auto">
        <div class="text-h5 text-center py-1">熱門關鍵字</div>
        <hr>
        <div v-for="keyword in keywords" :key="keyword.id">
            <v-btn @click="setSearch(keyword.name)" class="justify-start" width="100%" prepend-icon="mdi-pound" variant="text">
                {{ keyword.name }}
            </v-btn>
        </div>
    </div>
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