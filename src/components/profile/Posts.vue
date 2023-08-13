<template>
    <v-card width="100%">
        <v-sheet width="100%" color="primary" height="120" class="d-flex align-center justify-center pa-10">
            <div class="text-h4">我的發文</div>
        </v-sheet>
        <v-card-text class="overflow-auto cardtext-width">
            <v-tabs v-model="tab" grow>
                <v-tab value="discussion">
                    <div class="text-h6">討論</div>
                </v-tab>
                <v-tab value="experience">
                    <div class="text-h6">面試分享</div>
                </v-tab>
            </v-tabs>
            <v-window v-model="tab">
                <v-window-item value="discussion">
                    <div v-for="discussion in discussions" class="window-item pa-4 mx-auto my-5 rounded-lg w-75">
                        <Discussion :discussion="discussion" :isShowDotIcon="true" />
                    </div>
                </v-window-item>
                <v-window-item value="experience">
                    <div v-for="experience in experiences" class="window-item pa-4 mx-auto my-5 rounded-lg w-75">
                        <Experience :experience="experience" :isShowDotIcon="true" />
                    </div>
                </v-window-item>
            </v-window>
        </v-card-text>

    </v-card>
</template>
<script setup>
import { ref } from 'vue';
import Discussion from '@/components/Discussion.vue'
import Experience from '@/components/Experience.vue'

const discussions = [
    {
        "id": 1,
        "title": "面試都穿啥",
        "content": "把拉把拉Dfdgfdgdfgdfg",
        "created_at": "2023-07-23T15:05:11.000000Z",
        "updated_at": "2023-07-23T15:05:11.000000Z",
        "tags": [
            "面試穿搭",
            "柯P"
        ],
        "user": {
            "id": 1,
            "name": "jane",
            "sex": null
        },
        "category": {
            "id": 1,
            "name": "軟體工程"
        }
    },
    {
        "id": 2,
        "title": "面試都穿啥2",
        "content": "把拉把拉Dfdgfdgdfgdfg2",
        "created_at": "2023-07-23T15:05:11.000000Z",
        "updated_at": "2023-07-23T15:05:11.000000Z",
        "tags": [
            "面試穿搭",
            "薪水"
        ],
        "user": {
            "id": 2,
            "name": "RJ",
            "sex": null
        },
        "category": {
            "id": 2,
            "name": "金融"
        }
    },
    {
        "id": 3,
        "title": "面試都穿啥",
        "content": "把拉把拉Dfdgfdgdfgdfg",
        "created_at": "2023-07-24T13:18:05.000000Z",
        "updated_at": "2023-07-24T13:18:05.000000Z",
        "tags": [],
        "user": {
            "id": 2,
            "name": "RJ",
            "sex": null
        },
        "category": {
            "id": 1,
            "name": "軟體工程"
        }
    },
    {
        "id": 4,
        "title": "面試都穿啥2",
        "content": "把拉把拉Dfdgfdgdfgdfg2",
        "created_at": "2023-07-24T13:18:05.000000Z",
        "updated_at": "2023-07-24T13:18:05.000000Z",
        "tags": [],
        "user": {
            "id": 1,
            "name": "jane",
            "sex": null
        },
        "category": {
            "id": 2,
            "name": "金融"
        }
    },
    {
        "id": 5,
        "title": "hello",
        "content": "afxfhcjhk dtyuvrevd gh  dty.",
        "created_at": "2023-07-24T15:58:12.000000Z",
        "updated_at": "2023-07-24T15:58:12.000000Z",
        "tags": [],
        "user": {
            "id": 1,
            "name": "jane",
            "sex": null
        },
        "category": {
            "id": 1,
            "name": "軟體工程"
        }
    },
    {
        "id": 6,
        "title": "hello",
        "content": "afxfhcjhk dtyuvrevd gh  dty.",
        "created_at": "2023-07-24T15:59:25.000000Z",
        "updated_at": "2023-07-24T15:59:25.000000Z",
        "tags": [
            "薪水",
            "年資"
        ],
        "user": {
            "id": 1,
            "name": "jane",
            "sex": null
        },
        "category": {
            "id": 1,
            "name": "軟體工程"
        }
    },
    {
        "id": 7,
        "title": "hello",
        "content": "afxfhcjhk dtyuvrevd gh  dty.",
        "created_at": "2023-07-24T16:03:31.000000Z",
        "updated_at": "2023-07-24T16:03:31.000000Z",
        "tags": [
            "薪水",
            "年資"
        ],
        "user": {
            "id": 1,
            "name": "jane",
            "sex": null
        },
        "category": {
            "id": 1,
            "name": "軟體工程"
        }
    }
]
const experiences = [
    {
        "id": 1,
        "company": "鼎新",
        "position": "開發工程師",
        "interview_date": "2023/06/30",
        "interview_sharing": "巴拉巴拉xxxxx巴拉巴拉xxxxx巴拉巴拉xxxxx巴拉巴拉xxxxx巴拉巴拉xxxxx巴拉巴拉xxxxx",
        "interview_result": "已錄取",
        "interview_difficulty": 1,
        "interview_question": ["為何選擇我們公司", "希望待遇?"],
        "created_at": "2023-07-24T13:18:05.000000Z",
        "updated_at": "2023-07-24T13:18:05.000000Z",
    },
    {
        "id": 2,
        "company": "鼎新",
        "position": "開發工程師",
        "interview_date": "2023/06/30",
        "interview_sharing": "巴拉巴拉xxxxx",
        "interview_result": "已錄取",
        "interview_difficulty": "簡單",
        "interview_question": ["為何選擇我們公司", "希望待遇?"],
        "created_at": "2023-07-24T13:18:05.000000Z",
        "updated_at": "2023-07-24T13:18:05.000000Z",
    },
    {
        "id": 3,
        "company": "鼎新",
        "position": "開發工程師",
        "interview_date": "2023/06/30",
        "interview_sharing": "巴拉巴拉xxxxx",
        "interview_result": "已錄取",
        "interview_difficulty": "簡單",
        "interview_question": ["為何選擇我們公司", "希望待遇?"],
        "created_at": "2023-07-24T13:18:05.000000Z",
        "updated_at": "2023-07-24T13:18:05.000000Z",
    },
]
const tab = ref("discussion")
</script>
<style scoped>
.cardtext-width {
    height: calc(100vh - 256px)
}

.window-item {
    border: 1px #C8C8C8 solid
}
</style>
