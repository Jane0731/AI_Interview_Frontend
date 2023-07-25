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
                    <v-btn variant="plain" icon="mdi-close-circle-outline" size="x-large"
                      @click="isDialog = false"></v-btn>
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
            <div v-for="discussion in discussions" class="pa-4 mx-auto my-5">
              <Discussion :discussion="discussion" />
            </div>
          </v-window-item>
          <v-window-item key="new" value="new">
            <div v-for="discussion in discussions" class="pa-4 mx-auto my-5">
              <Discussion :discussion="discussion" />
            </div>
          </v-window-item>
        </v-window>
      </v-col>
      <v-col cols="2">
        <Keywords />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import Discussion from '@/components/Discussion.vue'
import Keywords from '@/components/Keywords.vue'
import Classification from '@/components/Classification.vue'
import axios from "@/axios.config";
import moment from 'moment'
import 'moment/dist/locale/zh-tw'
moment.locales();

const discussions = reactive([])
const discussionTab = ref("hot")
const isDialog = ref(false)

onMounted(() => {
  axios
    .get("discussion")
    .then((response) => {
      response.data.forEach((discussion) => {
        discussion.created_at=moment(discussion.created_at).fromNow()
      })
      Object.assign(discussions, response.data);

    })
    .catch((error) => {
      console.log(error)
    });
})
</script>
