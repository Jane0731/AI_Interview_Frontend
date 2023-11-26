<template>
    <v-dialog v-model="dialogStore.loginDialogStatus" width="auto">
        <v-card>
            <v-card-text class="text-h5">
                {{ content }}
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="close">關閉</v-btn>
                <v-btn color="primary" @click="login">前往登入</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { useDialogStore } from '@/stores/dialog'
import { useRouter, useRoute } from 'vue-router'
import { ref, defineProps, onMounted ,watch} from 'vue';
const props = defineProps({
    content: { type: String },
})
const dialogStore = useDialogStore()
const currentRoute = useRoute();
const router=useRouter()
const close = () => {
    dialogStore.changeLoginDialogStatus();
}
const login = () => {
  router.push({
    name: 'Login',
    query: {
      redirect: currentRoute.fullPath
    }
  })
}
</script>