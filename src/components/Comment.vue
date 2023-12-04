<template>
    <v-sheet>
        <div class="d-flex flex-row align-center ">
            <div>
                <v-avatar color="brown">
                    <span class="text-h5">{{ comment.poster_name.substr(0, 2) }}</span>
                </v-avatar>
            </div>
            <div class="ml-2 mr-4">
                <div class="text-body-1">{{ comment.poster_name }}</div>
            </div>
            <div class="text-body-2 ">
                {{ comment.created_at }}
            </div>
            <v-spacer></v-spacer>

            <v-sheet v-show="(userId == comment.user_id)">
                <v-menu location="end">
                    <template v-slot:activator="{ props }">
                        <v-btn variant="text" icon="mdi-dots-vertical" v-bind="props"></v-btn>
                    </template>
                    <v-list>
                        <v-list-item @click.stop="commentReadonly = false">
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
            <div v-if="commentReadonly">
                <v-text-field v-model="comment.comment" readonly variant='plain' density="compact">
                </v-text-field>
            </div>
            <div v-else>
                <v-text-field v-model="oldComment" variant='plain' density="compact">
                    <template v-slot:append-inner>
                        <v-btn icon="mdi-close" variant="plain" @click="onCancelUpdate"></v-btn>
                        <v-btn icon="mdi-check" variant="plain" @click="onUpdateComment(comment.id)"></v-btn>
                    </template>
                </v-text-field>
            </div>

        </div>
        <v-spacer></v-spacer>

    </v-sheet>
</template>
<script setup>
import { defineProps, ref, defineEmits } from 'vue'
import { useCommentStore } from '@/stores/comment';
const emit = defineEmits(['fresh'])

const commentStroe = useCommentStore()
const props = defineProps({
    comment: { type: Object },
    typeId: { type: String },
    type: { type: String }
})
const oldComment = ref(props.comment.comment)
const deleteComment = ref(false)
const loading = ref(false)
const commentReadonly = ref(true)
const userId = localStorage.getItem("userId")

const onDeleteComment = async (id) => {
    loading.value = true

    deleteComment.value = false

    await commentStroe.deleteComment(id, props.typeId, props.type)
    loading.value = false
    emit('fresh')

}

const onUpdateComment = async (id) => {
    await commentStroe.updateComment(id, props.typeId, props.type, oldComment.value)
    commentReadonly.value = true

}
const onCancelUpdate = () => {
    commentReadonly.value = true
    oldComment.value = props.comment.comment

}
</script>
