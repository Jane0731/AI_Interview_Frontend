<template>
    <v-dialog v-model="dialogStore.dialogStatus" width="50%" >
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
                        <v-text-field class="my-3" :rules="[rules.required]" v-model="company"
                            :placeholder="experience.company ? experience.company : '公司名稱'"
                            variant="outlined"></v-text-field>
                        <div class="text-body-1">您面試的職位名稱</div>
                        <v-text-field class="my-3" :rules="[rules.required]" v-model="position"
                            :placeholder="experience.position ? experience.position : '職位名稱'"
                            variant="outlined"></v-text-field>
                        <div class="text-body-1">您面試的日期</div>

                        <v-menu v-model="isMenuOpen" :close-on-content-click="false">
                            <template v-slot:activator="{ props }">
                                <v-text-field hint="MM/DD/YYYY format" persistent-hint class="my-3"
                                    :rules="[rules.required]" v-model="date" :placeholder="date ? dateFormatted : '面試日期'"
                                    variant="outlined" v-bind="props" readonly></v-text-field>
                            </template>
                            <v-date-picker v-model="date"></v-date-picker>
                        </v-menu>
                        <div class="text-body-1">您面試的難度</div>
                        <v-item-group mandatory v-model="exclusive" class="my-3">
                            <v-row>
                                <v-col v-for="interviewExclusive in interviewExclusives" :key="interviewExclusive.value"
                                    cols="12" md="2">
                                    <v-item v-slot="{ isSelected, toggle }">
                                        <v-card :color="isSelected ? 'primary' : '#E7E7E7'" class="d-flex align-center" dark
                                            height="35" @click="toggle">
                                            <v-scroll-y-transition>
                                                <div class="flex-grow-1 text-center text-align-center">
                                                    {{ interviewExclusive.name }}
                                                </div>
                                            </v-scroll-y-transition>
                                        </v-card>
                                    </v-item>
                                </v-col>
                            </v-row>
                        </v-item-group>
                        <div class="text-body-1">您面試的結果</div>
                        <v-item-group mandatory v-model="result" class="my-3">
                            <v-row>
                                <v-col v-for="interviewResult in interviewResults" :key="interviewResult.value" cols="12"
                                    md="2">
                                    <v-item v-slot="{ isSelected, toggle }">
                                        <v-card :color="isSelected ? 'primary' : '#E7E7E7'" class="d-flex align-center" dark
                                            height="35" @click="toggle">
                                            <v-scroll-y-transition>
                                                <div class="flex-grow-1 text-center text-align-center">
                                                    {{ interviewResult.name }}
                                                </div>
                                            </v-scroll-y-transition>
                                        </v-card>
                                    </v-item>
                                </v-col>
                            </v-row>
                        </v-item-group>
                        <v-row>
                            <v-col class="text-right">
                                <v-btn color="primary" size="large" @click="stepOne=false">
                                    <div class="text-h5">下一頁</div>
                                </v-btn>
                            </v-col>
                        </v-row>

                    </div>
                    <div v-else>
                        <div class="text-body-1">您面試的過程分享</div>
                        <v-textarea class="my-3" :rules="[rules.required]" v-model="sharing" variant="outlined" rows="6"
                            placeholder="面試分享"></v-textarea>
      
                       
                        <v-row justify="space-between">
                            <v-col >
                                <v-btn color="primary" size="large" @click="stepOne=true">
                                    <div class="text-h5">上一頁</div>
                                </v-btn>
                            </v-col>
                            <v-col class="text-right">
                                <v-btn color="primary" size="large" @click="">
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
import { useDialogStore } from '@/stores/dialog'
import { useExperienceStore } from '@/stores/experience'
import { VDatePicker } from 'vuetify/labs/VDatePicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ref, defineProps, onMounted, watch } from 'vue';
const props = defineProps({
    user: { type: Object },
    experience: { type: Object, default: "" }
})

const formatDate = (date) => {
    if (!date) return null
    const [year, month, day] = date.split('-')
    return `${month}/${day}/${year}`
}
const isMenuOpen = ref(false)
const experienceStore = useExperienceStore()
const date = ref((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10))
const dateFormatted = ref(formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)))
const dialogStore = useDialogStore()
const dialogContent = dialogStore.dialogContent
const company = ref(props.experience.company)
const position = ref(props.experience.position)
const exclusive = ref(props.experience.exclusive)
const interviewExclusives = [{ name: "簡單", value: 1 }, { name: "普通", value: 2 }, { name: "困難", value: 3 }]
const result = ref(props.experience.result)
const interviewResults = [{ name: "未錄取", value: 1 }, { name: "已錄取", value: 2 }, { name: "等待中", value: 3 }]
const sharing=ref(props.experience.sharing)
const stepOne=ref(true)
// const interviewDate = ref(props.experience.interviewDate)
watch(result, (nn) => console.log(nn))

const form = ref(false)
const loading = ref(false)

const rules = {
    required: value => !!value,
}


const onSubmit = async (experienceId) => {
    if (!form.value) return
    loading.value = true
    if (dialogContent.id == 1) {
        // await experienceStore.createExperience(title.value, content.value, 1, tags.value)
    }
    else {
        // await experienceStore.updateExperience(title.value, content.value, 1, tags.value,experienceId)
    }
    loading.value = false
    dialogStore.changeDialogStatus()
}

</script>
<style scoped></style>