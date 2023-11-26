<template>
    <v-container fluid v-if="isLoading" style="height: 100%;">
        <v-row align="center" justify="center" style="height: 100%;">
            <v-col cols="auto">
                <div>
                    <fade-loader loading="true" color="grey"></fade-loader>
                </div>
            </v-col>
        </v-row>
    </v-container>
    <div v-if="!isLoading">
        <v-img class="bg-grey-lighten-5" height="100vh" width="100vw" src="/banner.png" cover>
            <div class="d-flex flex-column align-start justify-center h-100 mx-auto text-h4" style="max-width: 1300px;">
                <div class="px-6 py-10" style="background-color: #ffffff30;">
                    <div>使用我們的系統，</div>
                    <div>你可以不必一個人辛苦奮戰。</div>
                    <div>我們將為您匹配最合適的模擬面試，</div>
                    <div>讓你在迎接真正面試之前，</div>
                    <div>提升你的應試技巧與自信心！</div>
                </div>

            </div>
        </v-img>

        <div class="px-10 my-16 text-center">
            <div class="d-flex justify-center mt-6">
                <v-row style="max-width: 1170px;">
                    <v-col>
                        <div class="py-6 px-10 bg-indigo rounded-xl">
                            <div class="d-flex flex-column justify-center mx-auto">
                                <div class="text-left text-h4 my-3">註冊人數</div>
                                <div class="text-right text-h4 my-3">100</div>
                            </div>
                        </div>
                    </v-col>
                    <v-col>
                        <div class="py-6 px-10 bg-teal rounded-xl">
                            <div class="d-flex flex-column justify-center mx-auto">
                                <div class="text-left text-h4 my-3">討論貼文</div>
                                <div class="text-right text-h4 my-3">100</div>
                            </div>
                        </div>
                    </v-col>
                    <v-col>
                        <div class="py-6 px-10 bg-red rounded-xl">
                            <div class="d-flex flex-column justify-center mx-auto">
                                <div class="text-left text-h4 my-3">面試分享</div>
                                <div class="text-right text-h4 my-3">100</div>
                            </div>
                        </div>
                    </v-col>
                    <v-col>
                        <div class="py-6 px-10 bg-deep-orange rounded-xl">
                            <div class="d-flex flex-column justify-center mx-auto">
                                <div class="text-left text-h4 my-3">模擬面試</div>
                                <div class="text-right text-h4 my-3">100</div>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </div>

        <div class="px-10 my-16 text-center">
            <div class="font-weight-black text-teal-darken-1">
                核心理念
            </div>
            <div class="text-h4 font-weight-black ma-2">
                讓好人才與好公司相遇
            </div>
            <div class="d-flex justify-center mt-6">
                <v-row style="max-width: 1170px;">
                    <v-col v-for="introduce in introduces">
                        <v-card class="h-100">
                            <v-img class="text-white" height="200" :src="introduce.img" cover />
                            <v-card-title class="pt-4 text-left">
                                {{ introduce.title }}
                            </v-card-title>
                            <v-card-text class="text-left" v-html="introduce.content" />
                        </v-card>
                    </v-col>
                </v-row>
            </div>
        </div>
        <div class="mx-auto my-16" style="max-width: 1170px;">
            <div class="text-h4 font-weight-black w-auto text-center my-6" style="position: relative;">
                面試分享
                <a @click="toExperience" class="text-subtitle-1 text-black text-decoration-none"
                    style="position: absolute;right: 0;bottom: 0;cursor: pointer;">
                    看更多 >
                </a>
            </div>

            <v-row class="mx-auto justify-center">
                <v-col cols="12" sm="6" md="4" v-for="experience in experienceStore.newExperiences.slice(0, 6)">
                    <v-card class="pa-4 h-100">
                        <div class="d-flex">
                            <v-avatar color="surface-variant">{{ experience.poster_name }}</v-avatar>
                            <div class="d-flex flex-column ml-2 font-weight-black">
                                <div class="d-inline-block ml-2 font-weight-black">
                                    {{ experience.company }}
                                </div>
                                <div class="d-inline-block ml-2 text-grey">
                                    {{ experience.created_at }}
                                </div>
                            </div>
                        </div>
                        <div class="mt-2 text-h5 font-weight-black">
                            {{ experience.position }}
                        </div>
                        <v-card-title class="font-weight-black">
                            面試過程
                        </v-card-title>
                        <v-card-subtitle>
                            {{ experience.description }}
                        </v-card-subtitle>
                        <v-card-title class="font-weight-black">
                            面試問題
                        </v-card-title>
                        <v-card-subtitle>
                            <div class="d-inline bg-grey-darken-2 px-2 rounded-xl">Q</div>
                            {{ experience.questions[0].question }}
                        </v-card-subtitle>
                        <div class="d-flex flex-row align-center py-2 px-2 justify-center">
                            <v-sheet>
                                <v-btn variant="text" icon="mdi-comment" color="primary"></v-btn>
                                {{ experience.comments_count }}
                            </v-sheet>
                            <v-sheet>
                                <v-btn variant="plain" :ripple="false"
                                    :icon="experience.is_Favorite ? 'mdi-heart' : 'mdi-heart-outline'"
                                    :color="experience.is_Favorite ? 'deep-orange-accent-4' : 'grey-darken-4'"></v-btn>

                                {{ experience.user_favorites_count }}
                            </v-sheet>

                            <v-spacer />
                            <v-sheet @click="onExperienceClick(experience.id)" v-if="isSingleExperience ? false : true">
                                <v-btn size="large" variant="tonal" class="ma-2">
                                    查看更多
                                </v-btn>
                            </v-sheet>
                        </div>
                    </v-card>
                </v-col>
            </v-row>


        </div>
        <div class="px-10 py-16 bg-white">
            <v-row class="mx-auto" style="max-width: 1170px;">
                <v-col cols="12" md="6" class="px-6">
                    <div class="d-flex justify-space-between align-end">
                        <div class="d-inline-block text-h5 font-weight-black">熱門討論</div>
                        <a @click="toDiscussuion" class="d-inline-block text-subtitle-1 text-black text-decoration-none"
                            style="cursor: pointer;">
                            看更多 >
                        </a>
                    </div>
                    <hr />
                    <div v-for="discussion in discussionStore.popularDiscussions.slice(0, 4)" class="ma-2">
                        <div class="d-flex justify-space-between">
                            <div class="d-flex flex-column">
                                <div class="text-h5 mt-2">
                                    {{ discussion.title }}
                                </div>
                            </div>
                            <div class="d-flex align-self-center">
                                <div class="d-flex justify-space-between align-end">
                                    <div class="d-flex my-1">
                                        <v-chip v-for="tag in discussion.tags.slice(0, 3)" :key="tag"
                                            class="bg-primary mr-1">
                                            {{ tag }}
                                        </v-chip>
                                    </div>
                                </div>
                                <div class="align-self-center text-right" style="width: 65px;">
                                    {{ discussion.created_at }}
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                </v-col>
                <v-col cols="12" md="6" class="px-6">
                    <div class="d-flex justify-space-between align-end">
                        <div class="d-inline-block text-h5 font-weight-black">最新討論</div>
                        <a @click="toDiscussuion" class="d-inline-block text-subtitle-1 text-black text-decoration-none"
                            style="cursor: pointer;">
                            看更多 >
                        </a>
                    </div>
                    <hr />
                    <div v-for="discussion in discussionStore.newDiscussions.slice(0, 4)" class="ma-2">
                        <div class="d-flex justify-space-between">
                            <div class="d-flex flex-column">
                                <div class="text-h5 mt-2">
                                    {{ discussion.title }}
                                </div>
                            </div>
                            <div class="d-flex align-self-center">
                                <div class="d-flex justify-space-between align-end">
                                    <div class="d-flex my-1">
                                        <v-chip v-for="tag in discussion.tags.slice(0, 3)" :key="tag"
                                            class="bg-primary mr-1">
                                            {{ tag }}
                                        </v-chip>
                                    </div>
                                </div>
                                <div class="align-self-center text-right" style="width: 65px;">
                                    {{ discussion.created_at }}
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                </v-col>
            </v-row>
        </div>
    </div>

    <div class="px-10 pt-16 pb-2 bg-primary">
        <div class="d-flex justify-center">
            <v-btn variant="text" icon="mdi-history" color="white"></v-btn>
            <v-btn variant="text" icon="mdi-heart" color="white"></v-btn>
            <v-btn variant="text" icon="mdi-map-marker" color="white"></v-btn>
        </div>
        <div class="text-center text-caption">2021 - Vuetify</div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useExperienceStore } from '@/stores/experience';
