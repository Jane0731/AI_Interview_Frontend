<template>
    <v-card class="mx-auto" >
        <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"  cover></v-img>

        <v-card-title>
            Top western road trips
        </v-card-title>

        <v-card-subtitle>
            1,000 miles of wonder
        </v-card-subtitle>

        <v-card-actions>
      
            <v-spacer></v-spacer>

            <v-btn color="orange-lighten-2" variant="text">查看更多</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script setup>
import { ref } from 'vue';

const show = ref(false)

</script>