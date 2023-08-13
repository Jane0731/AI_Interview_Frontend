<template>
    <v-sheet v-if="comments" v-for="comment in comments" rounded="lg" width="100%" class="px-4 mx-auto my-5">
        <div class="d-flex flex-row align-center ">
            <v-sheet>
                <v-avatar color="brown">
                    <span class="text-h5">aa</span>
                </v-avatar>
            </v-sheet>
            <v-sheet class="ml-2 mr-4">
                <div class="text-body-1">{{ comment.poster_name }}</div>
            </v-sheet>
            <v-spacer></v-spacer>

            <v-sheet v-show="(userId == comment.user_id)">
                <v-menu location="end">
                    <template v-slot:activator="{ props }">
                        <v-btn variant="text" icon="mdi-dots-vertical" v-bind="props"></v-btn>
                    </template>
                    <v-list>
                        <v-list-item @click.stop="">
                            <v-list-item-title>
                                <div class="text-body-1">編輯</div>
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-item @click.stop="deleteComment = !deleteComment">

                            <v-dialog v-model="deleteComment" width="20%" persistent>
                                <template v-slot:activator="{ props }">
                                    <v-list-item-title>
                                        <div class="text-body-1" :="props">刪除</div>
                                    </v-list-item-title>
                                </template>

                                <v-card>
                                    <v-card-text>
                                        是否確定刪除此留言
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>

                                        <v-btn color="primary" @click="deleteComment = false">取消</v-btn>
                                        <v-btn color="primary" :loading="loading"
                                            @click="onDeleteComment(comment.id)">刪除</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-sheet>
        </div>
        <div class="text-h6 ">
            <v-sheet>
                {{ comment.comment }}
            </v-sheet>
        </div>
        <div class="text-body-2 ">
            {{ comment.created_at }} </div>
    </v-sheet>
    <v-sheet v-else>
        暫無資料
    </v-sheet>
</template>
<script setup>
import { defineProps ,ref} from 'vue'
import { useCommentStore } from '@/stores/comment';
const commentStroe=useCommentStore()
const props = defineProps({
    comments: { type: Object },
    discussionId: { type: String },

})
const deleteComment = ref(false)
const loading = ref(false)

const userId = localStorage.getItem("userId")

const onDeleteComment = async (id) => {
    loading.value = true

    deleteComment.value = false

    await commentStroe.deleteComment(id,props.discussionId)
    loading.value = false
}
</script>
