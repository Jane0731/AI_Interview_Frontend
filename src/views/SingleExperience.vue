<template>
    <v-container>
        <v-row justify="space-between">
            <v-col cols="2">
                <v-spacer></v-spacer>
            </v-col>
            <v-col cols="6">
                <Experience :experience="experience" :isSingleExperience="true"/>
            </v-col>
            <v-col cols="2">
                <Keywords />
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script setup>
import { ref, onMounted, reactive } from 'vue';
import Experience from '@/components/Experience.vue'
import { useRouter, useRoute } from 'vue-router'
import moment from 'moment'
import 'moment/dist/locale/zh-tw'
moment.locales();
import { useExperienceStore } from '@/stores/experience'
import { useCommentStore } from '@/stores/comment';
const experienceStore = useExperienceStore()
const commentStore = useCommentStore()

const experience = experienceStore.experience
const route = useRoute()

const comments = commentStore.comments
onMounted(async() => {
  await experienceStore.getExperience(route.params.id)
  await commentStore.getComment(route.params.id)

})
</script>
<style>
.comment-block {
    background-color: #FCFBFB;
    height: 50px;
    position: sticky;
    bottom: 0;
    border-top: 2px #DED9D9 solid
}

.addcomment-block {
    background-color: #FCFBFB;
    height: fit-content;
    position: sticky;
    bottom: 0;
    border-top: 2px #DED9D9 solid
}

.discussion-block {
    min-height: calc(100vh - 150px)
}
</style>

  