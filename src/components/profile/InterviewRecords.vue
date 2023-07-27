<template>
    <v-card width="100%" class="overflow-auto ">
        <v-sheet width="100%" color="primary" height="120" class=" d-flex align-center justify-center pa-10">
            <div class="text-h5">面試紀錄</div>
        </v-sheet>
        <v-card-text class="overflow-auto cardtext-width">
            <div class="ma-2 pa-2 text-h6">
                面試時間:2002/07/31
            </div>
            <div class="ma-2 pa-2 text-h6">
                <v-expansion-panels>
                    <v-expansion-panel v-for="i in 5" :key="i" title="Item"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."></v-expansion-panel>
                </v-expansion-panels>
            </div>
            <div class="ma-2 pa-2 text-h6">
                需改進的地方
            </div>
            <div>
                <v-list lines="two">
                    <v-list-item v-for="item in items" :key="item.title" :title="item.title" subtitle="..."></v-list-item>
                </v-list>
            </div>
            <div>
                <v-pagination v-model="page" :length="4" rounded="circle"></v-pagination>
            </div>

        </v-card-text>
    </v-card>
</template>
<script setup>
import { ref } from 'vue';
const page = ref(1)
const items = [
    {
      title: 'Item #1',
      value: 1,
    },
    {
      title: 'Item #2',
      value: 2,
    },
    {
      title: 'Item #3',
      value: 3,
    },
  ]
</script>
<style scoped>
.cardtext-width {
    height: calc(100vh - 256px)
}

.window-item {
    border: 1px #C8C8C8 solid
}
</style>