<template>
  <v-app-bar color="primary" scroll-behavior="elevate">
    <v-toolbar-title>面試去好卡</v-toolbar-title>
    <v-responsive max-width="400">
      <v-text-field label="搜尋" variant="solo" single-line density="compact" hide-details="auto"
        prepend-inner-icon="mdi-magnify">
      </v-text-field>
    </v-responsive>
    <v-spacer></v-spacer>
    <div class="mr-5">
      <v-btn variant="text" icon="mdi-bell"></v-btn>

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" v-bind="props">
            <v-avatar color="brown">
              <div class="text-h5">aa</div>
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
    </div>

  </v-app-bar>
</template>
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const onProfileClick = (id) => {
    router.push({
        name: 'profile',
    })
}
const logout=()=>{

}
</script>