<template>
    <!-- <v-sheet class="mx-auto my-10" max-width="450">
        <alert />
    </v-sheet> -->
    <v-img class="pa-6 pa-sm-16" height="450" src="/banner.png" cover>
        <div class="d-inline-block text-h5 font-weight-black h-100 w-auto mx-2 mx-sm-10 mx-lg-16 pa-2 pa-sm-8 pa-lg-16">
            你不必一個人辛苦奮戰
        </div>
    </v-img>

    <div class="px-10 my-16 text-center">
        <div class="font-weight-black text-teal-darken-1">
            核心理念
        </div>
        <div class="text-h4 font-weight-black ma-2">
            讓好人才與好公司相遇
        </div>
        <div class="d-flex justify-center mt-6">
            <v-card class="mx-6" v-for="n in 3">
                <v-img class="align-end text-white" height="200" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                    cover>
                </v-img>

                <v-card-title class="pt-4 text-left">
                    Number 10
                </v-card-title>

                <v-card-text class="text-left">
                    <div>Whitehaven Beach</div>

                    <div>Whitsunday Island, Whitsunday Islands</div>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="teal-darken-1">
                        Share
                        <v-icon icon="mdi-arrow-right" size="large"></v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </div>
    <div class="px-10 my-16">
        <div class="text-h5 font-weight-black w-auto text-center my-6" style="position: relative;">
            面試分享
            <a @click="toExperience" class="text-subtitle-1 text-black text-decoration-none"
                style="position: absolute;right: 0;bottom: 0;cursor: pointer;">
                看更多 >
            </a>
        </div>

        <v-row class="mx-auto justify-center" style="max-width: 990px;">
            <v-col cols="12" sm="6" md="4" v-for="experience in experienceStore.experiences.slice(0, 6)">
                <v-card class="pa-4 h-100">
                    <div class="d-flex">
                        <v-avatar color="surface-variant"></v-avatar>
                        <div class="d-flex flex-wrap ml-2 font-weight-black align-center">
                            <div class="d-inline-block ml-2 font-weight-black">
                                創科資訊股份有限公司
                            </div>
                            <div class="d-inline-block ml-2 text-grey">
                                4 hour ago
                            </div>
                        </div>
                    </div>
                    <div class="mt-2 text-h5 font-weight-black">
                        前端工程師
                    </div>
                    <v-card-title class="font-weight-black">
                        面試過程
                    </v-card-title>
                    <v-card-subtitle>
                        面試過程省略
                    </v-card-subtitle>
                    <v-card-title class="font-weight-black">
                        面試問題
                    </v-card-title>
                    <v-card-subtitle>
                        <div class="d-inline bg-grey-darken-2 px-2 rounded-xl">Q</div>
                        面試過程省略
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
        <v-row class="mx-auto">
            <v-col cols="12" md="6">
                <div class="d-flex justify-space-between align-end">
                    <div class="d-inline-block text-h5 font-weight-black">熱門討論</div>
                    <a @click="toDiscussuion" class="d-inline-block text-subtitle-1 text-black text-decoration-none"
                        style="cursor: pointer;">
                        看更多 >
                    </a>
                </div>
                <hr />
                <div v-for="n in 4" class="ma-2 d-flex flex-column">
                    <div class="text-h5 mt-2">
                        Title
                    </div>
                    <div class="d-flex justify-space-between align-end">
                        <div class="d-flex my-1">
                            <v-chip v-for="n in 3" class="bg-primary text-color-white mr-1" text="Tag" />
                        </div>
                        <div>
                            11/22 12:12
                        </div>
                    </div>
                    <hr />
                </div>
            </v-col>
            <v-col cols="12" md="6">
                <div class="d-flex justify-space-between align-end">
                    <div class="d-inline-block text-h5 font-weight-black">最新討論</div>
                    <a @click="toDiscussuion" class="d-inline-block text-subtitle-1 text-black text-decoration-none"
                        style="cursor: pointer;">
                        看更多 >
                    </a>
                </div>
                <hr />
                <div v-for="n in 4" class="ma-2 d-flex flex-column">
                    <div class="text-h5 mt-2">
                        Title
                    </div>
                    <div class="d-flex justify-space-between align-end">
                        <div class="d-flex my-1">
                            <v-chip v-for="n in 3" class="bg-primary text-color-white mr-1" text="Tag" />
                        </div>
                        <div>
                            11/22 12:12
                        </div>
                    </div>
                    <hr />
                </div>
            </v-col>
        </v-row>
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
import { onMounted } from 'vue';

const experienceStore = useExperienceStore()
const router = useRouter()
const toExperience = () => {
    router.push({name: 'AllExperiences'})
}
const toDiscussuion = () => {
    router.push({name: 'AllDiscussions'})
}
const onExperienceClick = (id) => {
    router.push({
        name: 'Experience',
        params: { id }
    })
}

onMounted(async () => {
    await experienceStore.getAllExperiences()
})
</script>