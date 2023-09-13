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
                            <v-sheet>
                                <v-btn variant="text" icon="mdi-comment" color="primary"></v-btn>
                                {{ discussionStore.discussion.comments_count }}
                            </v-sheet>
                            <v-sheet>
                                <v-btn variant="plain" icon="mdi-heart" :ripple="false"
                                    :color="discussionStore.discussion.is_Favorite ? 'deep-orange-accent-4' : 'grey-lighten-4'"
                                    @click.stop="clickFavoriteEvent(discussionStore.discussion.is_Favorite, 'discussion', discussionStore.discussion.id)"></v-btn>

                                {{ discussionStore.discussion.user_favorites_count }}
                            </v-sheet>
                        </div>
                        <v-divider></v-divider>
                        <v-sheet v-if="comments.length">
                            <div v-for="comment in comments" class="px-4 mx-auto mt-2">
                                <Comment :type="type" :comment="comment" :typeId="discussionStore.discussion.id" 
                                   />
                            </div>
                        </v-sheet>
                        <v-sheet v-else rounded="lg" width="100%" class="px-4 mx-auto mt-2">
                            尚無留言
                        </v-sheet>
                    </div>
                    <CommentBlock :id="discussionStore.discussion.id" :type="type" :isFavorite="discussionStore.discussion.is_Favorite"/>
                </v-sheet>
            </v-col>
            <v-col cols="2">
                <Keywords />
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script setup>
import { onMounted, ref } from 'vue';
import Keywords from '@/components/Keywords.vue'
import Comment from '@/components/Comment.vue'
import CommentBlock from '@/components/CommentBlock.vue';
import { useDiscussionStore } from '@/stores/discussion'
import { useCommentStore } from '@/stores/comment';
import { useRoute } from 'vue-router'
import { useFavoriteStore } from '@/stores/favorite'
import { storeToRefs } from 'pinia';

const commentStore = useCommentStore()
const { comments } = storeToRefs(commentStore);
const discussionStore = useDiscussionStore()
const route = useRoute()
const type = ref("discussion")
const favoriteStroe = useFavoriteStore()

onMounted(async () => {
    await discussionStore.getDiscussion(route.params.id)
    await commentStore.getComment(route.params.id, "discussion")
})
const onFresh = async() => {
  renderKey.value += 1;
  await discussionStore.getAllDiscussions()

};
const clickFavoriteEvent = async (isFavorite, type, id) => {
    if (!isFavorite)
        await favoriteStroe.addFavorites(type, id, "single")
    else
        await favoriteStroe.deleteFavorites(type, id, "single")
}
</script>
<style scoped>
.discussion-block {
    min-height: calc(100vh - 150px)
}
</style>

  