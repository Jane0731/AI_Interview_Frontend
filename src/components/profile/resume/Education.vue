<template>
    <v-sheet class="pa-4 mx-auto my-5 rounded-lg sheet-border" width="90%">
        <div class="d-flex align-center part-border-bottom mx-2 pa-2">
            <div class="text-h6 ">
                學歷
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
                    <div class="text-h6 ">
                        台中科大
                    </div>
                    <div class="text-body-1 ">
                        資訊管理學系|二技日間就讀中
                    </div>
                    <div class="text-body-1 ">
                        2022/07-2022/12
                    </div>
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