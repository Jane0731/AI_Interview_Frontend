<template>
  <v-container>

    <v-row justify="space-between">

      <v-col cols="2">
        <Classification />
      </v-col>
      <v-col cols="6">
        <div class="d-flex flex-row align-center my-4">
          <v-avatar color="brown" class="mr-4">
            <span class="text-h5">aa</span>
          </v-avatar>
          <v-responsive max-width="800" @click="openAddDiscussionDialog()">
            <v-text-field label="在想些什麼呢" variant="solo" single-line density="compact" hide-details="auto" readonly="" />
          </v-responsive>
        </div>
        <Tabs v-model="tabsName" :values="tabValues" />
        <TabWindow v-model="tabsName" :values="tabValues">
          <template v-slot:view>
            <div v-for="discussion in discussions" class="pa-4 mx-auto my-5">
              <Discussion :discussion="discussion" />
            </div>
          </template>
        </TabWindow>
        <DiscussionDialog :user="{ name: '劉賊賊', id: 1 }" />

      </v-col>
      <v-col cols="2">
        <Alert />

        <Keywords />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Discussion from '@/components/Discussion.vue'
import Keywords from '@/components/Keywords.vue'
import Classification from '@/components/Classification.vue'
import { useDiscussionStore } from '@/stores/discussion'
import { useDialogStore } from '@/stores/dialog'

import Alert from '@/components/Alert.vue'

import Tabs from '@/components/Tabs.vue'
import TabWindow from '@/components/TabWindow.vue'
import DiscussionDialog from '@/components/DiscussionDialog.vue'

const discussionStore = useDiscussionStore()
const dialogStore = useDialogStore()

const discussions = discussionStore.discussions

const tabValues = [{ id: "hot", description: "熱門討論" }, { id: "new", description: "最新討論" }]
const tabsName = ref("discussionTab")



onMounted(async () => {
  await discussionStore.getAllDiscussions()
})



const openAddDiscussionDialog = () => {
  dialogStore.changeDialogStatus()
  dialogStore.setDialogContent("新增討論", "發布", 1)
}
</script>
