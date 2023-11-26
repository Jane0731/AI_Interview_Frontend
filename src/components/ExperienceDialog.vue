<template>
    <v-dialog v-model="dialogStore.dialogStatus" width="50%">
        <v-sheet rounded="lg" class="py-5 px-15 text-center " height="780">
            <div class="ma-5">
                <v-row justify="end" no-gutters class="flex-row align-center">
                    <v-col>
                        <v-spacer />
                    </v-col>
                    <v-col>
                        <div class="text-h5">{{ dialogContent.title }}</div>
                    </v-col>
                    <v-col class="text-right">
                        <v-btn variant="plain" icon="mdi-close-circle-outline" size="x-large"
                            @click="dialogStore.changeDialogStatus()"></v-btn>
                    </v-col>
                </v-row>
                <v-divider class="mt-3 mb-5"></v-divider>
                <v-form v-model="form" class="text-left">
                    <div v-if="stepOne">
                        <div class="text-body-1">您面試的公司名稱</div>
                        <v-text-field validate-on="input" class="mb-2" :rules="[rules.required]" v-model="company"
                            :placeholder="experience.company ? experience.company : '公司名稱'"
                            variant="underlined"></v-text-field>
                        <div class="text-body-1">您面試的公司所在地區</div>
                        <v-select v-model="city" :items="cityOptions"
                            :placeholder="experience.city ? experience.city : '公司所在地區'" variant="underlined"></v-select>
                        <!-- <v-text-field validate-on="input" class="mb-2" :rules="[rules.required]" 
                             variant="underlined"></v-text-field> -->

                        <div class="text-body-1">您面試的職位名稱</div>
                        <v-text-field class="mb-2" :rules="[rules.required]" v-model="position"
                            :placeholder="experience.position ? experience.position : '職位名稱'"
                            variant="underlined"></v-text-field>

                        <div class="text-body-1">您面試的日期</div>
                        <v-text-field class="mb-2" type="date" variant="underlined" :rules="[rules.required]" v-model="date"
                            :placeholder="experience.date ? experience.date : '面試日期'"></v-text-field>

                        <div class="text-body-1">您面試的難度</div>
                        <v-item-group mandatory v-model="difficulty" class="my-3">
                            <v-input :rules="[rules.required]" variant="plain" v-model="difficulty">

                                <v-row>
                                    <v-col v-for="interviewDifficulty in interviewDifficultys"
                                        :key="interviewDifficulty.value" cols="12" md="2">
                                        <v-item v-slot="{ isSelected, toggle }" :value="interviewDifficulty.value">
                                            <v-card :color="isSelected ? 'primary' : '#E7E7E7'" class="d-flex align-center"
                                                dark height="35" @click="toggle">
                                                <v-scroll-y-transition>
                                                    <div class="flex-grow-1 text-center text-align-center">
                                                        {{ interviewDifficulty.name }}
                                                    </div>
                                                </v-scroll-y-transition>
                                            </v-card>
                                        </v-item>
                                    </v-col>
                                </v-row>
                            </v-input>

                        </v-item-group>
                        <div class="text-body-1">您面試的結果</div>
                        <v-item-group mandatory v-model="result" class="my-3">
                            <v-input :rules="[rules.required]" variant="plain" v-model="result">

                                <v-row>
                                    <v-col v-for="interviewResult in interviewResults" :key="interviewResult.value"
                                        cols="12" md="2">
                                        <v-item v-slot="{ isSelected, toggle }" :value="interviewResult.name">
                                            <v-card :color="isSelected ? 'primary' : '#E7E7E7'" class="d-flex align-center"
                                                dark height="35" @click="toggle">
                                                <v-scroll-y-transition>
                                                    <div class="flex-grow-1 text-center text-align-center">
                                                        {{ interviewResult.name }}
                                                    </div>
                                                </v-scroll-y-transition>
                                            </v-card>
                                        </v-item>
                                    </v-col>
                                </v-row>
                            </v-input>

                        </v-item-group>
                        <v-row>
                            <v-col class="text-right">
                                <v-btn color="primary" size="large" type="submit" @click="dialogChangePage(1)">
                                    <div class="text-h5">下一頁</div>
                                </v-btn>
                            </v-col>
                        </v-row>

                    </div>
                </v-form>

                <v-form v-model="form" class="text-left">

                    <div v-if="stepTwo">
                        <div class="text-body-1">您面試的過程分享</div>
                        <v-textarea class="my-3" :rules="[rules.required]" v-model="description" variant="underlined"
                            rows="6" placeholder="面試分享"></v-textarea>

                        <div class="text-body-1 mb-2">您面試的問題</div>
                        <div v-for="(question, id) in questions" :key="id">
                            <div class="text-body-2">問題{{ id + 1 }}</div>

                            <v-text-field :rules="[rules.required]" v-model="question.question"
                                :placeholder="question.question ? question.question : '面試問題'"
                                variant="underlined"></v-text-field>
                            <v-text-field class="my-2" hint="非必填" v-model="question.answer"
                                :placeholder="question.answer ? question.answer : '面試回答'"
                                variant="underlined"></v-text-field>
                        </div>
                        <div class="mb-5">
                            <v-btn @click="addQuestion()" variant="tonal">
                                <div class="text-h6">新增問答</div>
                            </v-btn>
                            <v-btn @click="removeQuestion()" class="mx-5" variant="tonal">
                                <div class="text-h6">刪除問答</div>
                            </v-btn>
                        </div>


                        <v-row justify="space-between" align="center">
                            <v-col>
                                <v-btn color="primary" size="large" @click="dialogChangePage()">
                                    <div class="text-h5">上一頁</div>
                                </v-btn>
                            </v-col>
                            <v-col class="text-right">
                                <v-btn color="primary" size="large" @click.prevent="onSubmit(experience.id)" type="submit">
                                    <div class="text-h5">送出</div>
                                </v-btn>
                            </v-col>
                        </v-row>

                    </div>

                </v-form>




            </div>
        </v-sheet>
    </v-dialog>
