<template>
    <div width="100%" class="mx-auto py-2">
        <div class="text-h5 text-center pb-1">討論類別</div>
        <hr>

        <div v-for="item in items" :key="item.id">
            <v-btn @click="getCategory(item.id)" class="justify-start" width="100%"
                variant="text">
                {{ item.name }}
            </v-btn>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch, defineEmits } from 'vue'
import { useDiscussionStore } from '@/stores/discussion'

import { useCategorysStore } from '@/stores/category'
const categoryStore = useCategorysStore()
const isLoading = ref(true)
const discussionStore = useDiscussionStore()
const emit = defineEmits(['refresh'])
const selectedItem = ref(null)
const items = ref('')
const category = ref([])
onMounted(async () => {
    await categoryStore.getCategorys()
    items.value = categoryStore.categorys.slice(1, categoryStore.categorys.length);
    isLoading.value = false
    category.value = items.value[0]
})
const getCategory = (id) => {
    discussionStore.setCategory(id)
    emit('refresh')
}
</script>