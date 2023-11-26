<template>
    <v-dialog v-model="dialogStore.dialogStatus" width="50%" v-if="!isLoading">
        <v-sheet rounded="lg" class="py-5 px-15 text-center ">
            <div class="ma-5">
                <v-row justify="end" no-gutters class="flex-row align-center">
                    <v-col>
                        <v-spacer />
                    </v-col>
                    <v-col>
                        <div class="text-h5">{{ dialogContent.title }}</div>
                    </v-col>
                    <v-col class="text-right">
                        <v-btn variant="plain" icon="mdi-close-circle-outline" size="x-large" @click="close()"></v-btn>
                    </v-col>
                </v-row>
                <v-divider class="mt-3 mb-5"></v-divider>
                <v-form v-model="form">

                    <div class="d-flex align-center my-4 justify-space-between">
                        <v-sheet class="d-flex flex-row align-center">
                            <v-avatar color="brown" class="mr-4">
                                <div class="text-h5">{{ user.name }}</div>
                            </v-avatar>
                            <div class="text-h5">{{ user.name }}</div>
                        </v-sheet>

                        <v-sheet width="25%" class="ml-2 justify-end">
                            <v-select :rules="[rules.required]" v-model="category" :items="items" item-value="id"
                                item-title="name" placeholder="討論類別" variant="outlined"></v-select>
                        </v-sheet>

                    </div>
                    <div class="mx-2">
                        <v-text-field :rules="[rules.required]" v-model="title" density="compact" placeholder="標題"
                            color="primary" variant="plain"></v-text-field>
                        <v-textarea :rules="[rules.required]" v-model="content" variant="plain" rows="6"
                            :placeholder="discussion.content ? discussion.content : '內文'"></v-textarea>
                        <v-combobox v-model="tags" :items="keywords" item-value="id" item-title="name" chips clearable
                            label="關鍵字" multiple variant="plain">
                            <template v-slot:selection="{ attrs, item, select, selected }">
                                <v-chip v-bind="attrs" :model-value="selected" closable @click="select"
                                    @click:close="remove(item)">
                                    <strong>{{ item }}</strong>&nbsp;
                                    <span>(interest)</span>
                                </v-chip>
                            </template>
                        </v-combobox>
                        <v-btn :disabled="!form" color="primary" width="100%" @click.stop="onSubmit(discussion.id)"
                            :loading="loading">
                            <div class="text-h5 ">{{ dialogContent.submit }}</div>
                        </v-btn>
                    </div>
                </v-form>


            </div>
        </v-sheet>
    </v-dialog>
</template>
<script setup>
import FadeLoader from 'vue-spinner/src/FadeLoader.vue'
import axios from "@/api/axios.config";

import { useDialogStore } from '@/stores/dialog'
import { useDiscussionStore } from '@/stores/discussion'
import { useCategorysStore } from '@/stores/category';
import { ref, defineProps, onMounted, watch } from 'vue';
const props = defineProps({
    user: { type: Object },
    discussion: { type: Object, default: "" }
})
const keywords = ref([])
const items = ref([])

onMounted(async () => {
    await axios
        .get("/discussion/popular-tag")
        .then(async (response) => {
            keywords.value = response.data
        })
        .catch((error) => {
            console.log(error)
            // resultStore.error(error.response.data.message)
        });
    await categoryStore.getCategorys()
    items.value = categoryStore.categorys.slice(1, categoryStore.categorys.length);
    isLoading.value = false
})
const isLoading = ref(true)
const discussionStore = useDiscussionStore()
const categoryStore = useCategorysStore()

const dialogStore = useDialogStore()
const dialogContent = dialogStore.dialogContent
const title = ref(props.discussion.title)
const content = ref(props.discussion.content)
const category = ref(props.discussion.category_id)
const tags = ref(props.discussion.tags)
const form = ref(false)
const loading = ref(false)

const rules = {
    required: value => !!value,
}


const onSubmit = async (discussionId) => {
    console.log(tags.value)
    const tag = tags.value.map(item => {
        if (item.name)
            return item.name
        else
            return item
    })

    if (!form.value) return
    loading.value = true
    if (dialogContent.id == 1) {
        await discussionStore.createDiscussion(title.value, content.value, category.value, tag)
    }
    else {
        await discussionStore.updateDiscussion(title.value, content.value, category.value, tag, discussionId)
    }
    loading.value = false
    dialogStore.changeDialogStatus()
}
const remove = (item) => {
    tags.value.splice(tags.value.indexOf(item), 1)
}
const close = () => {
    dialogStore.changeDialogStatus();
}


</script>
<style scoped></style>