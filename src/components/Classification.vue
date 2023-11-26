<template>
    <v-sheet rounded="lg" width="100%" class="my-4 text-center mx-auto class-width">
        <div class="text-h5 text-center mb-3">討論類別</div>
        <v-list :items="items" item-title="name" item-value="id" v-model:selected="category">
            
        </v-list>
    </v-sheet>
</template>
<script setup>
import { ref, onMounted, watch, defineEmits } from 'vue'
import FadeLoader from 'vue-spinner/src/FadeLoader.vue'
import { useDiscussionStore } from '@/stores/discussion'

import { useCategorysStore } from '@/stores/category'
const categoryStore = useCategorysStore()
const isLoading = ref(true)
const discussionStore = useDiscussionStore()
const emit = defineEmits(['refresh'])
const selectedItem=ref(null)
const items = ref('')
const category = ref([])
onMounted(async () => {
    await categoryStore.getCategorys()
    items.value = categoryStore.categorys.slice(1, categoryStore.categorys.length);
    isLoading.value = false
    category.value=items.value[0]
})
watch(category, (newValue) => {
    if (newValue[0] == '全部類別')
        discussionStore.setCategory('')
    else
        discussionStore.setCategory(newValue[0])
    emit('refresh')

})
</script>
<style>
.class-width {
    height: calc(100vh - 136px)
}
</style>