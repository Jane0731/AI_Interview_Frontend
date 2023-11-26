<template>
    <v-row justify="center" style="max-width: 1400px;margin: auto;">
        <v-col cols="4" lg="3">
            <v-sheet rounded="xl" width="100%" class="my-4 text-start mx-auto class-width">
                <v-tabs v-model="tab" direction="vertical">
                    <v-sheet rounded="lg" :color="tab == menuItem.menuName ? 'primary' : '#B3B7C1'" v-for="menuItem in menuItems"
                        class="ma-5  text-center">
                        <v-tab :value="menuItem.menuName" width="100%" class="pa-4 d-flex justify-center" height="100%">
                            <v-icon start size="x-large">
                                {{ menuItem.menuIcon }}
                            </v-icon>
                            <div class="text-h5 text-center mr-3">{{ menuItem.menuName }}</div>
                        </v-tab>
                    </v-sheet>
                </v-tabs>
            </v-sheet>
        </v-col>
        <v-col cols="8" lg="7">
            <v-sheet rounded="xl" width="100%" class="my-4 mx-auto class-width">
                <v-window v-model="tab">
                    <v-window-item value="基本資料">
                        <About />
                    </v-window-item>
                    <v-window-item value="我的履歷">
                        <Resume />
                    </v-window-item>
                    <v-window-item value="面試紀錄">
                        <InterviewRecords />
                    </v-window-item>
                    <v-window-item value="我的分享">
                        <Posts />
                    </v-window-item>
                    <v-window-item value="我的收藏">
                        <Favorites />
                    </v-window-item>
                </v-window>
            </v-sheet>
        </v-col>
    </v-row>
</template>

<script setup>
import About from '@/components/profile/AboutMe.vue'
import Resume from '@/components/profile/Resume.vue'
import Posts from '@/components/profile/Posts.vue'
import Favorites from '@/components/profile/Favorites.vue'
import InterviewRecords from '@/components/profile/InterviewRecords.vue'

import { ref } from 'vue';

const tab = ref("基本資料")
const menuItems = [
    {
        menuName: "基本資料",
        menuIcon: "mdi-information-outline",
    },
    {
        menuName: "我的履歷",
        menuIcon: "mdi-file-outline"
    },
    {
        menuName: "面試紀錄",
        menuIcon: "mdi-monitor-account"
    },
    {
        menuName: "我的分享",
        menuIcon: "mdi-pencil"
    },
    {
        menuName: "我的收藏",
        menuIcon: "mdi-bookmark-outline"
    }
]
</script>
<style scoped>
.class-width {
    height: calc(100vh - 136px)
}
</style>
