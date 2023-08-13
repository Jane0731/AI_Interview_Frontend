<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
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
      <Alert />

    </v-row>

    <v-btn icon="mdi-plus" size="x-large" class="suspend-button" color="grey-lighten-3"
      @click="openAddExperienceDialog()"> </v-btn>
    <ExperienceDialog />

  </v-container>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import Experience from '@/components/Experience.vue'
import Tabs from '@/components/Tabs.vue'
import TabWindow from '@/components/TabWindow.vue'
import { useDialogStore } from '@/stores/dialog'
import ExperienceDialog from '@/components/ExperienceDialog.vue'
import { useExperienceStore } from '@/stores/experience'
import Alert from '@/components/Alert.vue'

const tabValues = [{ id: "hot", description: "熱門分享" }, { id: "new", description: "最新分享" }]
const tabsName = ref("experienceTab")

const dialogStore = useDialogStore()
const experienceStore=useExperienceStore()

const experiences = experienceStore.experiences


onMounted(async() => {
  await experienceStore.getAllExperiences()
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

