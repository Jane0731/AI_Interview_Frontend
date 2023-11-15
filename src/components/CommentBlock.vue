<template>
    <div class="addcomment-block" v-if="isUseComment">
        <div class="d-flex flex-row align-center my-4 pa-2">
            <v-avatar color="brown" class="mr-4">
                <span class="text-h5">{{ userStore.user.name }}</span>
            </v-avatar>
            <div class="text-h5">{{ userStore.user.name }}</div>
        </div>
        <v-form v-model="form">
            <v-textarea :rules="[rules.required]" v-model="newComment" class="ma-4" variant="plain" rows="2" no-resize
                placeholder="留言"></v-textarea>
            <div class="d-flex mr-4 pb-6 justify-end">
                <v-btn color="disabled" variant="text">
                    <div class="text-h5" @click="changeUseCommentStatus">取消</div>
                </v-btn>
                <v-btn color="primary" :disabled="!form" :loading="loading" type="submit" @click.prevent="addComment()">
                    <div class="text-h5">送出</div>
                </v-btn>
            </div>
        </v-form>

    </div>
    <div class="comment-block d-flex" v-else>
        <v-row justify="space-between" width="100%">
            <div class="d-flex flex-row align-center pl-10 ">
                <v-icon icon="mdi-account-circle"></v-icon>

                <v-text-field placeholder="留言..." variant="plain" density="compact" hide-details="auto" rows="3"
                    class="mx-2" @click="changeUseCommentStatus" />

            </div>
            <div class="d-flex flex-row align-center px-10  mr-10">
                <v-icon :color="isFavorite ? 'deep-orange-accent-4' : 'grey-lighten-4'"
                    @click.stop="clickFavoriteEvent()">mdi-heart</v-icon>
            </div>
        </v-row>
    </div>
</template>
<script setup>
import { defineProps, ref, inject } from 'vue';
import { useFavoriteStore } from '@/stores/favorite'

import { useCommentStore } from '@/stores/comment';
import { useUserStore } from '@/stores/user';
const userStore=useUserStore()
const favoriteStroe = useFavoriteStore()
const reload = inject("reload")

const props = defineProps({
    type: { type: String },
    id: { type: String },
    isFavorite: { type: Boolean }
})
const commentStore = useCommentStore()
const form = ref(false)
const loading = ref(false)

const isUseComment = ref(false)
const newComment = ref("")

const rules = {
    required: value => !!value || '欄位必填',
}
const addComment = async () => {
    console.log(props.id)
    if (!form.value) return
    loading.value = true
    await commentStore.createComment(props.id, newComment.value, props.type)

    loading.value = false
    changeUseCommentStatus()
    newComment.value = ""
}
const changeUseCommentStatus = (() => {
    isUseComment.value = !isUseComment.value
})

const clickFavoriteEvent = async () => {
    if (!props.isFavorite) {
        await favoriteStroe.addFavorites(props.type, props.id, "all")
        reload()
    }
    else {
        await favoriteStroe.deleteFavorites(props.type, props.id, "all")
        reload()

    }
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