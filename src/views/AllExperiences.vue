<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <div class="mt-4 pa-4 mx-auto">
          <v-select clearable chips label="地區" class="py-4"
            :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']" multiple variant="outlined" />
          <Tabs v-model="tabsName" :values="tabValues" />
        </div>
        <TabWindow v-model="tabsName" :values="tabValues">
          <template v-slot:view>
            <div v-for="experience in experiences" class="pa-4 mx-auto mb-5">
              <Experience :experience="experience" />
            </div>
          </template>
        </TabWindow>
      </v-col>
    </v-row>
    <v-btn icon="mdi-plus" size="x-large" class="suspend-button" color="grey-lighten-3"
      @click="openAddExperienceDialog()"> </v-btn>
    <ExperienceDialog :user="{ name: '劉賊賊', id: 1 }" />

  </v-container>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import Experience from '@/components/Experience.vue'
import Tabs from '@/components/Tabs.vue'
import TabWindow from '@/components/TabWindow.vue'
import { useDialogStore } from '@/stores/dialog'
import ExperienceDialog from '@/components/ExperienceDialog.vue'

import moment from 'moment'
import 'moment/dist/locale/zh-tw'
moment.locales();
const tabValues = [{ id: "hot", description: "熱門分享" }, { id: "new", description: "最新分享" }]
const tabsName = ref("experienceTab")
const experiences = [
  {
    "id": 1,
    "company": "鼎新",
    "position": "開發工程師",
    "interview_date": "2023/06/30",
    "interview_sharing": "巴拉巴拉xxxxx巴拉巴拉xxxxx巴拉巴拉xxxxx巴拉巴拉xxxxx巴拉巴拉xxxxx巴拉巴拉xxxxx",
    "interview_result": "已錄取",
    "interview_difficulty": 1,
    "interview_question": ["為何選擇我們公司"],
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
    "interview_question": ["為何選擇我們公司"],
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
    "interview_question": ["為何選擇我們公司"],
    "created_at": "2023-07-24T13:18:05.000000Z",
    "updated_at": "2023-07-24T13:18:05.000000Z",
  },
]
const dialogStore = useDialogStore()


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
const openAddExperienceDialog = () => {
  dialogStore.changeDialogStatus()
  dialogStore.setDialogContent("分享面試心得", "發布", 1)
}
</script>
<style scoped>
.suspend-button {
  position: fixed;
  bottom: 70px;
  right: 70px;

}
</style>

