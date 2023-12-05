<template>
    <v-sheet class="pa-4 mx-auto my-5 rounded-lg sheet-border" width="90%">
        <div class="d-flex align-center part-border-bottom mx-2 pa-2">
            <div class="text-h6 ">
                基本資料
            </div>
            <v-spacer></v-spacer>
            <div>
                <v-btn prepend-icon="mdi-pencil" variant="text">
                    <template v-slot:prepend>
                        <v-icon color="success" size="large"></v-icon>
                    </template>
                    <div class="text-h6">
                        編輯
                    </div>
                </v-btn>
            </div>
        </div>
        <div class="d-flex flex-row text-h6">
            <div class="d-flex flex-column text-h6">
                <div class="ma-2 pa-2">姓名</div>
                <div class="ma-2 pa-2">求學狀況</div>
                <div class="ma-2 pa-2">求職狀況</div>
            </div>
            <div class="d-flex flex-column text-h6">
                <div class="my-2 mx-8 pa-2">劉賊賊</div>
                <div class="my-2 mx-8 pa-2">已畢業</div>
                <div class="my-2 mx-8 pa-2">求職中</div>
            </div>
        </div>
    </v-sheet>
</template>
<style scoped>
.sheet-border {
    border: 2px #DED9D9 solid
}

.part-border-bottom {
    border-bottom: 1px #DED9D9 solid
}
</style>