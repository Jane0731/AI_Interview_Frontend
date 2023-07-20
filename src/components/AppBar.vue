<template>
  <v-layout>

    <v-app-bar color="primary" scroll-behavior="elevate">
      <v-toolbar-title>面試去好卡</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn variant="text" icon="mdi-bell"></v-btn>
      <v-btn variant="text" icon="mdi-bell">
        <v-avatar color="brown">
          <span class="text-h5">{{ user.initials }}</span>
        </v-avatar>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer>
      <v-card>
        <v-list :items="items"></v-list>
      </v-card>

    </v-navigation-drawer>
    <v-navigation-drawer location="right" >
      <v-card>
        <v-list :items="items"></v-list>
      </v-card>

    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      Main Content
    </v-main>
  </v-layout>
</template>

<script setup>
const user = {
  initials: 'JD',
  fullName: 'John Doe',
  email: 'john.doe@doe.com',
}
const items = [
  {
    title: 'Item #1',
    value: 1,
  },
  {
    title: 'Item #2',
    value: 2,
  },
  {
    title: 'Item #3',
    value: 3,
  },
]
</script>
