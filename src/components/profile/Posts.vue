<template>
    <v-card width="100%">
        <v-sheet width="100%" color="primary" height="120" class="d-flex align-center justify-center pa-10">
            <div class="text-h4">我的發文</div>
        </v-sheet>
        <v-card-text class="overflow-auto cardtext-width">
            <v-tabs v-model="tab" grow>
                <v-tab value="discussion">
                    <div class="text-h6">討論</div>
                </v-tab>
                <v-tab value="experience">
                    <div class="text-h6">面試分享</div>
                </v-tab>
            </v-tabs>
            <v-window v-model="tab">
                <v-window-item value="discussion">
                    <div v-for="discussion in userStore.discussionPosts"
                        class="window-item pa-4 mx-auto my-5 rounded-lg w-75">
                        <Discussion :discussion="discussion" />
                    </div>
                </v-window-item>
                <v-window-item value="experience">
                    <div v-for="experience in userStore.experiencePosts"
                        class="window-item pa-4 mx-auto my-5 rounded-lg w-75">
                        <Experience :experience="experience" />
                    </div>
                </v-window-item>
            </v-window>
        </v-card-text>

    </v-card>
</template>
<script setup>
import { ref, onBeforeMount } from 'vue';
import Discussion from '@/components/Discussion.vue'
import Experience from '@/components/Experience.vue'
import { useUserStore } from '@/stores/user';
const userStore = useUserStore()
onBeforeMount(async () => {
    await userStore.getDiscussionPost()
    console.log(userStore.discussionPosts)
    await userStore.getExperiencePost()
    console.log(userStore.experiencePosts)

})
const tab = ref("discussion")
</script>
<style scoped>
.cardtext-width {
    height: calc(100vh - 256px)
}

.window-item {
    border: 1px #C8C8C8 solid
}
</style>
