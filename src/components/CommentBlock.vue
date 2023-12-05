<template>
    <div class="addcomment-block" v-if="isUseComment">
        <div class="d-flex flex-row align-center my-4 pa-2">
            <v-avatar color="brown" class="mr-4">
                <span class="text-h5">{{ userStore.user.name }}</span>
            </v-avatar>
            <div class="text-h5">{{ userStore.user.name }}</div>
        </div>
        <v-form v-model="form">
            <v-textarea :rules="[rules.required]" v-model="newComment" class="ma-4" no-resize placeholder="留言"></v-textarea>
            <div class="d-flex mr-4 pb-6 justify-end">
                <v-btn class="mx-2" color="disabled" variant="text" @click="changeUseCommentStatus">
                    取消
                </v-btn>
                <v-btn class="mx-2" color="primary" :disabled="!form" :loading="loading" type="submit"
                    @click.prevent="addComment()">
                    送出
                </v-btn>
            </div>
        </v-form>

    </div>
    <div class="comment-block d-flex align-center px-2" v-else>

        <v-icon icon="mdi-account-circle align-center"></v-icon>

        <v-text-field placeholder="留言" variant="underlined" density="compact" hide-details="auto" class="mx-2 mb-2"
            @click="authStore.isAuthorized ? changeUseCommentStatus() : (isShowDialog = true)" />

    </div>
    <v-dialog v-model="isShowDialog" width="100%" max-width="300px">
        <v-card>
            <v-card-text class="text-h5">
                請先登入才可留言
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="isShowDialog = false">關閉</v-btn>
                <v-btn color="primary" @click="login">前往登入</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script setup>
import { defineProps, ref, onMounted } from 'vue';
import { useDiscussionStore } from '@/stores/discussion'
import { useAuthStore } from '@/stores/auth'
import { useCommentStore } from '@/stores/comment';
import { useUserStore } from '@/stores/user';
import { useRouter, useRoute } from 'vue-router'
import { useExperienceStore } from '@/stores/experience'

onMounted(() => {
    console.log(authStore.isAuthorized)
})
const userStore = useUserStore()

const authStore = useAuthStore()
const experienceStore = useExperienceStore()

const props = defineProps({
    type: { type: String },
    id: { type: String },
    isFavorite: { type: Boolean }
})
const commentStore = useCommentStore()
const form = ref(false)
const loading = ref(false)
const discussionStore = useDiscussionStore()

const isUseComment = ref(false)
const newComment = ref("")

const rules = {
    required: value => !!value || '欄位必填',
}
const addComment = async () => {
    if (!form.value) return
    loading.value = true
    await commentStore.createComment(props.id, newComment.value, props.type)

    loading.value = false
    changeUseCommentStatus()
    newComment.value = ""
    if (props.type == 'discussion')
        await discussionStore.getDiscussion(props.id)
    else
        await experienceStore.getExperience(props.id)


}
const changeUseCommentStatus = (() => {
    isUseComment.value = !isUseComment.value
})

const isShowDialog = ref(false)
const router = useRouter()
const route = useRoute()

const login = () => {
    router.push({
        name: 'Login',
        query: {
            redirect: route.fullPath
        }
    })
}
</script>
<style scoped>
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
</style>