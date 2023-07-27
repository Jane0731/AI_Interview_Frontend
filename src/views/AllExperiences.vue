<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <div class="mt-4 pa-4 mx-auto">
          <v-select clearable chips label="地區" class="py-4"
            :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']" multiple variant="outlined" />
          <v-tabs v-model="experienceTab">
            <v-tab value="hot">
              熱門分享
            </v-tab>
            <v-tab value="new">
              最新分享
            </v-tab>
          </v-tabs>
        </div>

        <v-window v-model="experienceTab">
          <v-window-item key="hot" value="hot">
            <div v-for="experience in experiences" class="pa-4 mx-auto mb-5">
              <Experience :experience="experience" />
            </div>

          </v-window-item>
          <v-window-item key="new" value="new">
            <div v-for="experience in experiences" class="pa-4 mx-auto mb-5">
              <Experience :experience="experience" />
            </div>
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import Experience from '@/components/Experience.vue'
import axios from "@/axios.config";
import moment from 'moment'
import 'moment/dist/locale/zh-tw'
moment.locales();

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
const experienceTab = ref("hot")
const isDialog = ref(false)

onMounted(() => {
  // axios
  //   .get("discussion")
  //   .then((response) => {
  //     response.data.forEach((discussion) => {
  //       discussion.created_at=moment(discussion.created_at).fromNow()
  //     })
  //     Object.assign(discussions, response.data);

  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   });
})
</script>

