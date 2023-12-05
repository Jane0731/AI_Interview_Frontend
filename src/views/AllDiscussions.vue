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
  <v-container v-if="!isLoading" class="mt-3">

    <v-row justify="space-between">
      <v-col cols="2">
        <Classification @refresh="refresh" />
      </v-col>
      <v-col cols="7">
        <div class="d-flex flex-row align-center px-4">
          <v-avatar v-if="userStore?.user?.name" color="brown" class="mr-4">
            <span class="text-h5">{{ userStore.user.name?.substr(0, 2) }}</span>
          </v-avatar>
          <v-avatar v-else icon="mdi-account" color="white" class="mr-4">
          </v-avatar>
          <v-responsive @click="authStore.isAuthorized ? openAddDiscussionDialog() : isShowDialog = true">
            <v-text-field label="在想些什麼呢" variant="solo" single-line density="compact" hide-details="auto" readonly="" />
          </v-responsive>
        </div>

        <v-tabs v-model="tab">
          <v-tab v-for="value in tabValues" :value="value.id">
            {{ value.description }}
          </v-tab>
        </v-tabs>
        <v-window v-model="tab" class="bg-white">
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

      </v-col>
      <v-col cols="2">
        <Keywords @refresh="refresh" />
      </v-col>
    </v-row>
  </v-container>
  <DiscussionDialog :user="{ name: userStore.user.name, id: userStore.user.id }" />
  <v-dialog v-model="isShowDialog" max-width="600px" height="400px">
    <v-card>
      <v-card-text class="text-h5">
        請先登入才可發布討論
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="isShowDialog = false">關閉</v-btn>
        <v-btn color="primary" @click="login">前往登入</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
import { useRouter, useRoute } from 'vue-router'

import DiscussionDialog from '@/components/DiscussionDialog.vue'
const isShowDialog = ref(false)
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
const refresh = async (search) => {
  await discussionStore.getAllDiscussions(search)
}
onMounted(async () => {
  await discussionStore.getAllDiscussions()
  isLoading.value = false
})
const openAddDiscussionDialog = () => {
  dialogStore.changeDialogStatus()
  dialogStore.setDialogContent("新增討論", "發布", 1)
}

const currentRoute = useRoute();
const router = useRouter()
const login = () => {
  router.push({
    name: 'Login',
    query: {
      redirect: currentRoute.fullPath
    }
  })
}
</script>
