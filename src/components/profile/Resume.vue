<template>
    <v-card width="100%" class="overflow-auto ">
        <v-sheet width="100%" color="primary" height="120" class=" d-flex align-center justify-center pa-10">
            <div class="text-h4">我的履歷</div>
        </v-sheet>
        <v-card-text class="overflow-auto cardtext-width ">
            <!-- <Part1/> -->
            <Part2/>
            <Part3/>
            <Part4/>
            <Part5/>
            <Part6/>
        </v-card-text>
    </v-card>
</template>
<script setup>
import Part1 from '@/components/profile/resume/Information'
import Part2 from '@/components/profile/resume/Autobiography'
import Part3 from '@/components/profile/resume/Education'
import Part4 from '@/components/profile/resume/Work'
import Part5 from '@/components/profile/resume/Portfolio'
import Part6 from '@/components/profile/resume/Skill'


</script>
<style scoped>
.sheet-border {
    border: 2px #DED9D9 solid
}

.part-border-bottom {
    border-bottom: 1px #DED9D9 solid
}

.cardtext-width {
    height: calc(100vh - 256px)
}
</style>