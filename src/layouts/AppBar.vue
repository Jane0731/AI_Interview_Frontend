<template>
  <v-app-bar color="primary" scroll-behavior="elevate">
    <v-app-bar-title class="text-h5 ">面試去好卡</v-app-bar-title>
    <!-- <v-responsive max-width="600">
      <v-text-field label="搜尋" variant="solo" single-line density="compact" hide-details="auto"
        prepend-inner-icon="mdi-magnify">
      </v-text-field>
    </v-responsive> -->
    <v-spacer></v-spacer>
    <v-btn variant="text" class="text-h6 mx-4" @click="onDiscussionsClick">討論版</v-btn>
    <v-btn variant="text" class="text-h6 mx-4" @click="onExperiencesClick">面試分享</v-btn>
    <v-btn variant="text" class="text-h6 mx-4" @click="onInterviewClick">模擬面試</v-btn>

    <v-btn variant="text" icon="mdi-bell"></v-btn>

    <div class="mx-5">
      <v-menu v-if="authStore.isAuthorized">
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" v-bind="props">
            <v-avatar color="brown">
              <div class="text-h5">{{ userStore?.user?.name}}</div>
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item class="ma-2" @click="onProfileClick">
            <v-list-item-title>
              <div class="text-h6">個人資訊</div>
            </v-list-item-title>
          </v-list-item>
          <v-list-item class="ma-2" @click="logout">
            <v-list-item-title>
              <div class="text-h6">登出</div>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn icon="mdi-account" v-else variant="text" @click="login">
      </v-btn>
    </div>

  </v-app-bar>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { onActivated, ref, inject } from 'vue';
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue';
const userStore = useUserStore()
const authStore = useAuthStore()
const router = useRouter()
const reload = inject("reload")

const onDiscussionsClick = () => {
  router.push({
    name: 'AllDiscussions',
  })
}
const onExperiencesClick = () => {
  router.push({
    name: 'AllExperiences',
  })
}
const onInterviewClick = () => {
  router.push({
    name: 'Interview',
  })
}
const onProfileClick = (id) => {
  router.push({
    name: 'Profile',
  })
}
const logout = async () => {

  await authStore.logout()
  reload()
  router.push({
    name: 'Login',
  })

}
const login = () => {
  router.push({
    name: 'Login',
  })

}
</script>