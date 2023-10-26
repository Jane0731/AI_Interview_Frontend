<template>
    <v-sheet rounded="lg" width="100%">
        <div class="d-flex flex-row align-center ma-2 pa-2">
            <v-sheet class="ma-2">
                <v-avatar color="brown">
                    <span class="text-h5">{{ experience.poster_name }}</span>
                </v-avatar>
            </v-sheet>
            <v-sheet class="ml-2 mr-4">
                <div class="text-h6">{{ experience.company }}</div>
            </v-sheet>
            <v-sheet>
                <div class="text-body-2">{{ experience.created_at }}</div>
            </v-sheet>
            <v-spacer></v-spacer>
            <v-sheet v-show="(userId == experience.user_id)" class="menu">
                <v-menu location="end" v-model="menuVisible">
                    <template v-slot:activator="{ props }">
                        <v-btn variant="text" icon="mdi-dots-vertical" v-bind="props"></v-btn>
                    </template>
                    <v-list>
                        <v-list-item @click.stop="openUpdateExperienceDialog()">
                            <v-list-item-title>
                                <div class="text-body-1">編輯</div>
                            </v-list-item-title>
                        </v-list-item>
                        <ExperienceDialog :experience="experience" />

                        <v-list-item @click.stop="deleteExperience = !deleteExperience">

                            <v-dialog v-model="deleteExperience" width="20%" persistent>
                                <template v-slot:activator="{ props }">
                                    <v-list-item-title>
                                        <div class="text-body-1" :="props">刪除</div>
                                    </v-list-item-title>
                                </template>

                                <v-card>
                                    <v-card-text>
                                        是否確定刪除面試分享
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>

                                        <v-btn color="primary" @click="deleteExperience = false">取消</v-btn>
                                        <v-btn color="primary" :loading="loading"
                                            @click="onDeleteExperience(experience.id)">刪除</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-sheet>

        </div>
        <div class="text-h6 ma-2 pa-2">
            {{ experience.position }}
        </div>
        <div class=" ma-2 pa-2 text-center">
            <v-sheet color="#F3F3F3" rounded="lg" width="100%">
                <v-row justify="space-between" align="center">
                    <v-col>
                        <div class="text-body-1">
                            <div>面試日期</div>
                            <div>
                                {{ experience.date }}
                            </div>
                        </div>
                    </v-col>
                    <v-col>
                        <div class="text-body-1">
                            <div>面試狀態</div>
                            <div>
                                {{ experience.result }}
                            </div>
                        </div>
                    </v-col>
                    <v-col>
                        <div class="text-body-1">
                            <div> 面試難度 </div>
                            <div>
                                <v-rating size="small" readonly density="compact" v-model="experience.difficulty" length="3"
                                    color="warning"></v-rating>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-sheet>
        </div>
        <div class="text-h6 ma-2 pa-2">
            <div>
                面試過程
            </div>
            <div class="text-body-2 my-3" :class="[isSingleExperience ? '' : 'share-block']">
                {{ experience.description }}
            </div>
        </div>
        <div class="text-h6 ma-2 pa-2">
            <div>
                面試問題
            </div>
            <div v-if="isSingleExperience" class="my-3" v-for="question in experience.questions">
                <div class="text-body-2">
                    <v-chip label class="mr-3">Q</v-chip>
                    {{ question.question }}
                </div>
                <div class="text-body-2 my-3">
                    <v-chip label class="mr-3">A</v-chip>
                    {{ question.answer || "無資料" }}
                </div>
            </div>
            <div v-else>
                <div class="text-body-2">
                    <v-chip label class="mr-3">Q</v-chip>
                    {{ experience.questions[0].question }}
                </div>
                <div class="text-body-2 my-3">
                    <v-chip label class="mr-3">A</v-chip>
                    {{ experience.questions[0].answer || "無資料" }}
                </div>
            </div>

        </div>

        <div class="d-flex flex-row align-center py-2 px-2 justify-center">
            <v-sheet>
                <v-btn variant="text" icon="mdi-comment" color="primary"></v-btn>
                {{ experience.comments_count }}
            </v-sheet>
            <v-sheet>
                <v-btn variant="plain" icon="mdi-heart" :ripple="false"
                    :color="experience.is_Favorite ? 'deep-orange-accent-4' : 'grey-lighten-4'"
                    @click.stop="clickFavoriteEvent(experience.is_Favorite, 'experience', experience.id)"></v-btn>

                {{ experience.user_favorites_count }}
            </v-sheet>

            <v-spacer />
            <v-sheet @click="onExperienceClick(experience.id)" v-if="isSingleExperience ? false : true">
                <v-btn size="large" variant="tonal" class="ma-2">
                    查看更多
                </v-btn>
            </v-sheet>
        </div>
    </v-sheet>
</template>
<script setup>
import { defineProps, ref,inject,onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useExperienceStore } from '@/stores/experience'
import { useDialogStore } from '@/stores/dialog'
import { useFavoriteStore } from '@/stores/favorite'

import ExperienceDialog from './ExperienceDialog.vue';
const menuVisible = ref(false)

const experienceStore = useExperienceStore()
const dialogStore = useDialogStore()
const favoriteStroe = useFavoriteStore()

const router = useRouter()
const props = defineProps({
    experience: { type: Object },
    isSingleExperience: { type: Boolean, default: false }
})
const reload=inject("reload")
const deleteExperience = ref(false)
const userId = localStorage.getItem("userId")
const loading = ref(false)

onMounted(() => {
    document.addEventListener('click', (e) => {
        if (e.target.className != "menu")
            menuVisible.value = false
    })
})
const onExperienceClick = (id) => {
    router.push({
        name: 'Experience',
        params: { id }
    })
}
const onDeleteExperience = async (id) => {
    loading.value = true

    deleteExperience.value = false

    await experienceStore.deleteExperience(id)
    loading.value = false
}
const openUpdateExperienceDialog = () => {
    dialogStore.changeDialogStatus()
    dialogStore.setDialogContent("編輯面試心得", "修改")
}
const clickFavoriteEvent = async (isFavorite, type, id) => {
    if (!isFavorite) {
        await favoriteStroe.addFavorites(type, id, "all")
        reload()
    }
    else {
        await favoriteStroe.deleteFavorites(type, id, "all")
        reload()
    }
}
</script>
<style scoped>
.share-block {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 25%;
}
</style>