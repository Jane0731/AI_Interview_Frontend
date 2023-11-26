<template>
  <v-container fluid v-if="isLoading" style="height: 100%;">
    <v-row align="center" justify="center" style="height: 100%;">
      <v-col cols="auto">
        <div>
          <fade-loader loading="true" color="grey"></fade-loader>
        </div>
      </v-col>
    </v-row>
  </v-container>
  <v-container>

    <v-row justify="space-between">

      <v-col cols="2">
        <Classification />
      </v-col>
      <v-col cols="7">
        <div class="d-flex flex-row align-center my-4">
          <v-avatar color="brown" class="mr-4">
            <span class="text-h5">{{ userStore.user.name }}</span>
          </v-avatar>
          <v-responsive max-width="800" @click="authStore.isAuthorized ? openAddDiscussionDialog() : openLoginDialog()">
            <v-text-field label="在想些什麼呢" variant="solo" single-line density="compact" hide-details="auto" readonly="" />
          </v-responsive>
        </div>

        <v-tabs v-model="tab">
          <v-tab v-for="value in tabValues" :value="value.id">
            {{ value.description }}
          </v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item value="hot">
            <div v-for="discussion in discussionStore.popularDiscussions" class="pa-4 mx-auto my-5">
              <Discussion :discussion="discussion" @fresh="onFresh()" :key="renderKey" />
            </div>
          </v-window-item>
          <v-window-item value="new">
            <div v-for="discussion in discussionStore.newDiscussions" class="pa-4 mx-auto my-5">
              <Discussion :discussion="discussion" @fresh="onFresh()" :key="renderKey" />
            </div>
          </v-window-item>
        </v-window>
        <DiscussionDialog :user="{ name: userStore.user.name, id: userStore.user.id }" />
        <LoginDialog content="請先登入才可發布討論" />

      </v-col>
      <v-col cols="2">


        <Keywords />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Discussion from '@/components/Discussion.vue'
import Keywords from '@/components/Keywords.vue'
import Classification from '@/components/Classification.vue'
import { useDiscussionStore } from '@/stores/discussion'
import { useDialogStore } from '@/stores/dialog'
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'
import FadeLoader from 'vue-spinner/src/FadeLoader.vue'
import LoginDialog from '@/components/LoginDialog.vue'

import DiscussionDialog from '@/components/DiscussionDialog.vue'
const authStore = useAuthStore()
const userStore = useUserStore()
const discussionStore = useDiscussionStore()
const dialogStore = useDialogStore()
const tabValues = [{ id: "hot", description: "熱門討論" }, { id: "new", description: "最新討論" }]
const renderKey = ref(0);
const tab = ref("hot")
const isLoading = ref(true)
const onFresh = async () => {
  renderKey.value += 1;
  await discussionStore.getAllDiscussions()

};
onMounted(async () => {
  await discussionStore.getAllDiscussions()
  isLoading.value = false
})

const openAddDiscussionDialog = () => {
  dialogStore.changeDialogStatus()
  dialogStore.setDialogContent("新增討論", "發布", 1)
}
const openLoginDialog = () => {
  dialogStore.changeLoginDialogStatus()
}
</script>
