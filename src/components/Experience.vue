<template>
    <v-sheet rounded="lg" width="100%">
        <div class="d-flex flex-row align-center ma-2 pa-2">
            <v-sheet class="ma-2">
                <v-avatar color="brown">
                    <span class="text-h5"></span>
                </v-avatar>
            </v-sheet>
            <v-sheet class="ml-2 mr-4">
                <div class="text-h6">{{ experience.company }}</div>
            </v-sheet>
            <v-sheet>
                <div class="text-body-2">{{ experience.created_at }}</div>
            </v-sheet>
            <v-spacer></v-spacer>
            <v-sheet v-if="isShowDotIcon">
                <v-menu location="end">
                    <template v-slot:activator="{ props }">
                        <v-btn variant="text" icon="mdi-dots-vertical" v-bind="props"></v-btn>
                    </template>
                    <v-list>
                        <v-list-item @click="">
                            <v-list-item-title>
                                <div class="text-body-1">編輯</div>
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="">

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
                                        <v-btn color="primary" @click="onDeleteExperience">刪除</v-btn>
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
                                {{ experience.interview_date }}
                            </div>
                        </div>
                    </v-col>
                    <v-col>
                        <div class="text-body-1">
                            <div>面試狀態</div>
                            <div>
                                {{ experience.interview_result }}
                            </div>
                        </div>
                    </v-col>
                    <v-col>
                        <div class="text-body-1">
                            <div> 面試難度 </div>
                            <div>
                                <v-rating size="small" density="compact" v-model="experience.interview_difficulty"
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
            <div class="text-body-2 my-3" :class="[isSingleExperience?'':'share-block']">
                {{ experience.interview_sharing }}
            </div>
        </div>
        <div class="text-h6 ma-2 pa-2">
            <div>
                面試問題
            </div>
            <div class="my-3" v-for="question in experience.interview_question">
                <div class="text-body-2">
                    <v-chip label class="mr-3">Q</v-chip>
                    {{ question }}
                </div>
                <div class="text-body-2 my-3">
                    <v-chip label class="mr-3">A</v-chip>
                    {{ question }}
                </div>
            </div>
        </div>
        <div class="text-h6 ma-2 pa-2" v-if="isSingleExperience">
            <div>
                面試心得
            </div>
            <div class="text-body-2 my-3" :class="[isSingleExperience?'':'share-block']">
                {{ experience.interview_review  }}
            </div>
        </div>
        <div class="d-flex flex-row align-center py-2 px-2 justify-center">
            <v-sheet>
                <v-btn prepend-icon="mdi-heart" variant="text">
                    <template v-slot:prepend>
                        <v-icon color="error"></v-icon>
                    </template>
                    100
                </v-btn>
            </v-sheet>
            <v-sheet>
                <v-btn prepend-icon="mdi-comment" variant="text">
                    <template v-slot:prepend>
                        <v-icon color="primary"></v-icon>
                    </template>
                    100
                </v-btn>
            </v-sheet>
            <v-spacer />
            <v-sheet @click="onExperienceClick(experience.id)" v-if="isSingleExperience?false:true">
                <v-btn size="large" variant="tonal" class="ma-2">
                    查看更多
                </v-btn>
            </v-sheet>
        </div>
    </v-sheet>
</template>
<script setup>
import { defineProps, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
    experience: { type: Object },
    isShowDotIcon: { type: Boolean, default: false },
    isSingleExperience: { type: Boolean, default: false }

})
const deleteExperience = ref(false)

const onExperienceClick = (id) => {
    router.push({
        name: 'Experience',
        params: { id }
    })
}
const onDeleteExperience = (id) => {
    //api
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