<template>
    <v-sheet class="pa-4 mx-auto my-5 rounded-lg sheet-border" width="90%">
        <div class="d-flex align-center part-border-bottom mx-2 pa-2">
            <div class="text-h6 ">
                第五部分：作品集
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
        <div class="d-flex mx-2 pa-5">
            <v-row>
                <v-col>
                    <v-img class="bg-white" aspect-ratio="4/3" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                        cover></v-img>
                </v-col>
                <v-col>
                    <div class="text-h6 ">
                        留住浪浪
                    </div>
                    <div class="text-body-1 ">
                        2022/07-20221212
                    </div>
                    <div class="text-body-1 ">
                        專案描述
                    </div>
                    <div class="text-body-1 ">
                        <a href="#">
                            前往查看 >
                        </a>
                    </div>
                </v-col>
            </v-row>
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