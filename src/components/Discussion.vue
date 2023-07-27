<template>
    <v-sheet rounded="lg" width="100%" @click="onDiscussionClick(discussion.id)">
        <div class="d-flex flex-row align-center ma-2 pa-2">
            <v-sheet>
                <v-avatar color="brown">
                    <span class="text-h5">{{ discussion.poster_name }}</span>
                </v-avatar>
            </v-sheet>
            <v-sheet class="ml-2 mr-4">
                <div class="text-body-1">{{ discussion.category }}</div>
            </v-sheet>
            <v-sheet>
                <div class="text-body-2">{{ discussion.created_at }}</div>
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
                                    <v-card-actions >
                                        <v-spacer></v-spacer>

                                        <v-btn color="primary" @click="deleteDiscussion = false" >取消</v-btn>
                                        <v-btn color="primary" @click="onDeleteDiscussion" >刪除</v-btn>
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
import { defineProps, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const props = defineProps({
    discussion: { type: Object },
    isShowDotIcon: { type: Boolean, default: false }
})
const deleteDiscussion = ref(false)

const onDiscussionClick = (id) => {
    router.push({
        name: 'Discussion',
        params: { id }
    })
}
const onDeleteDiscussion = (id) => {
    //api
}
</script>
