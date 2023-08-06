<template>
    <v-container>
        <v-row justify="space-between">
            <v-col cols="2">
                <v-spacer></v-spacer>
            </v-col>
            <v-col cols="6">
                <Experience :experience="experience" :isSingleExperience="true"/>
            </v-col>
            <v-col cols="2">
                <Keywords />
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script setup>
import { ref, onMounted, reactive } from 'vue';
import Experience from '@/components/Experience.vue'
import Comment from '@/components/Comment.vue'
import { useRouter, useRoute } from 'vue-router'
import moment from 'moment'
import 'moment/dist/locale/zh-tw'
moment.locales();
const route = useRoute()
const isUseComment = ref(false)
const discussion = reactive({})
const discussionUser = reactive({})
const experience = {
    "id": 1,
    "company": "鼎新",
    "position": "開發工程師",
    "interview_date": "2023/06/30",
    "interview_sharing": "巴拉巴拉xxxxx巴拉巴拉xxxxx巴拉巴拉xxxxx巴拉巴拉xxxxx巴拉巴拉xxxxx巴拉巴拉xxxxx",
    "interview_result": "已錄取",
    "interview_difficulty": 1,
    "interview_question": ["為何選擇我們公司", "希望待遇?"],
    "interview_review":"sdfsdfsdfsdsfsdfsdfdsfdsfsdfsdf",
    "created_at": "2023-07-24T13:18:05.000000Z",
    "updated_at": "2023-07-24T13:18:05.000000Z",
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
onMounted(() => {
    //   axios
    //     .get("discussion/"+route.params.id)
    //     .then((response) => {
    //       response.data.created_at=moment(discussion.created_at).fromNow()
    //       Object.assign(discussion, response.data);
    //       Object.assign(discussionUser, discussion.user);
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     });
})
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

  