import { onMounted, ref } from 'vue';
import FadeLoader from 'vue-spinner/src/FadeLoader.vue'

import { useDiscussionStore } from '@/stores/discussion'
const discussionStore = useDiscussionStore()
const isLoading = ref(true)

const experienceStore = useExperienceStore()
const router = useRouter()
const introduces = [
    { title: '面試提問模組', img: 'index_1.jpg', content: '隨機抽取不同類型的面試問題，順練臨場反應能力' },
    { title: '面試評估模組', img: 'index_2.jpg', content: '肢體辨識：分析肢體語言<br/>次語言辨識：分析說話速度<br/>成果評估：統計分析並視覺化呈現結果' },
    { title: '面試經驗分享社群', img: 'index_3.jpg', content: '記錄並分享面試過程，讓使用者互相學習' }

]
const toExperience = () => {
    router.push({ name: 'AllExperiences' })
}
const toDiscussuion = () => {
    router.push({ name: 'AllDiscussions' })
}
const onExperienceClick = (id) => {
    router.push({
        name: 'Experience',
        params: { id }
    })
}

onMounted(async () => {
    await experienceStore.getAllExperiences()
    await discussionStore.getAllDiscussions()
    isLoading.value = false
})
</script>
<style>
main {
    padding: 0 !important;
}
</style>