<template>
    <v-responsive max-width="600">
          <v-text-field label="搜尋" variant="solo" single-line density="compact" hide-details="auto"
            prepend-inner-icon="mdi-magnify">
          </v-text-field>
        </v-responsive>
    <v-sheet rounded="lg" width="100%" class="key-width my-4  mx-auto">
        <div class="text-h5 text-center mb-3">熱門關鍵字</div>
        <v-sheet v-for="keyword in keywords" :key="keyword.id">
            <v-btn prepend-icon="mdi-pound" variant="text">
                {{ keyword.name }}
            </v-btn>
        </v-sheet>
    </v-sheet>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from "@/api/axios.config";

const keywords = ref([])
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