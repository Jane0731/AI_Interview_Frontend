<template>
  <v-app-bar color="primary" scroll-behavior="elevate">
    <v-toolbar-title>面試去好卡</v-toolbar-title>
    <v-responsive max-width="400">
      <v-text-field label="搜尋"  variant="solo" single-line density="compact" hide-details="auto" prepend-inner-icon="mdi-magnify">
      </v-text-field>
    </v-responsive>
    <v-spacer></v-spacer>
    <v-btn variant="text" icon="mdi-bell"></v-btn>
    <v-btn variant="text" icon="mdi-bell">
      <v-avatar color="brown">
        <span class="text-h5">aa</span>
      </v-avatar>
    </v-btn>
  </v-app-bar>
</template>