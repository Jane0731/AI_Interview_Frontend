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
    <v-container v-else>
        <v-row justify="space-between">
            <v-col cols="2">
                <v-spacer></v-spacer>
            </v-col>
            <v-col cols="6">
                <v-sheet rounded="t-lg" width="100%">

                    <Experience :experience="experienceStore.experience" :isSingleExperience="true" />
                    <v-divider></v-divider>
                    <v-sheet v-if="commentStore.comments.length">
                        <div v-for="comment in commentStore.comments" class="px-4 mx-auto mt-2">
                            <Comment @fresh="onFresh()" :comment="comment" :type="type"
                                :typeId="experienceStore.experience.id" />
                        </div>
                    </v-sheet>
                    <v-sheet v-else rounded="lg" width="100%" class="px-4 mx-auto mt-2">
                        尚無留言
                    </v-sheet>
                    <CommentBlock :id="experienceStore.experience.id" :type="type"
                        :isFavorite="experienceStore.experience.is_Favorite" />
                </v-sheet>
            </v-col>
            <v-col cols="2">
                <Keywords />
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script setup>
import FadeLoader from 'vue-spinner/src/FadeLoader.vue'

import { ref, onMounted } from 'vue';
import Experience from '@/components/Experience.vue'
import { useRoute } from 'vue-router'
import CommentBlock from '@/components/CommentBlock.vue';
import { useExperienceStore } from '@/stores/experience'
import { useCommentStore } from '@/stores/comment';

import Comment from '@/components/Comment.vue'
const isLoading = ref(true)

const experienceStore = useExperienceStore()
const commentStore = useCommentStore()
const type = ref("experience")
const route = useRoute()
onMounted(async () => {
    await experienceStore.getExperience(route.params.id)
    await commentStore.getComment(route.params.id, "experience")
    isLoading.value=false
})
</script>
<style>
.discussion-block {
    min-height: calc(100vh - 150px)
}
</style>

  