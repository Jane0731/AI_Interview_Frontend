<template>
    <v-sheet class="pa-4 mx-auto my-5 rounded-lg sheet-border" width="90%">
        <div class="d-flex align-center part-border-bottom mx-2 pa-2">
            <div class="text-h6 ">
                工作經歷
            </div>
            <v-spacer></v-spacer>
            <div>
                <v-btn prepend-icon="mdi-plus" variant="text">
                    <template v-slot:prepend>
                        <v-icon color="success" size="large"></v-icon>
                    </template>
                    <div class="text-h6">
                        新增
                    </div>
                </v-btn>
            </div>
        </div>
        <div class="d-flex mx-2 pa-2">
            <v-timeline side="end" truncate-line="start" align="start">
                <v-timeline-item v-for="item in items" :key="item.id" dot-color="info" size="small" width="100%">
                    <v-row no-gutters>
                        <v-col>
                            <div class="text-body-1 ">
                                2022/07/01-2022/12/21
                            </div>
                            <div class="text-body-1 ">
                                8個月 </div>
                            <div class="text-h5 ">
                                前端工程師
                            </div>
                            <div class="text-h6 ">
                                創科資訊股份有限公司
                            </div>
                        </v-col>
                        <v-col>
                            <div class="text-body-1 ">
                                工作描述
                             </div>
                        </v-col>
                    </v-row>

                </v-timeline-item>
            </v-timeline>
        </div>

    </v-sheet>
</template>
<script setup>
const items = [
    {
        id: 1,
        color: 'info',
        icon: 'mdi-information',
    },
    {
        id: 2,
        color: 'error',
        icon: 'mdi-alert-circle',
    },
]
</script>
<style scoped>
.sheet-border {
    border: 2px #DED9D9 solid
}

.part-border-bottom {
    border-bottom: 1px #DED9D9 solid
}
</style>