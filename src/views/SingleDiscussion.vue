<template>
    <v-container>
        <v-row justify="space-between">
            <v-col cols="2">
                <v-spacer></v-spacer>
            </v-col>
            <v-col cols="6">
                <v-sheet rounded="t-lg" width="100%">
                    <div class="pa-4 mx-auto my-5" style="min-height:calc(100vh - 150px)">
                        <div class="d-flex flex-row align-center ma-2 pa-2">
                            <v-avatar color="brown">
                                <span class="text-h5">女</span>
                            </v-avatar>
                            <div class="text-body-1 ml-2 mr-4">{{ discussion.poster }}</div>
                        </div>
                        <div class="text-h6 ma-2 pa-2">
                            {{ discussion.title }}
                        </div>
                        <div class="d-flex flex-row align-center ma-2 pa-2">
                            <div class="text-body-1 mr-4">{{ discussion.classification }}</div>
                            <div class="text-body-2">{{ discussion.posting_time }}</div>
                        </div>
                        <div class="text-body-2 ma-2 pa-2">{{ discussion.content }} </div>
                        <div class="ma-2 pa-2">
                            <v-chip-group selected-class="text-primary" column>
                                <v-chip v-for="tag in discussion.tags" :key="tag">
                                    {{ tag }}
                                </v-chip>
                            </v-chip-group>
                        </div>
                        <div class="d-flex flex-row align-center ma-2 pa-2">
                            <v-btn prepend-icon="mdi-heart" variant="text">
                                <template v-slot:prepend>
                                    <v-icon color="error"></v-icon>
                                </template>
                                {{ discussion.favorites }}
                            </v-btn>
                            <v-btn prepend-icon="mdi-comment" variant="text">
                                <template v-slot:prepend>
                                    <v-icon color="primary"></v-icon>
                                </template>
                                {{ discussion.comments }}
                            </v-btn>
                        </div>
                        <v-divider></v-divider>

                        <Comment v-for="comment in comments" :comment="comment" />
                    </div>
                    <div class="comment-block d-flex">
                        <v-row justify="space-between" width="100%">
                            <div class="d-flex flex-row align-center pl-10 ">
                                <v-icon icon="mdi-account-circle"></v-icon>
                                <v-text-field label="留言..." variant="plain" single-line density="compact"
                                    hide-details="auto" class="mx-2" />
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
import Keywords from '@/components/Keywords.vue'
import Comment from '@/components/Comment.vue'
const discussion = {
    "discussion_id": 1,
    "poster": "Jane",
    "classification": "閒聊",
    "posting_time": "2020-09-07T05:31:09.000000Z",
    "title": "面試都穿啥",
    "content": "把拉把拉Dfdgfdgdfgdfg",
    "favorites": 20,
    "comments": 20,
    "tags": ["面試穿搭", "dfg"]
}
const comments = [
    {
        "id": 1,
        "author": {
            "id": 1,
            "name": "RJ"
        },
        "comment": "ㄚㄚㄚㄚㄚ",
        "update_at": "2020-09-07T05:31:09.000000Z"

    },
    {
        "id": 2,
        "author": {
            "id": 2,
            "name": "Jane"
        },
        "comment": "ㄚㄚㄚㄚㄚ",
        "update_at": "2020-09-07T05:31:09.000000Z"
    },
]
</script>
<style>
.comment-block {
    background-color: #FCFBFB;
    height: 50px;
    position: sticky;
    bottom: 0;
    border-top: 2px #DED9D9 solid
}
</style>

  