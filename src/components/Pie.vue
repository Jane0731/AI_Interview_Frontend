<template>
    <Pie :data="barData" :options="options" />
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
import { Pie } from 'vue-chartjs'
import { defineProps } from 'vue'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
import { ref } from 'vue'
const props = defineProps({
    barData: Object,
})
const options = ref({
  responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '肢體非語言分析'
      }
    }
})
</script>