</template>
<script setup>
import axios from "@/api/axios.config";

import { useDialogStore } from '@/stores/dialog'
import { useExperienceStore } from '@/stores/experience'
import { ref, defineProps, reactive, onMounted } from 'vue';
const props = defineProps({
    experience: { type: Object, default: {} }
})
const cityOptions = ref([])

const experienceStore = useExperienceStore()

const date = ref(props.experience.date)
const dialogStore = useDialogStore()
const dialogContent = dialogStore.dialogContent
const company = ref(props.experience.company)
const city = ref(props.experience.city)
const position = ref(props.experience.position)
const difficulty = ref(props.experience.difficulty)
const interviewDifficultys = [{ name: "簡單", value: 1 }, { name: "普通", value: 2 }, { name: "困難", value: 3 }]
const result = ref(props.experience.result)
const interviewResults = [{ name: "未錄取", value: 1 }, { name: "已錄取", value: 2 }, { name: "等待中", value: 3 }]
const description = ref(props.experience.description)
const stepOne = ref(true)
const questions = props.experience.questions ? reactive(props.experience.questions) : reactive([{ question: "", answer: "" }])
const stepTwo = ref(false)
const dialogChangePage = (buttonId) => {
    if (buttonId == 1) {
        if (!form.value) return

    }

    stepOne.value = !stepOne.value
    stepTwo.value = !stepTwo.value
}
// watch(date,(value)=>console.log(value.getMonth()))

const form = ref(false)
const loading = ref(false)

const rules = {
    required: value => !!value || '欄位必填',
}


const onSubmit = async (experienceId) => {
    if (!form.value) return
    loading.value = true
    if (dialogContent.id == 1) {
        await experienceStore.createExperience(company.value, city.value, position.value, date.value, description.value, result.value, difficulty.value, questions)
    }
    else {
        await experienceStore.updateExperience(experienceId, company.value, city.value, position.value, date.value, description.value, result.value, difficulty.value, questions)
    }
    loading.value = false
    dialogStore.changeDialogStatus()
}
const addQuestion = () => {
    if (questions.length < 5)
        questions.push({ question: "", answer: "" })
}
const removeQuestion = () => {
    if (questions.length > 1)
        questions.splice(questions.length - 1, 1)
}
onMounted(async () => {

    await axios
        .get("/city-options")
        .then(async (response) => {
            cityOptions.value = response.data
        })
        .catch((error) => {
            console.log(error)
            // resultStore.error(error.response.data.message)
        });

    await experienceStore.getAllExperiences()
})
</script>
<style scoped></style>