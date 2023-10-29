<template>
    <Bar :data="barData" :options="options" />
</template>
<script setup>
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { defineProps } from 'vue'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
import { ref } from 'vue'
const props = defineProps({
    barData: Object,
})
const options = ref({
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
})
</script>