<template>
    <v-card width="100%">
        <v-sheet width="100%" color="primary" height="120" class="d-flex align-center justify-center pa-10">
            <div class="text-h4">我的收藏</div>
        </v-sheet>
        <v-card-text class="overflow-auto cardtext-width">
            <v-tabs v-model="tab" grow>
                <v-tab value="discussion">
                    <div class="text-h6">討論</div>
                </v-tab>
                <v-tab value="experience">
                    <div class="text-h6">面試分享</div>
                </v-tab>
            </v-tabs>
            <v-window v-model="tab">
                <v-window-item value="discussion">
                        <div v-for="discussion in favoriteStore.favorites.discussion" class="window-item pa-4 mx-auto my-5 rounded-lg w-75">
                            <Discussion :discussion="discussion" @fresh="onFresh()"/>
                        </div>
                </v-window-item>
                <v-window-item value="experience">
                        <div v-for="experience in favoriteStore.favorites.experience" class="window-item pa-4 mx-auto my-5 rounded-lg w-75">
                            <Experience :experience="experience" @fresh="onFresh()"/>
                        </div>
                </v-window-item>
            </v-window>
        </v-card-text>

    </v-card>
</template>
<script setup>
import { ref } from 'vue';
import Discussion from '@/components/Discussion.vue'
import Experience from '@/components/Experience.vue'

import { useFavoriteStore } from '@/stores/favorite';
import { onBeforeMount } from 'vue';
const favoriteStore = useFavoriteStore()
onBeforeMount(async()=>{
    await favoriteStore.getFavorite()
    console.log(favoriteStore.favorites.experience)
})
const tab = ref("discussion")
const onFresh=async()=>{
    await favoriteStore.getFavorite()
}
</script>
<style scoped>
.cardtext-width {
    height: calc(100vh - 256px)
}

.window-item {
    border: 1px #C8C8C8 solid
}
</style>
