<template>
    <v-sheet rounded="lg" width="100%" @click="onDiscussionClick(discussion.id)">
        <div class="d-flex flex-row align-center ma-2 pa-2">
            <v-sheet>
                <v-avatar color="brown">
                    <span class="text-h5">臻臻</span>
                </v-avatar>
            </v-sheet>
            <v-sheet class="ml-2 mr-4">
                <div class="text-body-1">{{ discussion.categoryName }}</div>
            </v-sheet>
            <v-sheet>
                <div class="text-body-2">{{ discussion.created_at }}</div>
            </v-sheet>
            <v-spacer></v-spacer>
            <v-sheet v-show="(userId == discussion.user_id)">
                <v-menu location="end">
                    <template v-slot:activator="{ props }">
                        <v-btn variant="text" icon="mdi-dots-vertical" v-bind="props" ></v-btn>
                    </template>
                    <v-list>
                        <v-list-item @click.stop="openUpdateDiscussionDialog()">
                            <v-list-item-title>
                                <div class="text-body-1">編輯</div>
                            </v-list-item-title>
                        </v-list-item>
                        <DiscussionDialog :user="{ name: '劉賊賊', id: 1 }" :discussion="discussion" />

                        <v-list-item @click.stop="deleteDiscussion=!deleteDiscussion">

                            <v-dialog v-model="deleteDiscussion" width="20%" persistent>
                                <template v-slot:activator="{ props }">
                                    <v-list-item-title>
                                        <div class="text-body-1" :="props" >刪除</div>
                                    </v-list-item-title>
                                </template>

                                <v-card>
                                    <v-card-text>
                                        是否確定刪除文章
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>

                                        <v-btn color="primary" @click="deleteDiscussion = false">取消</v-btn>
                                        <v-btn color="primary" :loading="loading" @click.stop="onDeleteDiscussion(discussion.id)">刪除</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-list-item>

                    </v-list>

                </v-menu>

            </v-sheet>

        </div>
        <div class="text-h6 ma-2 pa-2">
            {{ discussion.title }}
        </div>
        <div class="text-body-2 ma-2 pa-2">
            {{ discussion.content }}
        </div>
        <div class="d-flex flex-row align-center ma-2 pa-2">
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
        </div>
    </v-sheet>
</template>
<script setup>
import { defineProps, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDialogStore } from '@/stores/dialog'
import { useDiscussionStore } from '@/stores/discussion'

import DiscussionDialog from '@/components/DiscussionDialog.vue'
const loading = ref(false)

const dialogStore = useDialogStore()
const discussionStore=useDiscussionStore()
const userId=localStorage.getItem("userId")
const router = useRouter()
const props = defineProps({
    discussion: { type: Object }
})
const deleteDiscussion = ref(false)



const onDiscussionClick = (id) => {
    router.push({
        name: 'Discussion',
        params: { id }
    })
}
const onDeleteDiscussion = async(id) => {
    loading.value = true

    deleteDiscussion.value = false

    await discussionStore.deleteDiscussion(id)
    loading.value = false
}
const openUpdateDiscussionDialog = () => {
    dialogStore.changeDialogStatus()
    dialogStore.setDialogContent("編輯討論", "修改")
}
</script>
