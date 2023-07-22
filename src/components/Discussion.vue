<template>
    <v-sheet rounded="lg" width="100%" class="pa-4 mx-auto my-5" @click="onDiscussionClick(discussions.id)">
        <div class="d-flex flex-row align-center ma-2 pa-2">
            <v-sheet>
                <v-avatar color="brown">
                    <span class="text-h5">aa</span>
                </v-avatar>
            </v-sheet>
            <v-sheet class="ml-2 mr-4">
                <div class="text-body-1">文章分類</div>
            </v-sheet>
            <v-sheet>
                <div class="text-body-2">2小時前</div>
            </v-sheet>
        </div>
        <div class="text-h6 ma-2 pa-2">
            <v-sheet>
                {{ discussions.title }}
            </v-sheet>
        </div>
        <div class="text-body-2 ma-2 pa-2">
            <v-sheet>
                {{ discussions.content }}
            </v-sheet>
        </div>
        <div class="d-flex flex-row align-center ma-2 pa-2">
            <v-sheet v-for="operateIcon in operateIcons" :key="operateIcon.id">
                <v-btn :prepend-icon="operateIcon.iconName" variant="text">
                    <template v-slot:prepend>
                        <v-icon :color="operateIcon.iconColor"></v-icon>
                    </template>
                    100
                </v-btn>
            </v-sheet>
        </div>
    </v-sheet>
</template>
<script setup>
import { defineProps } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const props = defineProps({
    discussions: { type: Object  },
})
const operateIcons=[
    {
        id:1,
        iconName:"mdi-heart",
        iconColor:"error"
    },
    {
        id:2,
        iconName:"mdi-comment",
        iconColor:"primary"
    },
    {
        id:3,
        iconName:"mdi-bookmark",
        iconColor:"warning"
    },
]

const onDiscussionClick = (id) => {
  router.push({
    name: 'Discussion',
    params: { id } 
  })
}
</script>
