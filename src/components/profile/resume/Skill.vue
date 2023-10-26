<template>
    <v-sheet class="pa-4 mx-auto my-5 rounded-lg sheet-border" width="90%">
        <div class="d-flex align-center part-border-bottom mx-2 pa-2">
            <div class="text-h6 ">
                第六部分：技能
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

        <div class="text-h6 mx-2 pa-2">
            【關於我】 我個性外向且充滿活力,對於新的挑戰充滿熱情。我擁有良好的組織能力和溝通技巧,在學期間多次擔任組長的角色,也擔任過科學會的公關長和班級畢業代表,以及班級幹部的職位。
            同時我也是個積極主動和求知慾強的人,像我自己就會使用 Notion來記部分和Line Bot的開發。這個專案的開發過程讓我學習到了如何更有效地與團隊成員討論和解決問題。 【在學經歷】
            目前,我也擔任我的專題指導老師的課程助教。我的主要職責是協助老師指導學生進行Android
            App的開發,並製作相關的上課投稿以及撰寫範例程式碼。由於該課程的學生大多沒有Java基礎,所以我需要耐心地解釋和幫助他們解決問題。這個過程讓我感到非常快樂,因為能夠解決問題和看到他們進步帶給我很大的成就感,同時也讓我能夠不斷提升自己的能力。
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