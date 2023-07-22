<template>
    <v-container>
        <v-row justify="space-between">
            <v-col cols="2">
                <v-spacer></v-spacer>
            </v-col>
            <v-col cols="6">
                <v-sheet rounded="lg" width="100%" class="pa-4 mx-auto my-5">
                    <div class="d-flex flex-row align-center ma-2 pa-2">
                        <v-avatar color="brown">
                            <span class="text-h5">aa</span>
                        </v-avatar>
                        <div class="text-body-1 ml-2 mr-4">劉賊賊</div>
                    </div>
                    <div class="text-h6 ma-2 pa-2">
                        標題
                    </div>
                    <div class="d-flex flex-row align-center ma-2 pa-2">
                        <div class="text-body-1 mr-4">文章分類</div>
                        <div class="text-body-2">2小時前</div>
                    </div>
                    <div class="text-body-2 ma-2 pa-2">
                        下班時路上人煙稀少
                        遠遠就看到一個物流員穿著制服
                        坐在公園花圃的石階
                        雙手撫著頭
                        微微顫抖
                        第一直覺有點怕於是我快步經過他
                        結果我聽到他在啜泣
                        當
                        但我趕快說：伯伯你還好嗎？
                        然後把手上的東西遞給他
                        他的眼神感覺有點被嚇到
                        我想說 乾 防疫期間我也不認識他
                        他會不會覺得我是染疫者要傳染給他 我趕快從包包拿酒精狂噴這些吃的再給他
                        他用緊張的語氣跟我說 ：對不起，我不是覺得你有細菌，只是驚訝
                        說謝謝後
                        他拿走吃的小跑步回車上 我想說他大概真的被我嚇到 所以就不攔
                        住他 但不放心我決定等他車子開走再離開 隔了兩分鐘伯伯下車又跑了
                        回來 他說拆
                        完飯糰包
                        裝才想起來自
                        己忘記叫我等一下 所以他三口吃掉
                        飯糰趕快過來找我 還好我還在 我心裡的石頭總算放下 因為
                        他感覺開心一點了 等
                        留言...完口罩沒再動後 我還是問了：伯伯你還好嗎？是不是身體不舒服？ 他嘆了一口氣跟我說 他今天原本休假 但因為貨量真的太多
                    </div>
                    <div class="d-flex flex-row align-center ma-2 pa-2">
                        <v-sheet v-for="operateIcon in operateIcons" :key="operateIcon.id" class="align-start">
                            <v-btn :prepend-icon="operateIcon.iconName" variant="text">
                                <template v-slot:prepend>
                                    <v-icon :color="operateIcon.iconColor"></v-icon>
                                </template>
                                100
                            </v-btn>
                        </v-sheet>
                    </div>
                </v-sheet>
            </v-col>
            <v-col cols="2">
                <Keywords />
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script setup>
import { ref } from 'vue'
import Keywords from '@/components/Keywords.vue'
import Classification from '@/components/Classification.vue'
const operateIcons = [
    {
        id: 1,
        iconName: "mdi-heart",
        iconColor: "error"
    },
    {
        id: 2,
        iconName: "mdi-comment",
        iconColor: "primary"
    },
    {
        id: 3,
        iconName: "mdi-bookmark",
        iconColor: "warning"
    },
]
</script>
  