<template>
  <v-container>
    <v-row justify="space-between">
      <v-col cols="2">
        <v-sheet rounded="lg" width="100%" class="pa-4 text-center mx-auto">
          <v-list :items="items"></v-list>
        </v-sheet>
      </v-col>
      <v-col cols="6">
        <div class="d-flex flex-row align-center my-4">
          <v-avatar color="brown" class="mr-4">
            <span class="text-h5">{{ user.initials }}</span>
          </v-avatar>
          <v-responsive max-width="800">
            <v-text-field label="在想些什麼呢" variant="solo" single-line density="compact" hide-details="auto"
              @click="isDialog = true" />
          </v-responsive>
          <v-dialog v-model="isDialog" width="50%">
            <v-sheet rounded="lg" class="pa-5 text-center ">
              <div class="ma-5">

              <v-row justify="end" no-gutters class="flex-row align-center">
                <v-col>
                  <v-spacer />
                </v-col>
                <v-col>
                  <div class="text-h5">新增討論</div>
                </v-col>
                <v-col class="text-right">
                  <v-btn variant="plain" icon="mdi-close-circle-outline" size="x-large" @click="isDialog = false"></v-btn>
                </v-col>
              </v-row>
              <v-divider class="mt-3 mb-5"></v-divider>
              <div class="d-flex flex-row align-center my-4">
                <v-avatar color="brown" class="mr-4">
                  <span class="text-h5">aa</span>
                </v-avatar>
                <div class="text-h5">劉賊賊</div>
              </div>
              <v-textarea clearable label="討論" variant="outlined" rows="10"></v-textarea>
              <v-btn color="primary" width="100%" @click="isDialog = false">
                <div class="text-h5">發布</div>
              </v-btn>
            </div>
            </v-sheet>
          </v-dialog>
        </div>

        <v-tabs v-model="discussionTab">
          <v-tab value="hot">
            熱門討論
          </v-tab>
          <v-tab value="new">
            最新討論
          </v-tab>
        </v-tabs>
        <v-window v-model="discussionTab">
          <v-window-item key="hot" value="hot">
            <Discussion v-for="discussion in discussions" :discussions="discussion" />
          </v-window-item>
          <v-window-item key="new" value="new">
            <Discussion v-for="discussion in discussions" :discussions="discussion" />
          </v-window-item>
        </v-window>
      </v-col>
      <v-col cols="2" >
        <v-sheet rounded="lg" width="100%" class="pa-4  mx-auto flex-wrap flex-row">
          <div class="text-h5 text-center mb-3">熱門關鍵字</div>
          <v-sheet v-for="keyword in keywords" :key="keyword">
            <v-btn prepend-icon="mdi-pound" variant="text">
              {{ keyword }}
            </v-btn>
          </v-sheet>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import Discussion from '@/components/Discussion.vue';

const user = {
  initials: 'JD',
  fullName: 'John Doe',
  email: 'john.doe@doe.com',
}
const items = [
  {
    title: '金融業',
    value: 1,
  },
  {
    title: '科技業',
    value: 2,
  },
  {
    title: '補教業',
    value: 3,
  },
  {
    title: '公職',
    value: 3,
  },
]
const discussions = [
  {
    title: '成功找到工作啦',
    content: 'fgdgdgdgdgdgdfgdgeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeesdfsdfsdfsdfsdf',
  },
  {
    title: '成功找到工作啦',
    content: 'fgdgdgdgdgdgdfgdgeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeesdfsdfsdfsdfsdf',
  },
  {
    title: '成功找到工作啦',
    content: 'fgdgdgdgdgdgdfgdgeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeesdfsdfsdfsdfsdf',
  },
  {
    title: '成功找到工作啦',
    content: 'fgdgdgdgdgdgdfgdgeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeesdfsdfsdfsdfsdf',
  },
]
const keywords = ["fdsf", "dgfg", "rhtr", "fdsf", "dgfg", "rhtr", "fdsf", "dgfg", "rhtr", "fdsf",
  "dgfg", "rhtr", "fdsf", "dgfg", "rhtr", "fdsf", "dgfg", "rhtr",
  "fdsf", "dgfg", "rhtr", "fdsf", "dgfg", "rhtr",]
const discussionTab = ref("hot")
const isDialog = ref(false)
console.log(isDialog.value)
</script>
