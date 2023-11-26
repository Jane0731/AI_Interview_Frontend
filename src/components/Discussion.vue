<template>
    <v-sheet rounded="lg" width="100%" @click.self="onDiscussionClick(discussion.id)">
        <div class="d-flex flex-row align-center ma-2 pa-2">
            <v-sheet>
                <v-avatar color="brown">
                    <span class="text-h5">{{ discussion.poster_name }}</span>
                </v-avatar>
            </v-sheet>
            <v-sheet class="ml-2 mr-4">
                <div class="text-body-1">{{ discussion.categoryName }}</div>
            </v-sheet>
            <v-sheet>
                <div class="text-body-2">{{ discussion.created_at }}</div>
            </v-sheet>
            <v-spacer></v-spacer>
            <v-sheet v-show="(userId == discussion.user_id)" class="menu">
                <v-menu location="end" >
                    <template v-slot:activator="{ props }">
                        <v-btn variant="text" icon="mdi-dots-vertical" v-bind="props"></v-btn>
                    </template>
                    <v-list>
                        <v-list-item @click.stop="openUpdateDiscussionDialog()">
                            <v-list-item-title>
                                <div class="text-body-1">編輯</div>
                            </v-list-item-title>
                        </v-list-item>
                        <DiscussionDialog :user="{ name: '劉賊賊', id: 1 }" :discussion="discussion" />

                        <v-list-item @click.stop="deleteDiscussion = !deleteDiscussion">

                            <v-dialog v-model="deleteDiscussion" width="20%" persistent>
                                <template v-slot:activator="{ props }">
                                    <v-list-item-title>
                                        <div class="text-body-1" :="props">刪除</div>
                                    </v-list-item-title>
                                </template>

                                <v-card>
                                    <v-card-text>
                                        是否確定刪除文章
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>

                                        <v-btn color="primary" @click="deleteDiscussion = false">取消</v-btn>
                                        <v-btn color="primary" :loading="loading"
                                            @click.stop="onDeleteDiscussion(discussion.id)">刪除</v-btn>
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
                <v-btn variant="text" icon="mdi-comment" color="primary"></v-btn>
                {{ discussion.comments_count }}
            </v-sheet>
            <v-sheet>
                <v-btn variant="plain" icon="mdi-heart" :ripple="false"
                    :color="discussion.is_Favorite ? 'deep-orange-accent-4' : 'grey-lighten-4'"
                    @click.stop="authStore.isAuthorized ?clickFavoriteEvent(discussion.is_Favorite, 'discussion', discussion.id):openLoginDialog()"></v-btn>

                {{ discussion.user_favorites_count }}

            </v-sheet>
            <LoginDialog content="請先登入才可點讚討論" />

        </div>
    </v-sheet>
</template>
<script setup>
import { defineProps, ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useDialogStore } from '@/stores/dialog'
import { useDiscussionStore } from '@/stores/discussion'
import { useFavoriteStore } from '@/stores/favorite'
import DiscussionDialog from '@/components/DiscussionDialog.vue'
import LoginDialog from '@/components/LoginDialog.vue'
import { useAuthStore } from '@/stores/auth'

const loading = ref(false)
const favoriteStroe = useFavoriteStore()
const dialogStore = useDialogStore()
const authStore=useAuthStore()
const discussionStore = useDiscussionStore()
const userId = localStorage.getItem("userId")
const router = useRouter()
const props = defineProps({
    discussion: { type: Object },
})
const emit = defineEmits(['fresh'])
const deleteDiscussion = ref(false)
const openLoginDialog = () => {
  dialogStore.changeLoginDialogStatus()
}


const onDiscussionClick = (id) => {

    router.push({
        name: 'Discussion',
        params: { id }
    })
    emit('fresh')

}
const onDeleteDiscussion = async (id) => {
    loading.value = true

    deleteDiscussion.value = false

    await discussionStore.deleteDiscussion(id)
    loading.value = false

}
const openUpdateDiscussionDialog = () => {
    dialogStore.changeDialogStatus()
    dialogStore.setDialogContent("編輯討論", "修改")
}
const clickFavoriteEvent = async (isFavorite, type, id) => {
    if (!isFavorite)
        await favoriteStroe.addFavorites(type, id, "all")
    else
        await favoriteStroe.deleteFavorites(type, id, "all")
    emit('fresh')
}

</script>
