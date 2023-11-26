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
  <v-container v-else>

    <v-row justify="center">
      <v-col cols="8">
        <div class="mt-4 pa-4 mx-auto">
          <v-select clearable chips label="地區" class="py-4"
            :items="cityOptions" multiple variant="outlined" v-model="city"/>
          <v-tabs v-model="tab">
            <v-tab v-for="value in tabValues" :value="value.id">
              {{ value.description }}
            </v-tab>
          </v-tabs>
        </div>
        <v-window v-model="tab">
          <v-window-item value="hot">
            <div v-for="experience in experienceStore.popularExperiences"
              class="window-item pa-4 mx-auto my-5 rounded-lg ">
              <Experience :experience="experience" />
            </div>
          </v-window-item>
          <v-window-item value="new">
            <div v-for="experience in experienceStore.newExperiences" class="window-item pa-4 mx-auto my-5 rounded-lg">
              <Experience :experience="experience" />
            </div>
          </v-window-item>
        </v-window>
      </v-col>
      <Alert />

    </v-row>

    <v-btn icon="mdi-plus" size="x-large" class="suspend-button" color="grey-lighten-3"
      @click="authStore.isAuthorized ? openAddExperienceDialog() : isShowDialog = true"> </v-btn>
    <ExperienceDialog />
    <v-dialog v-model="isShowDialog" width="50%">
          <v-card>
            <v-card-text class="text-h5">
              請先登入才可發布面試分享
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="isShowDialog=false">關閉</v-btn>
              <v-btn color="primary" @click="login">前往登入</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
  </v-container>
</template>

<script setup>
import FadeLoader from 'vue-spinner/src/FadeLoader.vue'

import { ref, watch, onMounted } from 'vue'
import Experience from '@/components/Experience.vue'
import { useDialogStore } from '@/stores/dialog'
import ExperienceDialog from '@/components/ExperienceDialog.vue'
import { useExperienceStore } from '@/stores/experience'
import Alert from '@/components/Alert.vue'
import axios from "@/api/axios.config";
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
const city=ref([])
const tab = ref("hot")
const cityOptions=ref([])
const tabValues = [{ id: "hot", description: "熱門分享" }, { id: "new", description: "最新分享" }]
const isLoading = ref(true)
const dialogStore = useDialogStore()
const experienceStore = useExperienceStore()
const isShowDialog = ref(false)
const authStore = useAuthStore()

watch(city,async(newValue)=>{
  const city=newValue.join(',')
  await experienceStore.getAllExperiences(city)

})
onMounted(async () => {

  await axios
    .get("/city-options")
    .then(async (response) => {
      cityOptions.value=response.data
    })
    .catch((error) => {
      console.log(error)
      // resultStore.error(error.response.data.message)
    });

  await experienceStore.getAllExperiences()
  isLoading.value = false
})

const openAddExperienceDialog = () => {
  dialogStore.changeDialogStatus()
  dialogStore.setDialogContent("分享面試心得", "發布", 1)
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
<style scoped>
.suspend-button {
  position: fixed;
  bottom: 70px;
  right: 70px;

}
</style>

