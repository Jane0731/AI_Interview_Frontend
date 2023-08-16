<template>
    <v-container>
        <v-row justify="space-between">
            <v-col cols="2">
                <v-spacer></v-spacer>
            </v-col>
            <v-col cols="6">
                <v-sheet rounded="t-lg" width="100%">
                    <div class="pa-4 mx-auto my-5 discussion-block">
                        <div class="d-flex flex-row align-center ma-2 pa-2">
                            <v-avatar color="brown">
                                <span class="text-h5">{{ discussionStore.discussion.poster_sex }}</span>
                            </v-avatar>
                            <div class="text-body-1 ml-2 mr-4">{{ discussionStore.discussion.poster_name }}</div>
                        </div>
                        <div class="text-h6 ma-2 pa-2">
                            {{ discussionStore.discussion.title }}
                        </div>
                        <div class="d-flex flex-row align-center ma-2 pa-2">
                            <div class="text-body-1 mr-4">{{ discussionStore.discussion.category }}</div>
                            <div class="text-body-2">{{ discussionStore.discussion.created_at }}</div>
                        </div>
                        <div class="text-body-2 ma-2 pa-2">{{ discussionStore.discussion.content }} </div>
                        <div class="ma-2 pa-2">
                            <v-chip-group selected-class="text-primary" column>
                                <v-chip v-for="tag in discussionStore.discussion.tags" :key="tag">
                                    {{ tag }}
                                </v-chip>
                            </v-chip-group>
                        </div>
                        <div class="d-flex flex-row align-center ma-2 pa-2">
                            <v-btn prepend-icon="mdi-heart" variant="text">
                                <template v-slot:prepend>
                                    <v-icon color="error"></v-icon>
                                </template>
                                {{ discussionStore.discussion.favorites }}
                            </v-btn>
                            <v-btn prepend-icon="mdi-comment" variant="text">
                                <template v-slot:prepend>
                                    <v-icon color="primary"></v-icon>
                                </template>
                                {{ discussionStore.discussion.comments }}
                            </v-btn>
                        </div>
                        <v-divider></v-divider>
                        <v-sheet v-if="comments.length">
                            <div v-for="comment in comments" class="px-4 mx-auto mt-2">
                                <Comment :comment="comment" :discussionId="discussionStore.discussion.id" :key="comment.id"/>
                            </div>
                        </v-sheet>
                        <v-sheet v-else rounded="lg" width="100%" class="px-4 mx-auto mt-2">
                            尚無留言
                        </v-sheet>
                    </div>
                    <div class="addcomment-block" v-if="isUseComment">
                        <div class="d-flex flex-row align-center my-4 pa-2">
                            <v-avatar color="brown" class="mr-4">
                                <span class="text-h5">aa</span>
                            </v-avatar>
                            <div class="text-h5">劉賊賊</div>
                        </div>
                        <v-form v-model="form">
                            <v-textarea :rules="[rules.required]" v-model="newComment" class="ma-4" variant="plain" rows="2"
                                no-resize placeholder="留言"></v-textarea>
                            <div class="d-flex mr-4 pb-6 justify-end">
                                <v-btn color="disabled" variant="text">
                                    <div class="text-h5" @click="changeUseCommentStatus">取消</div>
                                </v-btn>
                                <v-btn color="primary" :disabled="!form" :loading="loading" type="submit"
                                    @click.prevent="addComment(discussionStore.discussion.id)">
                                    <div class="text-h5">送出</div>
                                </v-btn>
                            </div>
                        </v-form>

                    </div>
                    <div class="comment-block d-flex" v-else>
                        <v-row justify="space-between" width="100%">
                            <div class="d-flex flex-row align-center pl-10 ">
                                <v-icon icon="mdi-account-circle"></v-icon>

                                <v-text-field placeholder="留言..." variant="plain" density="compact" hide-details="auto"
                                    rows="3" class="mx-2" @click="changeUseCommentStatus" />

                            </div>
                            <div class="d-flex flex-row align-center px-10  mr-10">
                                <v-icon color="error">mdi-heart</v-icon>
                            </div>
                        </v-row>
                    </div>
                </v-sheet>
            </v-col>
            <v-col cols="2">
                <Keywords />
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script setup>
import { ref, onMounted, onUpdated,computed } from 'vue';
import Keywords from '@/components/Keywords.vue'
import Comment from '@/components/Comment.vue'
import { useRoute } from 'vue-router'
import { useDiscussionStore } from '@/stores/discussion'
import { useCommentStore } from '@/stores/comment';
const commentStore = useCommentStore()
const loading = ref(false)
const form = ref(false)

const discussionStore = useDiscussionStore()
const route = useRoute()
const isUseComment = ref(false)
const newComment = ref("")
const comments = commentStore.comments
onMounted(async () => {
    await discussionStore.getDiscussion(route.params.id)
    await commentStore.getComment(route.params.id)
})
const changeUseCommentStatus=(()=>{
    isUseComment.value= !isUseComment.value
})
onUpdated(async () => {
    // await discussionStore.getDiscussion(route.params.id)
    // await commentStore.getComment(route.params.id)
    console.log("onUpdated")

})
const rules = {
    required: value => !!value || '欄位必填',
}
const addComment = async (id) => {
    console.log(newComment.value)
    if (!form.value) return
    loading.value = true
    await commentStore.createComment(id, newComment.value)
    loading.value = false
    changeUseCommentStatus()
    newComment.value = ""
}
</script>
<style>
.comment-block {
    background-color: #FCFBFB;
    height: 50px;
    position: sticky;
    bottom: 0;
    border-top: 2px #DED9D9 solid
}

.addcomment-block {
    background-color: #FCFBFB;
    height: fit-content;
    position: sticky;
    bottom: 0;
    border-top: 2px #DED9D9 solid
}

.discussion-block {
    min-height: calc(100vh - 150px)
}
</style>

  